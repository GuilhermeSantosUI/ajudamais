import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
  ArrowLeft,
  CalendarBlank,
  CaretRight,
  ClipboardText,
  Clock,
  FirstAid,
  Info,
  MapPin,
  QrCode,
  ShieldCheck,
  User,
} from 'phosphor-react-native';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export function Details() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { exam } = route.params;

  function handleOpenMaps() {
    Linking.openURL(`https://maps.google.com/?q=${exam.details.address}`);
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 128 }} className="bg-[#F2F2F2]">
      <StatusBar style="light" />

      <View className="flex h-[300px] w-full justify-end rounded-xl bg-[#0E82FD] px-5 pb-10">
        <TouchableOpacity
          className="absolute left-5 top-20 h-[50px] w-[50px]"
          onPress={() => navigation.goBack()}>
          <View className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
            <ArrowLeft weight="bold" size={20} color="#007AFF" />
          </View>
        </TouchableOpacity>

        <Text className="mb-4 font-[DINNextW1GRegular] text-[18px] text-white">
          Exame a se fazer
        </Text>
        <Text className="font-[DINNextW1GMedium] text-[40px] text-white">{exam.name}</Text>
        <Text className="mt-2 font-[DINNextW1GRegular] text-[16px] text-white">
          {exam.location}
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 py-8" showsVerticalScrollIndicator={false}>
        <View className="mb-6 rounded-xl border border-gray-100 bg-white p-5">
          <View className="mb-3 flex-row items-center">
            <View className="mr-3 rounded-lg bg-blue-50 p-2">
              <FirstAid size={24} color="#3B82F6" weight="fill" />
            </View>
            <View className="flex-1">
              <Text className="font-[DINNextW1GMedium] text-lg text-[#1E293B]">{exam.name}</Text>
              <Text className="mt-1 font-[DINNextW1GRegular] text-sm text-[#64748B]">
                {exam.location}
              </Text>
            </View>

            <View className="rounded-full bg-green-50 px-3 py-1">
              <Text className="font-[DINNextW1GMedium] text-sm text-green-700">
                {exam.status || 'Agendado'}
              </Text>
            </View>
          </View>

          <View className="my-4 h-px bg-gray-100" />

          <View className="mb-4 flex-row justify-between">
            <View className="items-start">
              <Text className="mb-1 font-[DINNextW1GMedium] text-xs text-[#64748B]">Data</Text>
              <View className="flex-row items-center">
                <View className="mr-1">
                  <CalendarBlank size={16} color="#3B82F6" weight="bold" />
                </View>
                <Text className="font-[DINNextW1GMedium] text-sm text-[#1E293B]">{exam.date}</Text>
              </View>
            </View>

            <View className="items-start">
              <Text className="mb-1 font-[DINNextW1GMedium] text-xs text-[#64748B]">Horário</Text>
              <View className="flex-row items-center">
                <View className="mr-1">
                  <Clock size={16} color="#3B82F6" weight="bold" />
                </View>
                <Text className="font-[DINNextW1GMedium] text-sm text-[#1E293B]">{exam.time}</Text>
              </View>
            </View>

            <View className="items-start">
              <Text className="mb-1 font-[DINNextW1GMedium] text-xs text-[#64748B]">Duração</Text>
              <Text className="font-[DINNextW1GMedium] text-sm text-[#1E293B]">
                {exam.duration || '30 min'}
              </Text>
            </View>
          </View>

          <View className="mb-3">
            <Text className="mb-1 font-[DINNextW1GMedium] text-xs text-[#64748B]">Laboratório</Text>
            <Text className="font-[DINNextW1GMedium] text-sm text-[#1E293B]">{exam.location}</Text>
          </View>
        </View>

        <View className="mb-6 rounded-xl border border-gray-100 bg-white p-5">
          <View className="mb-3 flex-row items-center">
            <View className="mr-2">
              <MapPin size={20} color="#3B82F6" weight="bold" />
            </View>
            <Text className="font-[DINNextW1GMedium] text-lg text-[#1E293B]">Localização</Text>
          </View>

          <Text className="mb-4 font-[DINNextW1GRegular] text-base text-[#64748B]">
            {exam.details.address}
          </Text>

          <TouchableOpacity
            onPress={handleOpenMaps}
            className="flex-row items-center justify-between rounded-lg bg-blue-50 p-3">
            <View className="flex-row items-center">
              <View className="mr-2">
                <CaretRight size={16} color="#3B82F6" weight="bold" />
              </View>
              <Text className="font-[DINNextW1GMedium] text-base text-blue-600">
                Ver rota no mapa
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="mb-6 rounded-xl border border-gray-100 bg-white p-5">
          <View className="mb-4 flex-row items-center">
            <View className="mr-2">
              <User size={20} color="#3B82F6" weight="bold" />
            </View>
            <Text className="font-[DINNextW1GMedium] text-lg text-[#1E293B]">
              Médico Responsável
            </Text>
          </View>

          <View className="mb-5">
            <Text className="mb-1 font-[DINNextW1GMedium] text-base text-[#1E293B]">
              {exam.details.doctor}
            </Text>
            <Text className="font-[DINNextW1GRegular] text-sm text-[#64748B]">
              {exam.details.specialty || 'Radiologia'}
            </Text>
            <Text className="font-[DINNextW1GRegular] text-sm text-[#64748B]">
              CRM: {exam.details.crm || '12345/SP'}
            </Text>
          </View>

          <View className="my-3 h-px bg-gray-100" />

          <View className="mb-4 flex-row items-center">
            <View className="mr-2">
              <ClipboardText size={20} color="#3B82F6" weight="bold" />
            </View>
            <Text className="font-[DINNextW1GMedium] text-lg text-[#1E293B]">Motivos do Exame</Text>
          </View>

          <View className="mb-1">
            {exam.details.reasons.map((item: string, index: number) => (
              <View key={index} className="mb-3 flex-row items-start">
                <View className="mr-3 mt-1 rounded-full bg-blue-100 p-1">
                  <View className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                </View>
                <Text className="flex-1 font-[DINNextW1GRegular] text-base text-[#64748B]">
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mb-6 rounded-xl border border-gray-100 bg-white p-5">
          <View className="mb-4 flex-row items-center">
            <View className="mr-2">
              <Info size={20} color="#3B82F6" weight="bold" />
            </View>
            <Text className="font-[DINNextW1GMedium] text-lg text-[#1E293B]">Preparação</Text>
          </View>

          <View className="mb-1">
            {exam.details.preparation.map((item: string, index: number) => (
              <View key={index} className="mb-3 flex-row items-start">
                <View className="mr-3 mt-1 rounded-full bg-blue-100 p-1">
                  <View className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                </View>
                <Text className="flex-1 font-[DINNextW1GRegular] text-base text-[#64748B]">
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mb-6 rounded-xl border border-gray-100 bg-white p-5">
          <View className="mb-4 flex-row items-center">
            <View className="mr-2">
              <ShieldCheck size={20} color="#3B82F6" weight="bold" />
            </View>
            <Text className="font-[DINNextW1GMedium] text-lg text-[#1E293B]">
              Documentos Necessários
            </Text>
          </View>

          <View className="mb-1">
            <View className="mb-3 flex-row items-start">
              <View className="mr-3 mt-1 rounded-full bg-blue-100 p-1">
                <View className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              </View>
              <Text className="flex-1 font-[DINNextW1GRegular] text-base text-[#64748B]">
                Documento de identificação com foto (RG ou CNH)
              </Text>
            </View>
            <View className="mb-3 flex-row items-start">
              <View className="mr-3 mt-1 rounded-full bg-blue-100 p-1">
                <View className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              </View>
              <Text className="flex-1 font-[DINNextW1GRegular] text-base text-[#64748B]">
                Carteirinha do convênio (se aplicável)
              </Text>
            </View>
            <View className="flex-row items-start">
              <View className="mr-3 mt-1 rounded-full bg-blue-100 p-1">
                <View className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              </View>
              <Text className="flex-1 font-[DINNextW1GRegular] text-base text-[#64748B]">
                Pedido médico (original ou digital)
              </Text>
            </View>
          </View>
        </View>

        <View className="mb-6">
          <View className="mb-4 rounded-xl border border-gray-100 bg-white p-5">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="font-[DINNextW1GMedium] text-lg text-[#1E293B]">Seu QR Code</Text>
              <QrCode size={20} color="#3B82F6" weight="bold" />
            </View>
            <Text className="mb-4 font-[DINNextW1GRegular] text-sm text-[#64748B]">
              Apresente este código no laboratório para realizar seu exame
            </Text>
            <View className="h-40 items-center justify-center rounded-lg bg-gray-100">
              <Text className="font-[DINNextW1GRegular] text-sm text-[#64748B]">
                [Visualização do QR Code]
              </Text>
            </View>
          </View>

          <View className="rounded-xl border border-blue-100 bg-blue-50 p-5">
            <Text className="mb-2 font-[DINNextW1GMedium] text-base text-blue-800">
              Informações Importantes
            </Text>
            <Text className="font-[DINNextW1GRegular] text-sm text-blue-800">
              {exam.details.additionalInfo ||
                'Chegue com 15 minutos de antecedência. Traga todos os documentos necessários. Em caso de dúvidas, entre em contato com nosso atendimento.'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
}
