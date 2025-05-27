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
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export function ElderlyHealthSettings() {
  const [isWatchConnected, setIsWatchConnected] = useState(false);
  const [medicationReminders, setMedicationReminders] = useState(true);
  const [fallDetection, setFallDetection] = useState(true);
  const [emergencySOS, setEmergencySOS] = useState(true);
  const [heartRateMonitoring, setHeartRateMonitoring] = useState(true);
  const [shareDataWithFamily, setShareDataWithFamily] = useState(true);

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1">
          <View className="p-6">
            {/* Header */}
            <View className="mb-6">
              <Text className="font-[DINNextW1GMedium] text-2xl text-black">
                Configurações de Saúde
              </Text>
            </View>

            {/* Health Monitoring */}
            <View className="mb-6">
              <Text className="mb-4 font-[DINNextW1GRegular] text-lg text-gray-500">
                Monitoramento de Saúde
              </Text>
              <View className="rounded-lg bg-gray-100">
                <View className="flex-row items-center justify-between border-b border-gray-200 p-4">
                  <View className="flex-row items-center">
                    <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-[#007AFF]">
                      <AppleLogo size={24} color="#FEBB01" />
                    </View>
                    <Text className="font-[DINNextW1GRegular] text-base text-gray-800">
                      Conectar Apple Watch
                    </Text>
                  </View>
                  <Switch
                    value={isWatchConnected}
                    onValueChange={setIsWatchConnected}
                    trackColor={{ false: '#767577', true: '#007AFF' }}
                    thumbColor="#FFFFFF"
                  />
                </View>
                <View className="flex-row items-center justify-between border-b border-gray-200 p-4">
                  <View className="flex-row items-center">
                    <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-[#007AFF]">
                      <AndroidLogo size={24} color="#FEBB01" />
                    </View>
                    <Text className="font-[DINNextW1GRegular] text-base text-gray-800">
                      Conectar Wear OS
                    </Text>
                  </View>
                  <Switch
                    value={isWatchConnected}
                    onValueChange={setIsWatchConnected}
                    trackColor={{ false: '#767577', true: '#007AFF' }}
                    thumbColor="#FFFFFF"
                  />
                </View>
                <View className="flex-row items-center justify-between p-4">
                  <View className="flex-row items-center">
                    <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-[#007AFF]">
                      <Heartbeat size={24} color="#FEBB01" />
                    </View>
                    <Text className="font-[DINNextW1GRegular] text-base text-gray-800">
                      Frequência Cardíaca
                    </Text>
                  </View>
                  <Switch
                    value={heartRateMonitoring}
                    onValueChange={setHeartRateMonitoring}
                    trackColor={{ false: '#767577', true: '#007AFF' }}
                    thumbColor="#FFFFFF"
                  />
                </View>
              </View>
            </View>

            {/* Alerts and Notifications */}
            <View className="mb-6">
              <Text className="mb-4 font-[DINNextW1GRegular] text-lg text-gray-500">
                Alertas e Notificações
              </Text>
              <View className="rounded-lg bg-gray-100">
                <View className="flex-row items-center justify-between border-b border-gray-200 p-4">
                  <View className="flex-row items-center">
                    <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-[#007AFF]">
                      <Bell size={24} color="#FEBB01" />
                    </View>
                    <Text className="font-[DINNextW1GRegular] text-base text-gray-800">
                      Lembretes de Medicamentos
                    </Text>
                  </View>
                  <Switch
                    value={medicationReminders}
                    onValueChange={setMedicationReminders}
                    trackColor={{ false: '#767577', true: '#007AFF' }}
                    thumbColor="#FFFFFF"
                  />
                </View>
                <View className="flex-row items-center justify-between border-b border-gray-200 p-4">
                  <View className="flex-row items-center">
                    <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-[#007AFF]">
                      <DeviceMobile size={24} color="#FEBB01" />
                    </View>
                    <Text className="font-[DINNextW1GRegular] text-base text-gray-800">
                      Detecção de Quedas
                    </Text>
                  </View>
                  <Switch
                    value={fallDetection}
                    onValueChange={setFallDetection}
                    trackColor={{ false: '#767577', true: '#007AFF' }}
                    thumbColor="#FFFFFF"
                  />
                </View>
                <View className="flex-row items-center justify-between p-4">
                  <View className="flex-row items-center">
                    <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-[#007AFF]">
                      <Heartbeat size={24} color="#FEBB01" />
                    </View>
                    <Text className="font-[DINNextW1GRegular] text-base text-gray-800">
                      SOS de Emergência
                    </Text>
                  </View>
                  <Switch
                    value={emergencySOS}
                    onValueChange={setEmergencySOS}
                    trackColor={{ false: '#767577', true: '#007AFF' }}
                    thumbColor="#FFFFFF"
                  />
                </View>
              </View>
            </View>

            {/* Family and Privacy */}
            <View className="mb-6">
              <Text className="mb-4 font-[DINNextW1GRegular] text-lg text-gray-500">
                Família e Privacidade
              </Text>
              <View className="rounded-lg bg-gray-100">
                <View className="flex-row items-center justify-between border-b border-gray-200 p-4">
                  <View className="flex-row items-center">
                    <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-[#007AFF]">
                      <User size={24} color="#FEBB01" />
                    </View>
                    <Text className="font-[DINNextW1GRegular] text-base text-gray-800">
                      Compartilhar dados com familiares
                    </Text>
                  </View>
                  <Switch
                    value={shareDataWithFamily}
                    onValueChange={setShareDataWithFamily}
                    trackColor={{ false: '#767577', true: '#007AFF' }}
                    thumbColor="#FFFFFF"
                  />
                </View>
                <TouchableOpacity className="flex-row items-center p-4">
                  <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-[#007AFF]">
                    <Lock size={24} color="#FEBB01" />
                  </View>
                  <Text className="font-[DINNextW1GRegular] text-base text-gray-800">
                    Contatos de Emergência
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Help and Support */}
            <View className="mb-6">
              <Text className="mb-4 font-[DINNextW1GRegular] text-lg text-gray-500">
                Ajuda e Suporte
              </Text>
              <View className="rounded-lg bg-gray-100">
                <TouchableOpacity className="flex-row items-center border-b border-gray-200 p-4">
                  <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-[#007AFF]">
                    <Question size={24} color="#FEBB01" />
                  </View>
                  <Text className="font-[DINNextW1GRegular] text-base text-gray-800">
                    Central de Ajuda
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center p-4">
                  <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-[#007AFF]">
                    <DeviceMobile size={24} color="#FEBB01" />
                  </View>
                  <Text className="font-[DINNextW1GRegular] text-base text-gray-800">
                    Tutorial do Aplicativo
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Version */}
            <View className="items-center">
              <Text className="font-[DINNextW1GRegular] text-xs text-gray-400">Versão 1.2.3</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
