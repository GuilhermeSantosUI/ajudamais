import { Heart } from 'phosphor-react-native';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import drogasil from '../../../../../assets/drogasil.png';
import edson from '../../../../../assets/edson.png';
import paguemenos from '../../../../../assets/paguemenos.png';
import ubs from '../../../../../assets/ubs.png';

const estabelecimentos = [
  {
    nome: 'Pague Menos',
    endereco: 'Av. Empresário, Av. José Carlos Silva',
    tipo: 'Farmácia de rede privada',
    distancia: '600,0 m',
    logo: paguemenos,
  },
  {
    nome: 'Farmácias Edson',
    endereco: 'Av. José Carlos Silva',
    tipo: 'Farmácia de rede privada',
    distancia: '553,0 m',
    logo: edson,
  },
  {
    nome: 'Drogasil',
    endereco: 'Av. José Carlos Silva',
    tipo: 'Farmácia de rede privada',
    distancia: '900,0 m',
    logo: drogasil,
  },
  {
    nome: 'UBS. Geraldo Magela',
    endereco: 'R. Central Quatro',
    tipo: 'Posto de saúde comunitário',
    distancia: '800,0 m',
    logo: ubs,
  },
  {
    nome: 'UBS. Augusto Franco',
    endereco: 'R. Maj. Hunaldo dos Santos',
    tipo: 'Posto de saúde comunitário',
    distancia: '1,3km',
    logo: ubs,
  },
  {
    nome: 'UBS. Manoel de Souza P...',
    endereco: 'R. Maria do Carmo Batista Santos',
    tipo: 'Posto de saúde comunitário',
    distancia: '3,3km',
    logo: ubs,
  },
];

export function Options() {
  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-6">
      <View className="mb-4 flex-row items-center rounded-xl bg-[#F2F2F7] px-4 py-2">
        <Text className="font-[DINNextW1GRegular] text-lg text-gray-400">
          🔍 O que você precisa hoje?
        </Text>
      </View>

      <Text className="mb-2 font-[DINNextW1GMedium] text-xl font-semibold text-gray-500">
        Farmácias encontradas
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {estabelecimentos.map((item, index) => (
          <View key={index} className="flex-row items-start border-gray-200 py-3">
            <Image
              source={item.logo}
              className="h-18 w-18 mt-1 rounded-full border border-gray-200"
              resizeMode="contain"
            />
            <View className="ml-3 flex-1">
              <Text className="font-[DINNextW1GMedium] text-xl font-semibold text-black">
                {item.nome}
              </Text>
              <Text className="font-[DINNextW1GRegular] text-base text-gray-600">
                {item.endereco} · {item.tipo} · {item.distancia}
              </Text>
            </View>
            <TouchableOpacity className="p-2">
              <Heart color="#999" size={20} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
