import { useNavigation } from '@react-navigation/native';
import {
  CalendarBlank,
  CaretRight,
  Clock,
  FirstAid,
  MagnifyingGlass,
  Plus,
} from 'phosphor-react-native';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export function Exams() {
  const navigation = useNavigation<any>();

  const exams = [
    {
      id: 1,
      name: 'Hemograma Completo',
      date: '15/03/2024',
      time: '08:30',
      location: 'Laboratório Central',
      status: 'Agendado',
      type: 'Análise Clínica',
      code: 'AX-205',
      duration: '30 min',
      details: {
        address: 'Av. Dr. João Durval Carneiro, 3665 - Caseb, Feira de Santana - BA',
        doctor: 'Carlos Eduardo Silva',
        specialty: 'Hematologia',
        crm: '12345/BA',
        preparation: [
          'Jejum de 8 horas obrigatório',
          'Evitar exercícios físicos 24h antes',
          'Manter hidratação normal',
        ],
        reasons: ['Controle de rotina', 'Acompanhamento de anemia', 'Verificação de plaquetas'],
        additionalInfo: 'Trazer documento de identidade e carteirinha do convênio.',
      },
    },
    {
      id: 2,
      name: 'Glicemia em Jejum',
      date: '16/03/2024',
      time: '07:00',
      location: 'Laboratório Saúde Total',
      status: 'Pendente',
      type: 'Bioquímica',
      code: 'GL-102',
      duration: '15 min',
      details: {
        address: 'R. São Domingos, 185 - Centro, Feira de Santana - BA',
        doctor: 'Ana Paula Oliveira',
        specialty: 'Endocrinologia',
        crm: '54321/BA',
        preparation: ['Jejum de 12 horas obrigatório', 'Não fumar antes do exame'],
        reasons: ['Monitoramento de diabetes', 'Check-up anual'],
        additionalInfo: 'Chegar com 30 minutos de antecedência.',
      },
    },
    {
      id: 3,
      name: 'Colesterol Total',
      date: '17/03/2024',
      time: '09:15',
      location: 'Clínica Diagnóstica',
      status: 'Agendado',
      type: 'Bioquímica',
      code: 'CT-301',
      duration: '20 min',
      details: {
        address: 'Av. Maria Quitéria, 1900 - Kalilândia, Feira de Santana - BA',
        doctor: 'Roberto Santos',
        specialty: 'Cardiologia',
        crm: '67890/BA',
        preparation: ['Jejum de 12 horas', 'Evitar alimentos gordurosos no dia anterior'],
        reasons: ['Acompanhamento de hipercolesterolemia', 'Exame de rotina'],
        additionalInfo: 'Trazer exames anteriores se houver.',
      },
    },
    {
      id: 5,
      name: 'Ultrassom Abdominal',
      date: '20/03/2024',
      time: '14:30',
      location: 'Imagem Diagnóstica',
      status: 'Agendado',
      type: 'Imagem',
      code: 'US-450',
      duration: '40 min',
      details: {
        address: 'R. Professor Geminiano Costa, 265 - Capuchinhos, Feira de Santana - BA',
        doctor: 'Fernanda Lima',
        specialty: 'Radiologia',
        crm: '24680/BA',
        preparation: [
          'Jejum de 6 horas',
          'Beber 1 litro de água 1 hora antes',
          'Não urinar antes do exame',
        ],
        reasons: ['Investigar dor abdominal', 'Avaliação de fígado e vesícula'],
        additionalInfo: 'Trazer requisição médica.',
      },
    },
  ];

  function handlePressDetails(exam: any) {
    navigation.navigate('Details', { exam });
  }

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <View className="flex h-[200px] w-full justify-end rounded-xl bg-[#0E82FD] px-5 pb-10">
        <View className="mb-4 flex-row items-center justify-between">
          <View>
            <Text className="font-[DINNextW1GRegular] text-lg text-white/90">Bem-vindo,</Text>
            <Text className="font-[DINNextW1GBold] text-2xl text-white">Guilherme</Text>
          </View>

          <Image
            source={{ uri: 'https://avatars.githubusercontent.com/u/69989490?v=4' }} // Add your image source here
            className="h-10 w-10 rounded-full"
          />
        </View>

        <View className="flex-row items-center rounded-xl bg-white/20 px-4 py-2">
          <MagnifyingGlass size={20} color="white" weight="bold" />
          <Text className="ml-2 font-[DINNextW1GRegular] text-base text-white/90">
            Buscar exames...
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between px-6 pt-4">
        <TouchableOpacity className="items-center">
          <View className="mb-1 h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <Text className="font-[DINNextW1GBold] text-blue-600">5</Text>
          </View>
          <Text className="font-[DINNextW1GMedium] text-sm text-[#1E293B]">Agendados</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <View className="mb-1 h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
            <Text className="font-[DINNextW1GBold] text-yellow-600">2</Text>
          </View>
          <Text className="font-[DINNextW1GMedium] text-sm text-[#1E293B]">Pendentes</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <View className="mb-1 h-12 w-12 items-center justify-center rounded-xl bg-green-100">
            <Text className="font-[DINNextW1GBold] text-green-600">12</Text>
          </View>
          <Text className="font-[DINNextW1GMedium] text-sm text-[#1E293B]">Realizados</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <View className="mb-1 h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
            <Text className="font-[DINNextW1GBold] text-purple-600">3</Text>
          </View>
          <Text className="font-[DINNextW1GMedium] text-sm text-[#1E293B]">Resultados</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center justify-between px-6 pb-2 pt-6">
        <Text className="font-[DINNextW1GBold] text-xl text-[#1E293B]">Próximos Exames</Text>
        <TouchableOpacity className="flex-row items-center">
          <Text className="mr-1 font-[DINNextW1GMedium] text-sm text-blue-600">Ver todos</Text>
          <CaretRight size={16} color="#3B82F6" weight="bold" />
        </TouchableOpacity>
      </View>

      <ScrollView className="mb-[90px] flex-1 px-6 pb-32" showsVerticalScrollIndicator={false}>
        {exams.map((exam) => (
          <TouchableOpacity
            key={exam.id}
            activeOpacity={0.9}
            onPress={() => handlePressDetails(exam)}
            className="mb-4 rounded-2xl border border-gray-200 bg-white p-5">
            <View className="mb-3 flex-row items-start">
              <View className="mr-3 rounded-lg bg-blue-100 p-2">
                <FirstAid size={20} color="#3B82F6" weight="fill" />
              </View>
              <View className="flex-1">
                <Text className="font-[DINNextW1GBold] text-lg text-[#1E293B]">{exam.name}</Text>
                <Text className="font-[DINNextW1GRegular] text-sm text-[#64748B]">
                  {exam.type} • {exam.code}
                </Text>
              </View>
              <View
                className={`rounded-full px-3 py-1 ${exam.status === 'Agendado' ? 'bg-green-50' : 'bg-yellow-50'}`}>
                <Text
                  className={`font-[DINNextW1GMedium] text-xs ${exam.status === 'Agendado' ? 'text-green-700' : 'text-yellow-700'}`}>
                  {exam.status}
                </Text>
              </View>
            </View>

            <View className="mb-4 flex-row items-center">
              <View className="mr-4 flex-row items-center">
                <View className="mr-1">
                  <CalendarBlank size={16} color="#64748B" weight="bold" />
                </View>
                <Text className="font-[DINNextW1GMedium] text-sm text-[#64748B]">{exam.date}</Text>
              </View>
              <View className="flex-row items-center">
                <View className="mr-1">
                  <Clock size={16} color="#64748B" weight="bold" />
                </View>
                <Text className="font-[DINNextW1GMedium] text-sm text-[#64748B]">{exam.time}</Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between border-t border-gray-100 pt-3">
              <View>
                <Text className="mb-1 font-[DINNextW1GRegular] text-xs text-[#64748B]">Local</Text>
                <Text className="font-[DINNextW1GMedium] text-sm text-[#1E293B]">
                  {exam.location}
                </Text>
              </View>

              <View className="flex-row items-center rounded-full bg-blue-50 px-4 py-2">
                <Text className="font-[DINNextW1GMedium] text-sm text-blue-600">Detalhes</Text>
                <View className="ml-1">
                  <CaretRight size={16} color="#3B82F6" weight="bold" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.9}
        className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full bg-blue-600 shadow-lg">
        <Plus size={24} color="white" weight="bold" />
      </TouchableOpacity>
    </View>
  );
}
