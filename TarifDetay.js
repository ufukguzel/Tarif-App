import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TarifDetay = ({ route, navigation }) => {
  const { recipe } = route.params; // Ana ekrandan gelen tarif bilgisi

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recipe.name || "Tarif Adı Bulunamadı"}</Text> {/* Tarifin Adı */}
      <Text style={styles.details}>Malzemeler: {recipe.ingredients || "Malzemeler belirtilmemiş."}</Text> {/* Malzemeler */}
      <Text style={styles.details}>Hazırlanış: {recipe.details || "Hazırlanış belirtilmemiş."}</Text> {/* Tarifin Detayları */}

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Geri Dön</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF8E1', // Uygulamanın genel arka plan rengiyle uyumlu
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FF6F00', // Turuncu renk
  },
  details: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333', // Detaylar için koyu renk
  },
  button: {
    backgroundColor: '#FF6F00', // Turuncu buton rengi
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TarifDetay;
