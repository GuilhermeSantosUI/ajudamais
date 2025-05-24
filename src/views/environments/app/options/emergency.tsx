import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { Ambulance, ArrowLeft, Clock, MapPin } from 'phosphor-react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Linking, Platform, Text, TouchableOpacity, Vibration, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { Marker, Polyline } from 'react-native-maps';

// Interface para coordenadas
interface Coordinate {
  latitude: number;
  longitude: number;
}

export function EmergencyScreen() {
  const sheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation();
  const mapRef = useRef<MapView>(null);
  const [emergencyStatus, setEmergencyStatus] = useState<'searching' | 'found'>('searching');
  const [eta, setEta] = useState('5-7 minutos');
  const [userLocation, setUserLocation] = useState<Coordinate | null>(null);
  const [ambulanceLocation, setAmbulanceLocation] = useState<Coordinate | null>(null);
  const [routeCoords, setRouteCoords] = useState<Coordinate[]>([]);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  const snapPoints = useMemo(() => ['40%', '90%'], []);

  const [selectedUnit] = useState({
    id: '3',
    name: 'SAMU - Ambulância Móvel',
    distance: '3.0 km',
    eta: '10-12 minutos',
    type: 'ambulance',
    location: {
      latitude: -10.975129,
      longitude: -37.074397,
    },
  });

  // Gerar coordenadas intermediárias para a rota
  const generateRoute = (start: Coordinate, end: Coordinate, steps: number = 20) => {
    const coords: Coordinate[] = [];
    for (let i = 0; i <= steps; i++) {
      const ratio = i / steps;
      coords.push({
        latitude: start.latitude + (end.latitude - start.latitude) * ratio,
        longitude: start.longitude + (end.longitude - start.longitude) * ratio,
      });
    }
    return coords;
  };

  // Animação da ambulância
  const animateAmbulance = useCallback(() => {
    if (!routeCoords.length) return;

    let currentProgress = 0;
    const totalSteps = routeCoords.length;
    const updateInterval = 10000; // ms

    animationRef.current = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);

      if (currentProgress >= totalSteps - 1) {
        clearInterval(animationRef.current);
        return;
      }

      const currentCoord = routeCoords[currentProgress];
      setAmbulanceLocation(currentCoord);

      // Atualizar o mapa para acompanhar a ambulância
      mapRef.current?.animateToRegion(
        {
          ...currentCoord,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        300
      );
    }, updateInterval);
  }, [routeCoords]);

  // Obter localização do usuário
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permissão de localização negada');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const userCoord = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setUserLocation(userCoord);

      // Simular encontro de socorro após 5 segundos
      setTimeout(() => {
        setEmergencyStatus('found');
        setEta('5-7 minutos');
        Vibration.vibrate([500, 200, 500]);
        sheetRef.current?.snapToIndex(0);

        // Gerar rota da ambulância para o usuário
        const ambulanceStart = selectedUnit.location;
        const route = generateRoute(ambulanceStart, userCoord);
        setRouteCoords(route);
        setAmbulanceLocation(ambulanceStart);
      }, 5000);
    })();

    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, []);

  // Iniciar animação quando a rota estiver pronta
  useEffect(() => {
    if (routeCoords.length > 0) {
      animateAmbulance();
    }
  }, [routeCoords, animateAmbulance]);

  const handleSheetChange = useCallback((index: number) => {
    console.log('handleSheetChange', index);
  }, []);

  return (
    <GestureHandlerRootView className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Mapa com animação de rota */}
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -23.5505,
          longitude: -46.6333,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation
        loadingEnabled
        showsMyLocationButton={false}
        toolbarEnabled={false}>
        <TouchableOpacity className="absolute left-4 top-16" onPress={() => navigation.goBack()}>
          <View className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow">
            <ArrowLeft weight="bold" size={20} color="#FF5252" />
          </View>
        </TouchableOpacity>

        {/* Rota da ambulância */}
        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor="#FF5252"
            strokeWidth={4}
            lineDashPattern={[5, 5]}
          />
        )}

        {/* Marcador da ambulância */}
        {ambulanceLocation && (
          <Marker coordinate={ambulanceLocation} anchor={{ x: 0.5, y: 0.5 }}>
            <View className="items-center justify-center">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-[#FF5252]">
                <Ambulance size={20} color="white" weight="fill" />
              </View>
              <View className="absolute -bottom-1 h-3 w-3 rotate-45 bg-[#FF5252]" />
            </View>
          </Marker>
        )}
      </MapView>

      {/* Bottom Sheet principal */}
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}>
        <BottomSheetView className="flex-1 p-6 pt-0">
          {emergencyStatus === 'searching' ? (
            <>
              <Text className="mb-2 font-[DINNextW1GRegular] text-lg text-gray-500">
                BUSCA POR SOCORRO
              </Text>

              <View className="mb-6 items-center">
                <View className="mb-4 h-32 w-32 animate-pulse items-center justify-center rounded-full bg-[#FFEBEE]">
                  <Ambulance size={48} color="#FF5252" weight="fill" />
                </View>

                <Text className="mb-1 font-[DINNextW1GMedium] text-xl text-gray-800">
                  Procurando unidades disponíveis
                </Text>

                <Text className="text-center font-[DINNextW1GRegular] text-base text-gray-500">
                  Estamos verificando as unidades mais próximas de você
                </Text>
              </View>
            </>
          ) : (
            <>
              <Text className="mb-2 font-[DINNextW1GRegular] text-lg text-gray-500">
                SOCORRO A CAMINHO
              </Text>

              <View className="mb-4 flex-row items-center justify-center rounded-xl bg-[#FFF6F6] px-4 py-3">
                <Clock size={32} color="#FF5252" weight="fill" />
                <Text className="ml-2 font-[DINNextW1GMedium] text-lg text-[#FF5252]">
                  Tempo estimado: {eta}
                </Text>
              </View>

              {/* Barra de progresso da ambulância */}
              <View className="mb-4 h-2 w-full rounded-full bg-gray-200">
                <View
                  className="h-full rounded-full bg-[#FF5252]"
                  style={{ width: `${(progress / (routeCoords.length - 1)) * 100}%` }}
                />
              </View>

              <Text className="mb-3 font-[DINNextW1GMedium] text-base text-gray-800">
                Unidade respondendo:
              </Text>

              <View className="mb-4 flex-row items-center rounded-xl bg-gray-100 px-4 py-4">
                <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-[#FFEBEE]">
                  <Ambulance size={28} color="#FF5252" weight="fill" />
                </View>
                <View className="flex-1">
                  <Text className="font-[DINNextW1GMedium] text-base text-gray-800">
                    {selectedUnit.name}
                  </Text>
                  <View className="mt-1 flex-row items-center">
                    <MapPin size={16} color="#666" />
                    <Text className="ml-1 font-[DINNextW1GRegular] text-sm text-gray-600">
                      {selectedUnit.distance} • {Math.round((progress / routeCoords.length) * 100)}%
                      do caminho
                    </Text>
                  </View>
                </View>
              </View>

              <View className="mb-4 flex-row justify-between">
                <TouchableOpacity
                  className="mr-2 flex-1 rounded-lg bg-[#FF5252] py-3"
                  onPress={() => {
                    if (!userLocation || !ambulanceLocation) return;

                    const url = Platform.select({
                      ios: `maps://app?saddr=${ambulanceLocation.latitude},${ambulanceLocation.longitude}&daddr=${userLocation.latitude},${userLocation.longitude}`,
                      android: `google.navigation:q=${userLocation.latitude},${userLocation.longitude}`,
                    });

                    Linking.canOpenURL(url!).then((supported) => {
                      if (supported) {
                        Linking.openURL(url!);
                      } else {
                        const browserUrl = `https://www.google.com/maps/dir/?api=1&origin=${ambulanceLocation.latitude},${ambulanceLocation.longitude}&destination=${userLocation.latitude},${userLocation.longitude}`;
                        Linking.openURL(browserUrl);
                      }
                    });
                  }}>
                  <Text className="text-center font-[DINNextW1GMedium] text-white">
                    Rastrear Ambulância
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="rounded-lg border border-[#FF5252] px-4 py-3"
                  onPress={() => navigation.goBack()}>
                  <Text className="text-center font-[DINNextW1GMedium] text-[#FF5252]">
                    Cancelar
                  </Text>
                </TouchableOpacity>
              </View>

              <Text className="mb-4 text-center font-[DINNextW1GRegular] text-sm text-gray-500">
                Mantenha-se em local seguro. A ambulância está a caminho com sirenes ligadas.
              </Text>
            </>
          )}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
