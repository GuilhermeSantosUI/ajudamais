import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EmergencyScreen } from '~/views/environments/app/home/emergency';
import { Map } from '~/views/environments/app/map/page';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import TabRoutes from './tab.routes';

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
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
