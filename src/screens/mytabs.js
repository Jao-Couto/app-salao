import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Principal from './principal';
import Calendario from './calendario';
import Clientes from './clientes';


const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Geral"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Calendario"
        component={Calendario}
        options={{
          tabBarLabel: 'Horários',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Principal"
        component={Principal}
        options={{
          tabBarLabel: 'Finanças',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cash-register" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Clientes"
        component={Clientes}
        options={{
          tabBarLabel: 'Clientes',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
