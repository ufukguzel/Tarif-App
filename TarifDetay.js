import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const TarifDetay = ({ route, navigation }) => {
  const { recipe } = route.params; // Ana ekrandan gelen tarif bilgisi

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text> {/* Numara + Tarifin Adı */}
      <Text style={styles.details}>{recipe.details}</Text> {/* Tarifin Detayları */}
      <Button title="Geri Dön" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default TarifDetay;
