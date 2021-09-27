
import React, { useState, Component } from 'react';
import Login from './src/screens/login';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Principal from './src/screens/principal';
import CadastroCliente from './src/screens/cadastroCliente';
import Atendimentos from './src/screens/atendimentos';
import Calendario from './src/screens/calendario';
import MyTabs from './src/screens/mytabs';
import Marcar from './src/screens/marcarAtendimento';
import Pendentes from './src/screens/pendentes';
import Pagos from './src/screens/pagos';
import CadastroUsuario from './src/screens/cadastroUsuario';


const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown:false
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen name="CadastroCliente" component={CadastroCliente} />
        <Stack.Screen name="Atendimentos" component={Atendimentos} />
        <Stack.Screen name="Calendario" component={Calendario} />
        <Stack.Screen name="MyTabs" component={MyTabs} />
        <Stack.Screen name="Marcar" component={Marcar} />
        <Stack.Screen name="Pendentes" component={Pendentes} />
        <Stack.Screen name="Pagos" component={Pagos} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
      </Stack.Navigator>
    );
  }


export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}
