import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Platform, Dimensions } from 'react-native';
import { TextInput, Button, Title, Snackbar, Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const YeniTarif = ({ navigation }) => {
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
        pisirmeSuresi: pisirmeSuresi || '0',
        kisiSayisi: kisiSayisi || '1',
        eklemeTarihi: new Date().toISOString(),
      };

      const mevcutTariflerJSON = await AsyncStorage.getItem('kullaniciTarifleri');
      const mevcutTarifler = mevcutTariflerJSON ? JSON.parse(mevcutTariflerJSON) : [];
      const yeniTarifler = [...mevcutTarifler, yeniTarif];
      
      await AsyncStorage.setItem('kullaniciTarifleri', JSON.stringify(yeniTarifler));

      setSnackbarMessage('Tarif başarıyla kaydedildi!');
      setSnackbarVisible(true);

      // Formu temizle
      setTarifAdi('');
      setMalzemeler('');
      setHazirlanis('');
      setPisirmeSuresi('');
      setKisiSayisi('');

      // 2 saniye sonra önceki sayfaya dön
      setTimeout(() => {
        navigation.goBack();
      }, 2000);

    } catch (error) {
      console.error('Tarif kaydedilirken hata:', error);
      setSnackbarMessage('Tarif kaydedilirken bir hata oluştu!');
      setSnackbarVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#fff" />
        <Appbar.Content 
          title="Yeni Tarif" 
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent}>
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
          label="Pişirme Süresi (dakika)"
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
      </ScrollView>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    backgroundColor: '#FF6F00',
    elevation: 4,
    height: Platform.OS === 'ios' ? height * 0.07 : height * 0.06,
  },
  headerTitle: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: '600',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#FF6F00',
    paddingVertical: 8,
  },
});

export default YeniTarif; 