import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TabRoutes from './tab.routes';

import { Details } from '~/views/environments/app/exams/details';
import { Map } from '~/views/environments/app/map/page';
import { EmergencyScreen } from '~/views/environments/app/options/emergency';
import { MapVisualizer } from '~/views/environments/bi/home/map-view';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#F2F2F2',
            },
          }}>
          <Stack.Screen name="Tabs" component={TabRoutes} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="EmergencyScreen" component={EmergencyScreen} />
          <Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />
          <Stack.Screen name="Saude" component={MapVisualizer} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
