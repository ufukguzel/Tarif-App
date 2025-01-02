import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';  // iPhone stiline uygun simgeler
import AnaSayfa from './Anasayfa';
import TarifeAsistani from './TarifeAsistani';
import TarifDetay from './TarifDetay';
import Favoriler from './favoriler';
import YeniTarif from './src/screens/YeniTarif';
import Kullanici from './src/screens/Kullanici';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (recipe) => {
    if (!favorites.some((item) => item.id === recipe.id)) {
      setFavorites([...favorites, recipe]);
    }
  };

  const TarifeAsistaniStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Tarife Asistanı">
        {(props) => <TarifeAsistani {...props} addFavorite={addFavorite} />}
      </Stack.Screen>
      <Stack.Screen name="Tarif Detay" component={TarifDetay} />
    </Stack.Navigator>
  );

  const FavorilerStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Favoriler">
        {(props) => <Favoriler {...props} favorites={favorites} />}
      </Stack.Screen>
      <Stack.Screen name="Tarif Detay" component={TarifDetay} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#FF6F00', height: 70 },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#ddd',
          tabBarLabelStyle: { fontSize: 12, marginBottom: 5 },
        }}
      >
        <Tab.Screen 
          name="Ana Sayfa" 
          component={AnaSayfa} 
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={30} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Tarif Ara" 
          component={TarifeAsistaniStack} 
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="search-outline" size={30} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Favoriler" 
          component={FavorilerStack} 
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="heart-outline" size={30} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Yeni Tarif" 
          component={YeniTarif} 
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="add-circle-outline" size={30} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Kullanıcı" 
          component={Kullanici} 
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-outline" size={30} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
