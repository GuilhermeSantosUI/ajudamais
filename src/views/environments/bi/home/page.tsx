import {
  AndroidLogo,
  AppleLogo,
  Bell,
  DeviceMobile,
  Heartbeat,
  Lock,
  Question,
  User,
} from 'phosphor-react-native';
import { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

export function ElderlyHealthSettings() {
  const [isWatchConnected, setIsWatchConnected] = useState(false);
  const [medicationReminders, setMedicationReminders] = useState(true);
  const [fallDetection, setFallDetection] = useState(true);
  const [emergencySOS, setEmergencySOS] = useState(true);
  const [heartRateMonitoring, setHeartRateMonitoring] = useState(true);
  const [shareDataWithFamily, setShareDataWithFamily] = useState(true);

  return (
    <ScrollView className="flex-1 bg-gray-50 p-6">
      <Text className="mb-6 text-3xl font-bold text-[#0D295D]">Configurações de Saúde</Text>

      {/* Health Monitoring Section */}
      <View className="mb-8 rounded-xl bg-white p-6 shadow-sm">
        <Text className="mb-4 text-xl font-semibold text-gray-800">Monitoramento de Saúde</Text>

        <View className="mb-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <AppleLogo size={24} color="#000" weight="fill" className="mr-3" />
            <Text className="text-lg">Conectar Apple Watch</Text>
          </View>
          <Switch
            value={isWatchConnected}
            onValueChange={setIsWatchConnected}
            trackColor={{ false: '#767577', true: '#0D295D' }}
          />
        </View>

        <View className="mb-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <AndroidLogo size={24} color="#000" weight="fill" className="mr-3" />
            <Text className="text-lg">Conectar Wear OS</Text>
          </View>
          <Switch
            value={isWatchConnected}
            onValueChange={setIsWatchConnected}
            trackColor={{ false: '#767577', true: '#0D295D' }}
          />
        </View>

        <View className="mb-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Heartbeat size={24} color="#000" weight="fill" className="mr-3" />
            <Text className="text-lg">Monitoramento de Frequência Cardíaca</Text>
          </View>
          <Switch
            value={heartRateMonitoring}
            onValueChange={setHeartRateMonitoring}
            trackColor={{ false: '#767577', true: '#0D295D' }}
          />
        </View>
      </View>

      {/* Alerts and Notifications */}
      <View className="mb-8 rounded-xl bg-white p-6 shadow-sm">
        <Text className="mb-4 text-xl font-semibold text-gray-800">Alertas e Notificações</Text>

        <View className="mb-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Bell size={24} color="#000" weight="fill" className="mr-3" />
            <Text className="text-lg">Lembretes de Medicamentos</Text>
          </View>
          <Switch
            value={medicationReminders}
            onValueChange={setMedicationReminders}
            trackColor={{ false: '#767577', true: '#0D295D' }}
          />
        </View>

        <View className="mb-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <DeviceMobile size={24} color="#000" weight="fill" className="mr-3" />
            <Text className="text-lg">Detecção de Quedas</Text>
          </View>
          <Switch
            value={fallDetection}
            onValueChange={setFallDetection}
            trackColor={{ false: '#767577', true: '#0D295D' }}
          />
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Heartbeat size={24} color="#000" weight="fill" className="mr-3" />
            <Text className="text-lg">SOS de Emergência</Text>
          </View>
          <Switch
            value={emergencySOS}
            onValueChange={setEmergencySOS}
            trackColor={{ false: '#767577', true: '#0D295D' }}
          />
        </View>
      </View>

      {/* Family and Privacy */}
      <View className="mb-8 rounded-xl bg-white p-6 shadow-sm">
        <Text className="mb-4 text-xl font-semibold text-gray-800">Família e Privacidade</Text>

        <TouchableOpacity className="mb-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <User size={24} color="#000" weight="fill" className="mr-3" />
            <Text className="text-lg">Compartilhar dados com familiares</Text>
          </View>
          <Switch
            value={shareDataWithFamily}
            onValueChange={setShareDataWithFamily}
            trackColor={{ false: '#767577', true: '#0D295D' }}
          />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Lock size={24} color="#000" weight="fill" className="mr-3" />
            <Text className="text-lg">Contatos de Emergência</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Help and Support */}
      <View className="rounded-xl bg-white p-6 shadow-sm">
        <Text className="mb-4 text-xl font-semibold text-gray-800">Ajuda e Suporte</Text>

        <TouchableOpacity className="mb-4 flex-row items-center">
          <Question size={24} color="#000" weight="fill" className="mr-3" />
          <Text className="text-lg">Central de Ajuda</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center">
          <DeviceMobile size={24} color="#000" weight="fill" className="mr-3" />
          <Text className="text-lg">Tutorial do Aplicativo</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-8 items-center">
        <Text className="text-sm text-gray-500">Versão 1.2.3</Text>
      </View>
    </ScrollView>
  );
}
