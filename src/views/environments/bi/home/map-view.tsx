import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Asclepius } from 'phosphor-react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Linking, PermissionsAndroid, Platform, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';

// Tipos para as UBS
type UBS = {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  address: string;
  workingHours: {
    days: string;
    hours: string;
    openHour: number;
    closeHour: number;
  };
  inventory: {
    id: number;
    name: string;
    available: boolean;
    lastRestock: string;
  }[];
};

export function MapVisualizer() {
  const sheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation();
  const mapRef = useRef<MapView>(null);

  const [region, setRegion] = useState<Region>({
    latitude: -10.964745,
    longitude: -37.076516,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUBS, setSelectedUBS] = useState<UBS | null>(null);
  const [distance] = useState('Calculando...');
  const [duration] = useState('Calculando...');

  const [ubsList] = useState<UBS[]>([
    {
      id: 1,
      latitude: -10.968869,
      longitude: -37.082198,
      title: 'UBS Geraldo Magela',
      address: 'R. Central Quatro · Posto de saúde comunitário',
      workingHours: {
        days: 'Segunda a Sexta',
        hours: '8:00 às 17:00',
        openHour: 8,
        closeHour: 17,
      },
      inventory: [
        { id: 1, name: 'Paracetamol 500mg', available: true, lastRestock: 'Hoje' },
        { id: 2, name: 'Dipirona 500mg', available: false, lastRestock: '3 dias atrás' },
        { id: 3, name: 'Ibuprofeno 400mg', available: false, lastRestock: '5 dias atrás' },
        { id: 4, name: 'Amoxicilina 500mg', available: true, lastRestock: 'Hoje' },
      ],
    },
    {
      id: 2,
      latitude: -10.947123,
      longitude: -37.073456,
      title: 'UBS Augusto Franco',
      address: 'Av. Augusto Franco · Centro de saúde',
      workingHours: {
        days: 'Segunda a Sexta',
        hours: '7:00 às 19:00',
        openHour: 7,
        closeHour: 19,
      },
      inventory: [
        { id: 1, name: 'Paracetamol 500mg', available: true, lastRestock: 'Ontem' },
        { id: 2, name: 'Dipirona 500mg', available: true, lastRestock: 'Ontem' },
        { id: 3, name: 'Ibuprofeno 400mg', available: true, lastRestock: 'Hoje' },
        { id: 4, name: 'Amoxicilina 500mg', available: false, lastRestock: '1 semana atrás' },
      ],
    },
    {
      id: 3,
      latitude: -10.982345,
      longitude: -37.065432,
      title: 'UBS Manoel Pereira',
      address: 'R. Laranjeiras · Unidade básica',
      workingHours: {
        days: 'Segunda a Sábado',
        hours: '7:30 às 18:30',
        openHour: 7,
        closeHour: 18,
      },
      inventory: [
        { id: 1, name: 'Paracetamol 500mg', available: false, lastRestock: '4 dias atrás' },
        { id: 2, name: 'Dipirona 500mg', available: false, lastRestock: '5 dias atrás' },
        { id: 3, name: 'Ibuprofeno 400mg', available: false, lastRestock: '1 semana atrás' },
        { id: 4, name: 'Amoxicilina 500mg', available: false, lastRestock: '2 semanas atrás' },
      ],
    },
    {
      id: 4,
      latitude: -10.955678,
      longitude: -37.089012,
      title: 'UBS José Conrado',
      address: 'Av. Beira Mar · Posto de saúde',
      workingHours: {
        days: 'Segunda a Domingo',
        hours: '24 horas',
        openHour: 0,
        closeHour: 24,
      },
      inventory: [
        { id: 1, name: 'Paracetamol 500mg', available: true, lastRestock: 'Hoje' },
        { id: 2, name: 'Dipirona 500mg', available: true, lastRestock: 'Hoje' },
        { id: 3, name: 'Ibuprofeno 400mg', available: true, lastRestock: 'Hoje' },
        { id: 4, name: 'Amoxicilina 500mg', available: true, lastRestock: 'Hoje' },
      ],
    },
  ]);

  const [routeCoords] = useState([]);

  const getMarkerColor = (ubs: UBS) => {
    const unavailableCount = ubs.inventory.filter((item) => !item.available).length;
    const totalCount = ubs.inventory.length;

    if (unavailableCount === 0) return 'green';
    if (unavailableCount === totalCount) return 'red';
    return 'orange';
  };

  const checkIfOpen = (ubs: UBS) => {
    const now = new Date() as any;
    const currentHour = now.getHours();
    const currentDay = now.getDay();

    const isWeekday = currentDay >= 1 && currentDay <= 5;
    const isWithinHours =
      currentHour >= ubs.workingHours.openHour && currentHour < ubs.workingHours.closeHour;

    return isWithinHours;
  };

  useEffect(() => {
    async function requestLocation() {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newRegion = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          };
          setRegion(newRegion);
          mapRef.current?.animateToRegion(newRegion, 1000);
        },
        (error) => {
          console.log(error);
          const defaultRegion = {
            latitude: -10.964745,
            longitude: -37.076516,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          };
          setRegion(defaultRegion);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }

    requestLocation();

    if (ubsList.length > 0) {
      setSelectedUBS(ubsList[0]);
      setIsOpen(checkIfOpen(ubsList[0]));
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      if (selectedUBS) {
        setIsOpen(checkIfOpen(selectedUBS));
      }
    }, 60000);

    return () => clearInterval(timer);
  }, [selectedUBS]);

  const snapPoints = useMemo(() => ['50%', '90%'], []);

  const handleSheetChange = useCallback((index: number) => {
    console.log('handleSheetChange', index);
  }, []);

  const handleMarkerPress = (ubs: UBS) => {
    setSelectedUBS(ubs);
    setIsOpen(checkIfOpen(ubs));

    mapRef.current?.animateToRegion(
      {
        latitude: ubs.latitude,
        longitude: ubs.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      500
    );
  };

  const getUnavailableMedicines = (ubs: UBS) => {
    return ubs.inventory.filter((item) => !item.available).map((item) => item.name);
  };

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
            <ArrowLeft weight="bold" size={20} color="#0D295D" />
          </View>
        </TouchableOpacity>

        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor="#0D295D"
            strokeWidth={4}
            lineCap="round"
            lineJoin="round"
          />
        )}

        {ubsList.map((ubs) => (
          <Marker
            key={ubs.id}
            coordinate={{ latitude: ubs.latitude, longitude: ubs.longitude }}
            title={ubs.title}
            description={ubs.address}
            pinColor={getMarkerColor(ubs)}
            onPress={() => handleMarkerPress(ubs)}
          />
        ))}
      </MapView>

      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}>
        <BottomSheetView className="flex-1 p-6 pt-0">
          {selectedUBS && (
            <>
              <Text className="mb-2 font-[DINNextW1GRegular] text-lg text-gray-500">
                agGPT - Unidades de Saúde de Aracaju
              </Text>

              <View className="mb-4 flex-row items-center">
                <View className="mr-3 h-16 w-16 items-center justify-center rounded-full bg-[#0D295D]">
                  <Asclepius color="#FEBB01" size={32} />
                </View>

                <View className="flex-1">
                  <Text className="font-[DINNextW1GMedium] text-2xl">{selectedUBS.title}</Text>
                  <Text className="font-[DINNextW1GRegular] text-base text-gray-500">
                    {selectedUBS.address} · {distance}
                  </Text>
                  <Text className="font-[DINNextW1GRegular] text-base text-[#0D295D]">
                    Tempo estimado: {duration}
                  </Text>
                </View>

                <Text className="ml-2 text-2xl text-gray-400">♡</Text>
              </View>

              <View className="mb-6 flex-row justify-between">
                <TouchableOpacity
                  className="mr-2 flex-1 rounded-lg bg-[#0D295D] py-3"
                  onPress={() => {
                    const url = Platform.select({
                      ios: `maps://app?saddr=${region.latitude},${region.longitude}&daddr=${selectedUBS.latitude},${selectedUBS.longitude}&directionsmode=walking`,
                      android: `google.navigation:q=${selectedUBS.latitude},${selectedUBS.longitude}`,
                    });

                    Linking.canOpenURL(url!).then((supported) => {
                      if (supported) {
                        Linking.openURL(url!);
                      } else {
                        const browserUrl = `https://www.google.com/maps/dir/?api=1&origin=${region.latitude},${region.longitude}&destination=${selectedUBS.latitude},${selectedUBS.longitude}&travelmode=walking`;
                        Linking.openURL(browserUrl);
                      }
                    });
                  }}>
                  <Text className="text-center font-[DINNextW1GMedium] text-white">
                    Iniciar Navegação
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity className="rounded-lg border border-[#0D295D] px-4 py-3">
                  <Text className="text-center font-[DINNextW1GMedium] text-[#0D295D]">
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
                      {selectedUBS.workingHours.days}, {selectedUBS.workingHours.hours}
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
                <>
                  {/* Alerta sobre medicamentos faltantes */}
                  {getUnavailableMedicines(selectedUBS).length > 0 && (
                    <View className="mb-3 rounded-lg bg-red-100 p-3">
                      <Text className="font-[DINNextW1GMedium] text-base text-red-800">
                        ⚠️ Medicamentos em falta:
                      </Text>
                      <Text className="font-[DINNextW1GRegular] text-base text-red-800">
                        {getUnavailableMedicines(selectedUBS).join(', ')}
                      </Text>
                    </View>
                  )}

                  <View className="mb-4 rounded-lg bg-gray-200">
                    {selectedUBS.inventory.map((item) => (
                      <View
                        key={item.id}
                        className={`flex-row items-center justify-between px-3 py-2 ${item.id !== selectedUBS.inventory.length ? 'border-b border-gray-300' : ''}`}>
                        <View className="flex-1">
                          <Text className="font-[DINNextW1GMedium] text-base">{item.name}</Text>
                          <Text className="font-[DINNextW1GRegular] text-sm text-gray-500">
                            Último estoque: {item.lastRestock}
                          </Text>
                        </View>

                        <View
                          className={`rounded px-2 py-1 ${item.available ? 'bg-green-100' : 'bg-red-100'}`}>
                          <Text
                            className={`font-[DINNextW1GMedium] text-sm ${item.available ? 'text-green-800' : 'text-red-800'}`}>
                            {item.available ? 'Disponível' : 'Indisponível'}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </>
              ) : (
                <View className="mb-4 rounded-lg bg-gray-200 p-4">
                  <Text className="text-center font-[DINNextW1GRegular] text-base text-gray-500">
                    O inventário só está disponível durante o horário de funcionamento
                  </Text>
                </View>
              )}

              {/* Pesquisas recentes */}
              <Text className="mb-2 font-[DINNextW1GRegular] text-lg text-gray-500">
                Outras UBS próximas
              </Text>

              <View className="rounded-lg bg-gray-200">
                {ubsList
                  .filter((ubs) => ubs.id !== selectedUBS.id)
                  .slice(0, 2)
                  .map((ubs) => (
                    <TouchableOpacity
                      key={ubs.id}
                      className="flex-row items-center border-b border-gray-300 px-3 py-2"
                      onPress={() => handleMarkerPress(ubs)}>
                      <Text className="mr-2 text-lg text-gray-500">🏥</Text>
                      <Text className="font-[DINNextW1GRegular] text-base">{ubs.title}</Text>
                      <View
                        className="ml-auto h-3 w-3 rounded-full"
                        style={{ backgroundColor: getMarkerColor(ubs) }}
                      />
                    </TouchableOpacity>
                  ))}
              </View>
            </>
          )}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
