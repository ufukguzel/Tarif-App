import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const YeniTarif = () => {
  const [tarifAdi, setTarifAdi] = useState('');
  const [malzemeler, setMalzemeler] = useState('');
  const [hazirlanis, setHazirlanis] = useState('');
  const [pisirmeSuresi, setPisirmeSuresi] = useState('');
  const [kisiSayisi, setKisiSayisi] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const tarifKaydet = async () => {
    if (!tarifAdi || !malzemeler || !hazirlanis) {
      setSnackbarMessage('Lütfen gerekli alanları doldurun!');
      setSnackbarVisible(true);
      return;
    }

    try {
      const yeniTarif = {
        id: Date.now().toString(),
        tarifAdi,
        malzemeler,
        hazirlanis,
        pisirmeSuresi,
        kisiSayisi,
        eklemeTarihi: new Date().toISOString(),
      };

      // Mevcut tarifleri al
      const mevcutTariflerJSON = await AsyncStorage.getItem('kullaniciTarifleri');
      const mevcutTarifler = mevcutTariflerJSON ? JSON.parse(mevcutTariflerJSON) : [];

      // Yeni tarifi ekle
      const yeniTarifler = [...mevcutTarifler, yeniTarif];
      await AsyncStorage.setItem('kullaniciTarifleri', JSON.stringify(yeniTarifler));

      // Formu temizle
      setTarifAdi('');
      setMalzemeler('');
      setHazirlanis('');
      setPisirmeSuresi('');
      setKisiSayisi('');

      setSnackbarMessage('Tarif başarıyla kaydedildi!');
      setSnackbarVisible(true);
    } catch (error) {
      setSnackbarMessage('Tarif kaydedilirken bir hata oluştu!');
      setSnackbarVisible(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Yeni Tarif Ekle</Title>

      <TextInput
        label="Tarif Adı"
        value={tarifAdi}
        onChangeText={setTarifAdi}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Malzemeler"
        value={malzemeler}
        onChangeText={setMalzemeler}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.input}
      />

      <TextInput
        label="Hazırlanış"
        value={hazirlanis}
        onChangeText={setHazirlanis}
        mode="outlined"
        multiline
        numberOfLines={6}
        style={styles.input}
      />

      <TextInput
        label="Pişirme Süresi (dk)"
        value={pisirmeSuresi}
        onChangeText={setPisirmeSuresi}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        label="Kaç Kişilik"
        value={kisiSayisi}
        onChangeText={setKisiSayisi}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={tarifKaydet}
        style={styles.button}
      >
        Tarifi Kaydet
      </Button>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'Tamam',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF8E1',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#FF6F00',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#FF6F00',
  },
});

export default YeniTarif; 