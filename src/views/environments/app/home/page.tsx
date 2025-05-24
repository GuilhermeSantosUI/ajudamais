import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Asclepius, Pill } from 'phosphor-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Header } from '~/views/components/header';

export function Home() {
  const navigation = useNavigation<any>();

  function handleNavigateToMap() {
    navigation.navigate('Map');
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 128 }} className="bg-[#F2F2F2]">
      <StatusBar style="light" />

      <Header />

      <View className="flex w-full justify-end rounded-xl p-5">
        <Text className="mb-4 font-[DINNextW1GRegular] text-[18px] text-[#8C8C8C]">Funções</Text>
      </View>

      <TouchableOpacity
        onPress={handleNavigateToMap}
        className="flex w-full flex-row items-center gap-4 rounded-xl px-5">
        <View className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#0E82FD]">
          <Asclepius color="#FEBB01" />
        </View>

        <View className="flex-1 justify-center gap-2">
          <Text className="font-[DINNextW1GMedium] text-[20px]">Farmacias</Text>
          <Text className="font-[DINNextW1GRegular] text-[16px] text-[#8C8C8C]">
            Encontre medicamentos nas farmácias mais próximas de você.
          </Text>
        </View>
      </TouchableOpacity>

      <View className="p-5 pb-3">
        <View className="rounded-xl bg-[#E6F2FE] p-6">
          <Text className="font-[DINNextW1GRegular] text-[16px]">
            Pacientes com comorbidades (em breve) terão a opção de{' '}
            <Text className="font-[DINNextW1GMedium] text-[#0E82FD]">solicitar a entrega</Text> dos
            medicamentos em casa, garantindo mais segurança e{' '}
            <Text className="font-[DINNextW1GRegular] text-[16px]">comodidade.</Text>
          </Text>
        </View>
      </View>

      <View className="w-full px-5 py-4">
        <View className="mb-6 flex-row items-center justify-between">
          <Text className="font-[DINNextW1GMedium] text-[20px] text-[#4F4F4F]">Histórico</Text>

          <Pill color="#FEBB01" />
        </View>

        <Text className="mb-6 font-[DINNextW1GRegular] text-[16px] text-[#8C8C8C]">
          Segunda-Feira 07/04/2025
        </Text>

        <View className="px-4">
          {[
            {
              name: 'UBS. Geraldo Magela',
              address: 'R. Central Quatro · Posto de saúde comunitário · 800,0 m',
              time: '19:49',
            },
            {
              name: 'UBS. Augusto Franco',
              address: 'R. Maj. Hunaldo dos Santos · Posto de saúde comunitário · 1,3km',
              time: '18:32',
            },
            {
              name: 'UBS. José de Almeida',
              address: 'R. Central Quatro · Posto de saúde comunitário · 800,0 m',
              time: '17:12',
            },
            {
              name: 'UBS. João Alves',
              address: 'R. Central Quatro · Posto de saúde comunitário · 800,0 m',
              time: '16:45',
            },
          ].map((item, idx) => (
            <View key={item.name} className="mb-5 flex-row justify-between">
              <View className="flex-1 gap-2">
                <Text className="font-[DINNextW1GMedium] text-[16px] text-black">{item.name}</Text>
                <Text className="font-[DINNextW1GRegular] text-[15px] text-blue-500">
                  {item.address}
                </Text>
              </View>
              <Text className="font-[DINNextW1GRegular] text-[15px] text-[#8C8C8C]">
                {item.time}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
