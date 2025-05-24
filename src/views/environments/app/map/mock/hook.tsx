import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Platform, Text, TouchableOpacity } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export function useNotificationSetup() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef<Notifications.EventSubscription>(null);
  const responseListener = useRef<Notifications.EventSubscription>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => token && setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification received:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response:', response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return { expoPushToken };
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('medication-availability', {
      name: 'Medication Availability',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      sound: 'default',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Permissão para notificações não concedida!');
      return;
    }

    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) throw new Error('Project ID not found');

      token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
    } catch (e) {
      console.error('Error getting push token:', e);
    }
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  return token;
}

export async function scheduleMedicationNotification(medicationName: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Medicamento disponível! ✅',
      body: `${medicationName} está agora disponível na farmácia da UBS Geraldo Maguela.`,
      data: { medication: medicationName },
      sound: 'default',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 10,
    },
  });
}

export function NotificationButton({
  medication,
  disabled,
}: {
  medication: { id: number; name: string; available: boolean };
  disabled?: boolean;
}) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNotificationSubscription = async () => {
    if (isSubscribed) return;

    try {
      await scheduleMedicationNotification(medication.name);
      setIsSubscribed(true);

      setTimeout(() => setIsSubscribed(false), 5 * 60 * 1000);
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleNotificationSubscription}
      disabled={disabled || isSubscribed}
      className={`rounded px-3 py-1 ${isSubscribed ? 'bg-gray-300' : disabled ? 'bg-gray-200' : 'bg-blue-100'}`}>
      <Text
        className={`font-[DINNextW1GMedium] text-sm ${isSubscribed || disabled ? 'text-gray-500' : 'text-blue-800'}`}>
        {isSubscribed ? 'Notificação agendada' : disabled ? 'Disponível' : 'Avise-me quando tiver'}
      </Text>
    </TouchableOpacity>
  );
}
