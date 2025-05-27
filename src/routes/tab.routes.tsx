import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Gear, House as HomeIcon, Notebook, PersonSimpleTaiChi } from 'phosphor-react-native';
import { Home } from '~/views/environments/app/home/page';
import { Notes } from '~/views/environments/app/notes/page';
import { Options } from '~/views/environments/app/options/page';
import { ElderlyHealthSettings } from '~/views/environments/bi/home/page';

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
        component={Options}
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
        name="Saúde"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <PersonSimpleTaiChi color={focused ? '#007AFF' : '#8e8e93'} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Controle"
        component={ElderlyHealthSettings}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Gear color={focused ? '#007AFF' : '#8e8e93'} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
