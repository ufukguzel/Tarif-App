import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AnaSayfa = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ana Sayfa</Text>
      <Text style={styles.subtitle}>Tarif Asistanı'na Hoş Geldiniz!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Tarif Ara')}>
        <Text style={styles.buttonText}>Tarif Ara</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Favoriler')}>
        <Text style={styles.buttonText}>Favoriler</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => alert('Yeni Tarif Oluştur')}>
        <Text style={styles.buttonText}>Yeni Tarif Oluştur</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => alert('Yardım Sayfası')}>
        <Text style={styles.buttonText}>Yardım</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => alert('Çıkış Yap')}>
        <Text style={styles.buttonText}>Çıkış</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6F00',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF6F00',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    width: '80%',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AnaSayfa;
