import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { BellRinging } from 'phosphor-react-native';
import { useCallback, useRef, useState } from 'react';
import { Animated, Easing, Pressable, ScrollView, Text, Vibration, View } from 'react-native';

type EmergencyAction = {
  name: string;
  description: string;
};

type HealthUnit = {
  id: string;
  name: string;
  distance: string;
  eta: string;
  type: 'hospital' | 'clinic' | 'ambulance';
  active: boolean;
};

export function Options() {
  const navigation = useNavigation<any>();
  const [isPressing, setIsPressing] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showEmergencySheet, setShowEmergencySheet] = useState(false);
  const [lastAction, setLastAction] = useState<EmergencyAction | null>(null);
  const [emergencyMode, setEmergencyMode] = useState<'initial' | 'searching' | 'found'>('initial');
  const progress = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const lastPressTime = useRef(0);
  const pressCount = useRef(0);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const emergencySheetRef = useRef<BottomSheet>(null);

  // Simulação de unidades de saúde próximas
  const [healthUnits, setHealthUnits] = useState<HealthUnit[]>([
    {
      id: '1',
      name: 'Hospital Municipal Central',
      distance: '1.2 km',
      eta: '5-7 minutos',
      type: 'hospital',
      active: false,
    },
    {
      id: '2',
      name: 'UPA 24h - Zona Sul',
      distance: '2.5 km',
      eta: '8-10 minutos',
      type: 'clinic',
      active: false,
    },
    {
      id: '3',
      name: 'SAMU - Ambulância Móvel',
      distance: '3.0 km',
      eta: '10-12 minutos',
      type: 'ambulance',
      active: false,
    },
    {
      id: '4',
      name: 'Posto de Saúde Familiar',
      distance: '0.8 km',
      eta: '4-6 minutos',
      type: 'clinic',
      active: false,
    },
  ]);

  const emergencyActions: EmergencyAction[] = [
    {
      name: 'Chamar polícia',
      description: 'Iremos notificar a polícia local com sua localização',
    },
    {
      name: 'Chamar ambulância',
      description: 'Iremos notificar os serviços médicos de emergência',
    },
    {
      name: 'Contato de emergência',
      description: 'Notificaremos seu contato de emergência designado',
    },
  ];

  const snapPoints = ['30%'];
  const emergencySnapPoints = ['50%'];
  const healthUnitsSnapPoints = ['80%'];

  const handleCloseSheet = useCallback(() => {
    bottomSheetRef.current?.close();
    setShowActionSheet(false);
  }, []);

  const handleCloseEmergencySheet = useCallback(() => {
    emergencySheetRef.current?.close();
    setShowEmergencySheet(false);
  }, []);

  const handleLongPressEmergency = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Vibration.vibrate([500, 200, 500]);

    // Navega para a tela de emergência
    navigation.navigate('EmergencyScreen');

    // Simula a busca por unidades de saúde
    setEmergencyMode('searching');
    setTimeout(() => {
      setHealthUnits((prev) =>
        prev.map((unit) => (unit.id === '3' ? { ...unit, active: true } : unit))
      );
      setEmergencyMode('found');
    }, 3000);
  };

  const handleSOS = (action?: EmergencyAction) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Vibration.vibrate([500, 500, 500]);

    if (action) {
      console.log(`🚨 ${action.name} ativado!`);
    } else {
      console.log('🚨 SOS ativado!');
    }

    setIsActivated(true);

    let c = 5;
    setCountdown(c);
    countdownRef.current = setInterval(() => {
      c -= 1;
      setCountdown(c);
      if (c <= 0) {
        countdownRef.current && clearInterval(countdownRef.current);
        setIsActivated(false);
      }
    }, 1000);
  };

  const handleQuickPress = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (now - lastPressTime.current < DOUBLE_PRESS_DELAY) {
      pressCount.current += 1;

      if (pressCount.current >= 3) {
        setShowEmergencySheet(true);
        emergencySheetRef.current?.expand();
        pressCount.current = 0;
        return;
      }
    } else {
      pressCount.current = 1;
    }

    lastPressTime.current = now;

    const randomAction = emergencyActions[Math.floor(Math.random() * emergencyActions.length)];
    setLastAction(randomAction);
    setShowActionSheet(true);
    bottomSheetRef.current?.expand();
  };

  const startProgress = () => {
    setIsPressing(true);
    startPulseAnimation();

    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(({ finished }) => {
      if (finished) {
        handleLongPressEmergency();
        setIsPressing(false);
        progress.setValue(0);
        stopPulseAnimation();
      }
    });
  };

  const stopProgress = () => {
    setIsPressing(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    stopPulseAnimation();
  };

  const startPulseAnimation = () => {
    pulseAnim.setValue(1);
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulseAnimation = () => {
    pulseAnim.setValue(1);
    Animated.timing(pulseAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const progressInterpolate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressTextInterpolate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 0],
  });

  return (
    <View className="flex-1 items-center justify-between bg-white pb-24 pt-12">
      <ScrollView
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
        className="w-full">
        <View className="relative mb-6 mt-10">
          <Animated.View>
            <Pressable
              onPress={handleQuickPress}
              onLongPress={startProgress}
              onPressOut={stopProgress}
              delayLongPress={300}
              className={`h-[272px] w-[272px] items-center justify-center rounded-full shadow-lg ${
                isActivated ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={({ pressed }) => ({
                opacity: pressed ? 0.9 : 1,
                shadowColor: isActivated ? '#f59e0b' : '#ef4444',
                shadowOpacity: 0.4,
                shadowRadius: 15,
                shadowOffset: { width: 0, height: 5 },
              })}>
              <Animated.View
                className="absolute left-[-8] top-[-8] h-[272px] w-[272px] rounded-full border-8 border-red-400 border-r-transparent"
                style={{
                  transform: [{ rotate: progressInterpolate }],
                  opacity: isPressing ? 1 : 0,
                }}
              />

              <BellRinging size={72} weight="bold" color="white" />
              <Text className="mt-2 font-[DINNextW1GBold] text-3xl font-bold text-white">
                {isActivated ? 'ATIVADO' : 'SOS'}
              </Text>

              {isPressing && (
                <Animated.Text
                  className="absolute bottom-8 font-[DINNextW1GBold] text-lg font-bold text-white"
                  style={{
                    transform: [
                      {
                        translateY: progressTextInterpolate.interpolate({
                          inputRange: [0, 3],
                          outputRange: [0, 10],
                        }),
                      },
                    ],
                  }}>
                  {Math.round((progressTextInterpolate as any).__getValue())}s para ativar
                </Animated.Text>
              )}

              {isActivated && (
                <View className="absolute bottom-8">
                  <Text className="font-[DINNextW1GBold] text-lg font-bold text-white">
                    Ajuda chega em: {countdown}s
                  </Text>
                </View>
              )}
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>

      {/* BottomSheet para ação rápida */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={handleCloseSheet}>
        <BottomSheetView className="p-4">
          <Text className="text-xl font-bold text-gray-800">{lastAction?.name}</Text>
          <Text className="mt-2 text-gray-600">{lastAction?.description}</Text>
          <Pressable
            onPress={() => {
              if (lastAction) handleSOS(lastAction);
              handleCloseSheet();
            }}
            className="mt-4 rounded-lg bg-red-500 px-6 py-3">
            <Text className="text-center font-bold text-white">Confirmar</Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheet>

      {/* BottomSheet para emergência (múltiplos cliques) */}
      <BottomSheet
        ref={emergencySheetRef}
        index={-1}
        snapPoints={emergencySnapPoints}
        enablePanDownToClose
        onClose={handleCloseEmergencySheet}>
        <BottomSheetView className="p-4">
          <Text className="text-xl font-bold text-gray-800">EMERGÊNCIA!</Text>
          <Text className="mt-2 text-gray-600">
            Você acionou o modo de emergência. Qual serviço deseja contactar?
          </Text>

          <View className="mt-4 space-y-2">
            {emergencyActions.map((action, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  handleSOS(action);
                  handleCloseEmergencySheet();
                }}
                className="rounded-lg bg-red-500 px-6 py-3">
                <Text className="text-center font-bold text-white">{action.name}</Text>
              </Pressable>
            ))}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
} // Substitua pelo caminho correto do GIF
