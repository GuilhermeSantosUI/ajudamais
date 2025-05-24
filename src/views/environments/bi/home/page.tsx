import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
  BookOpen,
  ChartLine,
  Coins,
  FileText,
  GraduationCap,
  Heartbeat,
  PuzzlePiece,
  Wallet,
} from 'phosphor-react-native';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export function HomeBI() {
  const navigation = useNavigation<any>();

  const handleDespesa = () => navigation.navigate('Despesa');
  const handleReceitas = () => navigation.navigate('Receitas');
  const handleExtratos = () => navigation.navigate('Extratos');
  const handleGerencial = () => navigation.navigate('Gerencial');
  const handleRestos = () => navigation.navigate('Restos');
  const handleFundeb = () => navigation.navigate('FUNDEB');
  const handleEducacao = () => navigation.navigate('Educacao');
  const handleSaudePlus = () => navigation.navigate('Saude');

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 64 }}>
      <StatusBar style="light" />

      <View className="flex h-[300px] w-full justify-end rounded-xl bg-[#0D295D] px-5 pb-10">
        <Image
          source={{ uri: 'https://avatars.githubusercontent.com/u/69989490?v=4' }}
          className="absolute left-5 top-20 h-[50px] w-[50px] rounded-full"
        />

        <Text className="mb-4 font-[DINNextW1GRegular] text-[18px] text-white">
          Olá, Guilherme!
        </Text>
        <Text className="font-[DINNextW1GMedium] text-[40px] text-white">Portal BI</Text>
        <Text className="mt-2 font-[DINNextW1GRegular] text-[16px] text-white">
          Prefeitura Mun. de Boquim
        </Text>
      </View>

      <View className="p-5">
        <Text className="mb-4 font-[DINNextW1GMedium] text-[20px] text-gray-500">Finanças</Text>
        <View className="mb-6 flex-row flex-wrap gap-4">
          <MenuItem
            label="Despesa"
            icon={<Wallet size={28} color="#000" weight="regular" />}
            onPress={handleDespesa}
          />
          <MenuItem
            label="Receitas"
            icon={<BookOpen size={28} color="#000" weight="regular" />}
            onPress={handleReceitas}
          />
          <MenuItem
            label="Extratos"
            icon={<FileText size={28} color="#000" weight="regular" />}
            onPress={handleExtratos}
          />
          <MenuItem
            label="Gerencial"
            icon={<ChartLine size={28} color="#000" weight="regular" />}
            onPress={handleGerencial}
          />
          <MenuItem
            label="Restos"
            icon={<Coins size={28} color="#000" weight="regular" />}
            onPress={handleRestos}
          />
        </View>

        <Text className="mb-4 font-[DINNextW1GMedium] text-[20px] text-gray-500">Fundos</Text>
        <View className="mb-6 flex-row flex-wrap gap-4">
          <MenuItem
            label="FUNDEB"
            icon={<PuzzlePiece size={28} color="#000" weight="regular" />}
            onPress={handleFundeb}
          />
          <MenuItem
            label="Educação"
            icon={<GraduationCap size={28} color="#000" weight="regular" />}
            onPress={handleEducacao}
          />
        </View>

        <Text className="mb-4 font-[DINNextW1GMedium] text-[20px] text-gray-500">Outros</Text>
        <View className="mb-6 flex-row flex-wrap gap-4">
          <MenuItem
            label="Saúde+"
            icon={<Heartbeat size={28} color="#000" weight="regular" />}
            onPress={handleSaudePlus}
          />
        </View>
      </View>
    </ScrollView>
  );
}

interface MenuItemProps {
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
}

function MenuItem({ label, icon, onPress }: MenuItemProps) {
  return (
    <View className="flex items-center gap-2">
      <TouchableOpacity
        className="h-[60px] w-[60px] items-center rounded-xl border border-gray-200 bg-white p-4"
        onPress={onPress}>
        <View className="mb-2">{icon}</View>
      </TouchableOpacity>
      <Text className="text-center font-[DINNextW1GRegular] text-[14px]">{label}</Text>
    </View>
  );
}
