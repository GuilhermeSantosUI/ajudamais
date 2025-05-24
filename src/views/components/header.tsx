import { Image, Text, View } from 'react-native';

export function Header() {
  return (
    <View className="flex h-[300px] w-full justify-end rounded-xl bg-[#0E82FD] px-5 pb-10">
      <Image
        source={{ uri: 'https://avatars.githubusercontent.com/u/69989490?v=4' }} // Add your image source here
        className="absolute left-5 top-20 h-[50px] w-[50px] rounded-full"
      />

      <Text className="mb-4 font-[DINNextW1GRegular] text-[18px] text-white">Olá, Guilherme!</Text>
      <Text className="font-[DINNextW1GMedium] text-[40px] text-white">Saúde+</Text>
      <Text className="mt-2 font-[DINNextW1GRegular] text-[16px] text-white">
        Prefeitura Mun. de Boquim
      </Text>
    </View>
  );
}
