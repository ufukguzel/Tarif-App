import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Platform } from 'react-native';
import { TextInput, Button, Title, Text, Card, Surface, SegmentedButtons, Appbar } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const KaloriHesaplama = ({ navigation }) => {
  const [cinsiyet, setCinsiyet] = useState('');
  const [yas, setYas] = useState('');
  const [boy, setBoy] = useState('');
  const [kilo, setKilo] = useState('');
  const [aktiviteSeviyesi, setAktiviteSeviyesi] = useState('');
  const [sonuc, setSonuc] = useState(null);

  const aktiviteKatsayilari = {
    'Az Hareketli': 1.2,
    'Orta Hareketli': 1.55,
    'Çok Hareketli': 1.725,
    'Sporcu': 1.9
  };

  const kaloriHesapla = () => {
    if (!cinsiyet || !yas || !boy || !kilo || !aktiviteSeviyesi) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }

    let bmr;
    // Harris-Benedict denklemi
    if (cinsiyet === 'Erkek') {
      bmr = 88.362 + (13.397 * parseFloat(kilo)) + (4.799 * parseFloat(boy)) - (5.677 * parseFloat(yas));
    } else {
      bmr = 447.593 + (9.247 * parseFloat(kilo)) + (3.098 * parseFloat(boy)) - (4.330 * parseFloat(yas));
    }

    const gunlukKalori = Math.round(bmr * aktiviteKatsayilari[aktiviteSeviyesi]);
    const beslenmeProgram = beslenmeOnerisiOlustur(gunlukKalori);
    
    setSonuc({
      gunlukKalori,
      beslenmeProgram
    });
  };

  const beslenmeOnerisiOlustur = (gunlukKalori) => {
    return {
      kahvalti: {
        kalori: Math.round(gunlukKalori * 0.3),
        oneriler: [
          'Yulaf ezmesi (40g)',
          'Süt veya yoğurt (200ml)',
          'Muz (1 adet)',
          'Badem (10 adet)',
        ]
      },
      ogleYemegi: {
        kalori: Math.round(gunlukKalori * 0.35),
        oneriler: [
          'Izgara tavuk/balık (150g)',
          'Bulgur pilavı (1 porsiyon)',
          'Mevsim salatası',
          'Zeytinyağı (1 tatlı kaşığı)',
        ]
      },
      aksamYemegi: {
        kalori: Math.round(gunlukKalori * 0.25),
        oneriler: [
          'Mercimek çorbası',
          'Sebze yemeği (1 porsiyon)',
          'Tam tahıllı ekmek (1 dilim)',
        ]
      },
      araOgunler: {
        kalori: Math.round(gunlukKalori * 0.1),
        oneriler: [
          'Meyve (2 porsiyon)',
          'Ceviz/fındık (30g)',
          'Yoğurt (1 kase)',
        ]
      }
    };
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content 
          title="Kalori Hesaplama" 
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>
      
      <ScrollView style={styles.container}>
        <Surface style={styles.surface}>
          <Title style={styles.title}>Kalori Hesaplama</Title>

          <SegmentedButtons
            value={cinsiyet}
            onValueChange={setCinsiyet}
            buttons={[
              { value: 'Erkek', label: 'Erkek' },
              { value: 'Kadın', label: 'Kadın' },
            ]}
            style={styles.segmentedButton}
          />

          <TextInput
            label="Yaş"
            value={yas}
            onChangeText={setYas}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Boy (cm)"
            value={boy}
            onChangeText={setBoy}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Kilo (kg)"
            value={kilo}
            onChangeText={setKilo}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />

          <SegmentedButtons
            value={aktiviteSeviyesi}
            onValueChange={setAktiviteSeviyesi}
            buttons={[
              { value: 'Az Hareketli', label: 'Az' },
              { value: 'Orta Hareketli', label: 'Orta' },
              { value: 'Çok Hareketli', label: 'Çok' },
              { value: 'Sporcu', label: 'Sporcu' },
            ]}
            style={styles.segmentedButton}
          />

          <Button
            mode="contained"
            onPress={kaloriHesapla}
            style={styles.button}
          >
            Hesapla
          </Button>

          {sonuc && (
            <View style={styles.sonucContainer}>
              <Card style={styles.sonucCard}>
                <Card.Content>
                  <Title style={styles.sonucTitle}>
                    Günlük Kalori İhtiyacı: {sonuc.gunlukKalori} kcal
                  </Title>
                  
                  {Object.entries(sonuc.beslenmeProgram).map(([ogun, data]) => (
                    <View key={ogun} style={styles.ogunContainer}>
                      <Title style={styles.ogunTitle}>
                        {ogun.charAt(0).toUpperCase() + ogun.slice(1)} ({data.kalori} kcal)
                      </Title>
                      {data.oneriler.map((oneri, index) => (
                        <Text key={index} style={styles.oneriText}>• {oneri}</Text>
                      ))}
                    </View>
                  ))}
                </Card.Content>
              </Card>
            </View>
          )}
        </Surface>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  surface: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 4,
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
  segmentedButton: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#FF6F00',
  },
  sonucContainer: {
    marginTop: 20,
  },
  sonucCard: {
    backgroundColor: '#FFF8E1',
  },
  sonucTitle: {
    fontSize: width * 0.045,
    color: '#FF6F00',
    marginBottom: 15,
  },
  ogunContainer: {
    marginBottom: 15,
  },
  ogunTitle: {
    fontSize: width * 0.04,
    color: '#333',
    marginBottom: 5,
  },
  oneriText: {
    fontSize: width * 0.035,
    marginLeft: 10,
    marginBottom: 3,
    color: '#666',
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

export default KaloriHesaplama; 