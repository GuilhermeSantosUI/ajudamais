import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Bell, Clock, FirstAid, Pill, Plus, Syringe } from 'phosphor-react-native';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type Reminder = {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: Date;
  repeat: boolean;
  type: 'medication' | 'appointment' | 'general' | 'vaccine';
  active: boolean;
};

export function Notes() {
  const navigation = useNavigation();
  const sheetRef = useRef<BottomSheet>(null);
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Tomar Paracetamol',
      description: '500mg após o almoço',
      date: new Date(),
      time: new Date(new Date().setHours(12, 30)),
      repeat: true,
      type: 'medication',
      active: true,
    },
    {
      id: '2',
      title: 'Consulta médica',
      description: 'Retorno com Dr. Silva',
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      time: new Date(new Date().setHours(14, 0)),
      repeat: false,
      type: 'appointment',
      active: true,
    },
    {
      id: '3',
      title: 'Vacina da gripe',
      description: 'Dose anual',
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      time: new Date(new Date().setHours(10, 0)),
      repeat: false,
      type: 'vaccine',
      active: true,
    },
  ]);

  const [newReminder, setNewReminder] = useState<Omit<Reminder, 'id'>>({
    title: '',
    description: '',
    date: new Date(),
    time: new Date(),
    repeat: false,
    type: 'general',
    active: true,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const snapPoints = useMemo(() => ['80%'], []);

  const handleSheetChange = useCallback((index: number) => {
    if (index === -1) {
      setIsCreating(false);
    }
  }, []);

  const toggleReminder = (id: string) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id ? { ...reminder, active: !reminder.active } : reminder
      )
    );
  };

  const addReminder = () => {
    const newId = (reminders.length + 1).toString();
    setReminders([...reminders, { ...newReminder, id: newId }]);
    setNewReminder({
      title: '',
      description: '',
      date: new Date(),
      time: new Date(),
      repeat: false,
      type: 'general',
      active: true,
    });
    setIsCreating(false);
    sheetRef.current?.close();
  };

  const getTypeIcon = (type: Reminder['type']) => {
    switch (type) {
      case 'medication':
        return <Pill size={24} color="#007AFF" weight="fill" />;
      case 'appointment':
        return <FirstAid size={24} color="#007AFF" weight="fill" />;
      case 'vaccine':
        return <Syringe size={24} color="#007AFF" weight="fill" />;
      default:
        return <Bell size={24} color="#007AFF" weight="fill" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <StatusBar style="dark" />

      <View className="flex-1 p-6 pt-16">
        <View className="mb-6 flex-row items-center justify-between">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
              <ArrowLeft weight="bold" size={20} color="#007AFF" />
            </View>
          </TouchableOpacity>

          <Text className="font-[DINNextW1GMedium] text-2xl text-gray-800">Lembretes</Text>

          <TouchableOpacity
            onPress={() => {
              setIsCreating(true);
              sheetRef.current?.expand();
            }}>
            <View className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500">
              <Plus weight="bold" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1">
          {reminders.length === 0 ? (
            <View className="flex-1 items-center justify-center pt-16">
              <Bell size={64} color="#9CA3AF" weight="light" />
              <Text className="mt-4 font-[DINNextW1GRegular] text-lg text-gray-500">
                Nenhum lembrete cadastrado
              </Text>
            </View>
          ) : (
            reminders.map((reminder) => (
              <View key={reminder.id} className="mb-4 rounded-xl bg-white p-4">
                <View className="flex-row items-start justify-between">
                  <View className="mr-3 flex-row items-start">
                    <View className="mr-3 mt-1">{getTypeIcon(reminder.type)}</View>
                    <View className="flex-1">
                      <Text className="font-[DINNextW1GMedium] text-lg text-gray-800">
                        {reminder.title}
                      </Text>
                      <Text className="mb-2 font-[DINNextW1GRegular] text-base text-gray-500">
                        {reminder.description}
                      </Text>
                      <View className="flex-row items-center">
                        <Clock size={16} color="#6B7280" weight="bold" />
                        <Text className="ml-1 font-[DINNextW1GRegular] text-sm text-gray-500">
                          {formatDate(reminder.date)} às {formatTime(reminder.time)}
                          {reminder.repeat && ' (repetir)'}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Switch
                    value={reminder.active}
                    onValueChange={() => toggleReminder(reminder.id)}
                    trackColor={{ false: '#E5E7EB', true: '#007AFF' }}
                    className="absolute right-1"
                    thumbColor="#FFFFFF"
                  />
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>

      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChange}
        backgroundStyle={{ backgroundColor: '#F9FAFB' }}
        handleIndicatorStyle={{ backgroundColor: '#D1D5DB' }}>
        <BottomSheetView className="flex-1 p-6">
          <Text className="mb-6 font-[DINNextW1GMedium] text-2xl text-gray-800">
            {isCreating ? 'Novo Lembrete' : 'Editar Lembrete'}
          </Text>

          <View className="mb-4">
            <Text className="mb-2 font-[DINNextW1GRegular] text-base text-gray-500">
              Tipo de lembrete
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                className={`mr-2 flex-1 items-center rounded-lg py-3 ${newReminder.type === 'medication' ? 'bg-blue-100' : 'bg-gray-200'}`}
                onPress={() => setNewReminder({ ...newReminder, type: 'medication' })}>
                <Pill size={24} color={newReminder.type === 'medication' ? '#007AFF' : '#6B7280'} />
                <Text
                  className={`mt-1 font-[DINNextW1GRegular] ${newReminder.type === 'medication' ? 'text-blue-500' : 'text-gray-500'}`}>
                  Medicação
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`mr-2 flex-1 items-center rounded-lg py-3 ${newReminder.type === 'appointment' ? 'bg-blue-100' : 'bg-gray-200'}`}
                onPress={() => setNewReminder({ ...newReminder, type: 'appointment' })}>
                <FirstAid
                  size={24}
                  color={newReminder.type === 'appointment' ? '#007AFF' : '#6B7280'}
                />
                <Text
                  className={`mt-1 font-[DINNextW1GRegular] ${newReminder.type === 'appointment' ? 'text-blue-500' : 'text-gray-500'}`}>
                  Consulta
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`mr-2 flex-1 items-center rounded-lg py-3 ${newReminder.type === 'vaccine' ? 'bg-blue-100' : 'bg-gray-200'}`}
                onPress={() => setNewReminder({ ...newReminder, type: 'vaccine' })}>
                <Syringe size={24} color={newReminder.type === 'vaccine' ? '#007AFF' : '#6B7280'} />
                <Text
                  className={`mt-1 font-[DINNextW1GRegular] ${newReminder.type === 'vaccine' ? 'text-blue-500' : 'text-gray-500'}`}>
                  Vacina
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 items-center rounded-lg py-3 ${newReminder.type === 'general' ? 'bg-blue-100' : 'bg-gray-200'}`}
                onPress={() => setNewReminder({ ...newReminder, type: 'general' })}>
                <Bell size={24} color={newReminder.type === 'general' ? '#007AFF' : '#6B7280'} />
                <Text
                  className={`mt-1 font-[DINNextW1GRegular] ${newReminder.type === 'general' ? 'text-blue-500' : 'text-gray-500'}`}>
                  Geral
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-4">
            <Text className="mb-2 font-[DINNextW1GRegular] text-base text-gray-500">Título</Text>
            <TextInput
              className="rounded-lg bg-gray-200 px-4 py-3 font-[DINNextW1GRegular] text-base"
              placeholder="Ex: Tomar remédio"
              value={newReminder.title}
              onChangeText={(text) => setNewReminder({ ...newReminder, title: text })}
            />
          </View>

          <View className="mb-4">
            <Text className="mb-2 font-[DINNextW1GRegular] text-base text-gray-500">
              Descrição (opcional)
            </Text>
            <TextInput
              className="rounded-lg bg-gray-200 px-4 py-3 font-[DINNextW1GRegular] text-base"
              placeholder="Ex: 500mg após o almoço"
              value={newReminder.description}
              onChangeText={(text) => setNewReminder({ ...newReminder, description: text })}
              multiline
            />
          </View>

          <View className="mb-4 flex-row">
            <TouchableOpacity
              className="mr-2 flex-1 rounded-lg bg-gray-200 px-4 py-3"
              onPress={() => setShowDatePicker(true)}>
              <Text className="font-[DINNextW1GRegular] text-base text-gray-500">
                Data: {formatDate(newReminder.date)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 rounded-lg bg-gray-200 px-4 py-3"
              onPress={() => setShowTimePicker(true)}>
              <Text className="font-[DINNextW1GRegular] text-base text-gray-500">
                Hora: {formatTime(newReminder.time)}
              </Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={newReminder.date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setNewReminder({ ...newReminder, date: selectedDate });
                }
              }}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={newReminder.time}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) {
                  setNewReminder({ ...newReminder, time: selectedTime });
                }
              }}
            />
          )}

          <View className="mb-8 flex-row items-center justify-between">
            <Text className="font-[DINNextW1GRegular] text-base text-gray-500">
              Repetir diariamente
            </Text>
            <Switch
              value={newReminder.repeat}
              onValueChange={(value) => setNewReminder({ ...newReminder, repeat: value })}
              trackColor={{ false: '#E5E7EB', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <TouchableOpacity
            className="rounded-lg bg-blue-500 py-4"
            onPress={addReminder}
            disabled={!newReminder.title}>
            <Text className="text-center font-[DINNextW1GMedium] text-white">
              {isCreating ? 'Adicionar Lembrete' : 'Salvar Alterações'}
            </Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
