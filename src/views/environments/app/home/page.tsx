import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Flame, Footprints, Moon, Users, Warning } from 'phosphor-react-native';
import { Animated, Easing, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';

type RootStackParamList = {
  Family: undefined;
  Emergency: undefined;
  EmergencyScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const family = [
  { id: 1, uri: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 2, uri: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: 3, uri: 'https://randomuser.me/api/portraits/women/3.jpg' },
];

const HOLD_DURATION = 3000; // 3 segundos em milissegundos

export function Home() {
  const navigation = useNavigation<NavigationProp>();
  const [isHolding, setIsHolding] = useState(false);
  const holdTimer = useRef<NodeJS.Timeout | null>(null);
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  const metrics = [
    {
      label: 'Passos',
      value: '4,233',
      time: '12:32',
      icon: (props: any) => <Footprints {...props} />,
    },
    {
      label: 'Sono',
      value: '6hr 12min',
      time: '7h atrás',
      icon: (props: any) => <Moon {...props} />,
    },
    {
      label: 'Calorias',
      value: '1,120',
      time: '13:32',
      icon: (props: any) => <Flame {...props} />,
    },
  ];

  const startHoldTimer = () => {
    setIsHolding(true);

    const progressTiming = Animated.timing(progressAnimation, {
      toValue: 1,
      duration: HOLD_DURATION,
      useNativeDriver: false,
      easing: Easing.linear,
    });

    const pulseSequence = Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 1.1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
    ]);

    const loopAnimation = Animated.loop(pulseSequence);

    animationRef.current = Animated.parallel([progressTiming, loopAnimation]);
    animationRef.current.start();

    holdTimer.current = setTimeout(() => {
      navigation.navigate('EmergencyScreen');
      stopHoldTimer();
    }, HOLD_DURATION);
  };

  const stopHoldTimer = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
    }
    if (animationRef.current) {
      animationRef.current.stop();
    }
    setIsHolding(false);
    progressAnimation.setValue(0);
    scaleAnimation.setValue(1);
  };

  useEffect(() => {
    return () => {
      if (holdTimer.current) {
        clearTimeout(holdTimer.current);
      }
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, []);

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1">
          <View className="p-6">
            <View className="mb-6 rounded-lg bg-gray-100 p-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-1 flex-row items-center gap-4">
                  <View className="h-16 w-16 items-center justify-center rounded-full bg-[#007AFF]">
                    <Text className="font-[DINNextW1GMedium] text-2xl text-[#FEBB01]">L</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-[DINNextW1GRegular] text-sm text-gray-500">
                      Nome do usuário
                    </Text>
                    <Text className="font-[DINNextW1GMedium] text-xl text-black">
                      Luiza Almeida
                    </Text>
                    <Text
                      className="mt-1 font-[DINNextW1GRegular] text-sm text-gray-500"
                      numberOfLines={2}>
                      Luiza Almeida Alcântara Ferreira.
                    </Text>
                  </View>
                </View>
                <View className="ml-4">
                  <Image
                    source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
                    className="h-16 w-16 rounded-full border-2 border-gray-100"
                  />
                </View>
              </View>
            </View>

            <View className="mb-6 flex-1 flex-row justify-between">
              <TouchableOpacity
                onPress={() => navigation.navigate('Family')}
                className="mr-2 w-[50%] flex-1 items-start rounded-lg bg-[#007AFF] px-4 py-6">
                <Users size={32} color="#FEBB01" />
                <Text className="mt-2 font-[DINNextW1GMedium] text-white">
                  Visualizar familiares cadastrados
                </Text>
              </TouchableOpacity>

              <Animated.View
                className="ml-2 w-[50%] flex-1"
                style={{ transform: [{ scale: scaleAnimation }] }}>
                <TouchableOpacity
                  onPressIn={startHoldTimer}
                  onPressOut={stopHoldTimer}
                  className="items-start overflow-hidden rounded-lg bg-red-500 px-4 py-6">
                  <Warning size={32} color="#FFF" />
                  <Text className="mt-2 font-[DINNextW1GMedium] text-white">
                    {isHolding ? 'Segure para confirmar...' : 'SOS - Pedido de socorro'}
                  </Text>
                  {isHolding && (
                    <Animated.View
                      className="absolute bottom-0 left-0 h-1 bg-white"
                      style={{
                        width: progressAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%'],
                        }),
                      }}
                    />
                  )}
                </TouchableOpacity>
              </Animated.View>
            </View>

            <View className="mb-6">
              <Text className="mb-4 font-[DINNextW1GRegular] text-lg text-gray-500">
                Familiares
              </Text>
              <View className="rounded-lg bg-gray-100 p-4">
                <View className="flex-row space-x-[-12px]">
                  {family.map((f) => (
                    <Image
                      key={f.id}
                      source={{ uri: f.uri }}
                      className="h-12 w-12 rounded-full border-2 border-white"
                    />
                  ))}
                  <View className="h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                    <Text className="font-[DINNextW1GMedium] text-sm text-gray-500">+2</Text>
                  </View>
                </View>
              </View>
            </View>

            <Text className="mb-4 font-[DINNextW1GRegular] text-lg text-gray-500">
              Métricas de Saúde
            </Text>

            <View className="rounded-lg bg-gray-100">
              {metrics.map((item, index) => (
                <View
                  key={index}
                  className={`flex-row items-center justify-between p-4 ${
                    index !== metrics.length - 1 ? 'border-b border-gray-200' : ''
                  }`}>
                  <View className="flex-row items-center">
                    <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-[#007AFF]">
                      {item.icon({ size: 24, color: '#FEBB01' })}
                    </View>
                    <View>
                      <Text className="font-[DINNextW1GRegular] text-base text-gray-500">
                        {item.label}
                      </Text>
                      <Text className="font-[DINNextW1GMedium] text-2xl text-black">
                        {item.value}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="font-[DINNextW1GRegular] text-sm text-gray-500">
                      {item.time}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
