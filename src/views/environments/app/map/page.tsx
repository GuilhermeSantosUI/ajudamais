import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Asclepius } from 'phosphor-react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Linking, PermissionsAndroid, Platform, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';

import { NotificationButton } from './mock/hook';

export function Map() {
  const sheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation();
  const mapRef = useRef<MapView>(null);

  const [region, setRegion] = useState<Region>({
    latitude: -10.964745,
    longitude: -37.076516,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const [destination] = useState({
    latitude: -10.968869,
    longitude: -37.082198,
    title: 'UBS. Geraldo Magela',
    workingHours: {
      days: 'Segunda a Segunda',
      hours: '8:00 às 23:00',
      openHour: 8,
      closeHour: 23,
    },
  });

  const [routeCoords] = useState([]);
  const [distance] = useState('Calculando...');
  const [duration] = useState('Calculando...');

  const [inventory] = useState([
    { id: 1, name: 'Paracetamol 500mg', available: true, lastRestock: 'Hoje' },
    { id: 2, name: 'Dipirona 500mg', available: true, lastRestock: 'Ontem' },
    { id: 3, name: 'Ibuprofeno 400mg', available: false, lastRestock: '2 dias atrás' },
    { id: 4, name: 'Amoxicilina 500mg', available: true, lastRestock: 'Hoje' },
  ]);

  function calculateRegion(
    pointA: Region,
    pointB: { latitude: number; longitude: number }
  ): Region {
    const minLat = Math.min(pointA.latitude, pointB.latitude);
    const maxLat = Math.max(pointA.latitude, pointB.latitude);
    const minLng = Math.min(pointA.longitude, pointB.longitude);
    const maxLng = Math.max(pointA.longitude, pointB.longitude);

    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;

    const latDelta = Math.max((maxLat - minLat) * 1.5, 0.01); // garante delta mínimo
    const lngDelta = Math.max((maxLng - minLng) * 1.5, 0.01);

    return {
      latitude: centerLat,
      longitude: centerLng,
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta,
    };
  }

  useEffect(() => {
    async function requestLocation() {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newRegion = calculateRegion(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0,
              longitudeDelta: 0,
            },
            destination
          );

          setRegion(newRegion);

          setTimeout(() => {
            mapRef.current?.animateToRegion(newRegion, 1000);
          }, 500);
        },
        (error) => {
          console.log(error);

          const destinationRegion = {
            ...destination,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          };
          setRegion(destinationRegion);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }

    requestLocation();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      const currentHour = now.getHours();
      const currentDay = now.getDay();

      const isWeekday = currentDay >= 0 && currentDay <= 7;
      const isWithinHours =
        currentHour >= destination.workingHours.openHour &&
        currentHour < destination.workingHours.closeHour;

      setIsOpen(isWeekday && isWithinHours);
    }, 60000);

    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay();
    const isWeekday = currentDay >= 0 && currentDay <= 7;
    const isWithinHours =
      currentHour >= destination.workingHours.openHour &&
      currentHour < destination.workingHours.closeHour;
    setIsOpen(isWeekday && isWithinHours);

    return () => clearInterval(timer);
  }, []);

  const snapPoints = useMemo(() => ['50%', '90%'], []);

  const handleSheetChange = useCallback((index: number) => {
    console.log('handleSheetChange', index);
  }, []);

  return (
    <GestureHandlerRootView className="flex-1">
      <StatusBar style="dark" />

      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        region={region}
        showsUserLocation
        loadingEnabled
        showsMyLocationButton={false}
        toolbarEnabled={false}>
        <TouchableOpacity className="absolute left-4 top-16" onPress={() => navigation.goBack()}>
          <View className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow">
            <ArrowLeft weight="bold" size={20} color="#007AFF" />
          </View>
        </TouchableOpacity>

        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor="#007AFF"
            strokeWidth={4}
            lineCap="round"
            lineJoin="round"
          />
        )}

        <Marker coordinate={destination} title={destination.title} pinColor="#FF0000" />
      </MapView>

      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}>
        <BottomSheetView className="flex-1 p-6 pt-0">
          <Text className="mb-2 font-[DINNextW1GRegular] text-lg text-gray-500">
            agGPT - Unidade pública mais próxima
          </Text>

          <View className="mb-4 flex-row items-center">
            <View className="mr-3 h-16 w-16 items-center justify-center rounded-full bg-blue-500">
              <Asclepius color="#FEBB01" size={32} />
            </View>

            <View className="flex-1">
              <Text className="font-[DINNextW1GMedium] text-2xl">{destination.title}</Text>
              <Text className="font-[DINNextW1GRegular] text-base text-gray-500">
                R. Central Quatro · Posto de saúde comunitário · {distance}
              </Text>
              <Text className="font-[DINNextW1GRegular] text-base text-blue-500">
                Tempo estimado: {duration}
              </Text>
            </View>

            <Text className="ml-2 text-2xl text-gray-400">♡</Text>
          </View>

          <View className="mb-6 flex-row justify-between">
            <TouchableOpacity
              className="mr-2 flex-1 rounded-lg bg-blue-500 py-3"
              onPress={() => {
                const url = Platform.select({
                  ios: `maps://app?saddr=${region.latitude},${region.longitude}&daddr=${destination.latitude},${destination.longitude}&directionsmode=walking`,
                  android: `google.navigation:q=${destination.latitude},${destination.longitude}`,
                });

                Linking.canOpenURL(url!).then((supported) => {
                  if (supported) {
                    Linking.openURL(url!);
                  } else {
                    const browserUrl = `https://www.google.com/maps/dir/?api=1&origin=${region.latitude},${region.longitude}&destination=${destination.latitude},${destination.longitude}&travelmode=walking`;
                    Linking.openURL(browserUrl);
                  }
                });
              }}>
              <Text className="text-center font-[DINNextW1GMedium] text-white">
                Iniciar Navegação
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="rounded-lg border border-blue-500 px-4 py-3">
              <Text className="text-center font-[DINNextW1GMedium] text-blue-500">
                Compartilhar
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mb-4 rounded-lg bg-gray-100 p-3">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="font-[DINNextW1GMedium] text-base text-gray-700">
                  Horário de Funcionamento
                </Text>
                <Text className="font-[DINNextW1GRegular] text-base text-gray-500">
                  {destination.workingHours.days}, {destination.workingHours.hours}
                </Text>
              </View>
              <View className={`rounded px-3 py-1 ${isOpen ? 'bg-green-100' : 'bg-red-100'}`}>
                <Text
                  className={`font-[DINNextW1GMedium] text-sm ${isOpen ? 'text-green-800' : 'text-red-800'}`}>
                  {isOpen ? 'Aberto agora' : 'Fechado'}
                </Text>
              </View>
            </View>
          </View>

          <Text className="mb-2 font-[DINNextW1GRegular] text-lg text-gray-500">
            Inventário de Medicamentos {!isOpen && '(Disponível apenas quando aberto)'}
          </Text>

          {isOpen ? (
            <View className="mb-4 rounded-lg bg-gray-200">
              {inventory.map((item) => (
                <View
                  key={item.id}
                  className={`flex-row items-center justify-between px-3 py-2 ${item.id !== inventory.length ? 'border-b border-gray-300' : ''}`}>
                  <View className="flex-1">
                    <Text className="font-[DINNextW1GMedium] text-base">{item.name}</Text>
                    <Text className="font-[DINNextW1GRegular] text-sm text-gray-500">
                      Último estoque: {item.lastRestock}
                    </Text>
                  </View>

                  {item.available ? (
                    <View className="rounded bg-green-100 px-2 py-1">
                      <Text className="font-[DINNextW1GMedium] text-sm text-green-800">
                        Disponível
                      </Text>
                    </View>
                  ) : (
                    <NotificationButton medication={item} disabled={!isOpen} />
                  )}
                </View>
              ))}
            </View>
          ) : (
            <View className="mb-4 rounded-lg bg-gray-200 p-4">
              <Text className="text-center font-[DINNextW1GRegular] text-base text-gray-500">
                O inventário só está disponível durante o horário de funcionamento
              </Text>
            </View>
          )}

          {/* Pesquisas recentes */}
          <Text className="mb-2 font-[DINNextW1GRegular] text-lg text-gray-500">
            Pesquisas recentes
          </Text>

          <View className="rounded-lg bg-gray-200">
            <View className="flex-row items-center border-b border-gray-300 px-3 py-2">
              <Text className="mr-2 text-lg text-gray-500">🔍</Text>
              <Text className="font-[DINNextW1GRegular] text-base">UBS. Augusto Franco</Text>
            </View>

            <View className="flex-row items-center px-3 py-2">
              <Text className="mr-2 text-lg text-gray-500">🔍</Text>
              <Text className="font-[DINNextW1GRegular] text-base">
                UBS. Manoel de Souza Pereira
              </Text>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
