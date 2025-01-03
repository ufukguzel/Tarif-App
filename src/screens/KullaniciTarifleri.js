import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Platform, Appbar, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Button, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const KullaniciTarifleri = ({ navigation }) => {
  const [tarifler, setTarifler] = useState([]);

  const tarifleriYukle = async () => {
    try {
      const tariflerJSON = await AsyncStorage.getItem('kullaniciTarifleri');
      if (tariflerJSON) {
        const parsedTarifler = JSON.parse(tariflerJSON);
        setTarifler(parsedTarifler);
      }
    } catch (error) {
      console.error('Tarifler yüklenirken hata:', error);
    }
  };

  useEffect(() => {
    tarifleriYukle();

    const unsubscribe = navigation.addListener('focus', () => {
      tarifleriYukle();
    });

    return () => unsubscribe();
  }, [navigation]);

  const tarifSil = async (tarifId) => {
    try {
      const yeniTarifler = tarifler.filter(tarif => tarif.id !== tarifId);
      await AsyncStorage.setItem('kullaniciTarifleri', JSON.stringify(yeniTarifler));
      setTarifler(yeniTarifler);
    } catch (error) {
      console.error('Tarif silinirken hata:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content 
          title="Tariflerim" 
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {tarifler && tarifler.length > 0 ? (
          tarifler.map((tarif) => (
            <Card key={tarif.id} style={styles.card}>
              <Card.Content>
                <Title>{tarif.tarifAdi}</Title>
                <Paragraph>Pişirme Süresi: {tarif.pisirmeSuresi} dk</Paragraph>
                <Paragraph>Kaç Kişilik: {tarif.kisiSayisi} kişilik</Paragraph>
                
                <Title style={styles.sectionTitle}>Malzemeler</Title>
                <Paragraph>{tarif.malzemeler}</Paragraph>
                
                <Title style={styles.sectionTitle}>Hazırlanış</Title>
                <Paragraph>{tarif.hazirlanis}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => tarifSil(tarif.id)} color="#FF6F00">
                  Tarifi Sil
                </Button>
              </Card.Actions>
            </Card>
          ))
        ) : (
          <Card style={styles.emptyCard}>
            <Card.Content>
              <Title style={styles.emptyText}>Henüz tarif eklenmemiş</Title>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
      
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('Yeni Tarif')}
        color="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  scrollContent: {
    padding: 10,
    paddingBottom: 80,
  },
  card: {
    marginBottom: 15,
    elevation: 4,
    backgroundColor: '#fff',
  },
  emptyCard: {
    margin: 16,
    backgroundColor: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    color: '#FF6F00',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF6F00',
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
});

export default KullaniciTarifleri; 