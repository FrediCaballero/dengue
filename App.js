import React from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen'; // Importa tu pantalla principal
import CameraScreen from './screens/CameraScreen'; // Importa la pantalla de la cámara

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Inicio"
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: '#2E4053', 
            },
            headerTintColor: '#a6b092', 
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen 
          name="Camera" 
          component={CameraScreen}
          options={{
            headerStyle: {
              backgroundColor: '#2E4053',
            },
            headerTintColor: '#a6b092',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
