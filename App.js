import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TarifeAsistani from './TarifeAsistani';
import TarifDetay from './TarifDetay';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tarifler" component={TarifeAsistani} />
        <Stack.Screen name="Tarif Detay" component={TarifDetay} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}