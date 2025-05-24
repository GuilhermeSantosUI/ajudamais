import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DotsNine, FileArchive, House as HomeIcon, Lock } from 'phosphor-react-native';

import { Exams } from '~/views/environments/app/exams/page';
import { Home } from '~/views/environments/app/home/page';
import { Options } from '~/views/environments/app/options/page';
import { HomeBI } from '~/views/environments/bi/home/page';

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
        name="Opções"
        component={Options}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <DotsNine color={focused ? '#007AFF' : '#8e8e93'} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Exames"
        component={Exams}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FileArchive color={focused ? '#007AFF' : '#8e8e93'} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Controle"
        // component={Account}
        component={HomeBI}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Lock color={focused ? '#007AFF' : '#8e8e93'} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
