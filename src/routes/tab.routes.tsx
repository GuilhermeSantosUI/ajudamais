import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '~/views/environments/app/home/page';
import { Notes } from '~/views/environments/app/notes/page';
import { Settings } from '~/views/environments/app/settings/page';
import { Gear, House as HomeIcon, Notebook } from 'phosphor-react-native';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 1,
          height: 90,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: 'DINNextW1GRegular',
          marginTop: 4,
        },
      }}>
      <Tab.Screen
        name="Início"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon color={focused ? '#007AFF' : '#8e8e93'} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Notas"
        component={Notes}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Notebook color={focused ? '#007AFF' : '#8e8e93'} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Controle"
        component={Settings}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Gear color={focused ? '#007AFF' : '#8e8e93'} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
