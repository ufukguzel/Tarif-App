import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Text, Surface } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const GirisEkrani = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');

  const girisYap = () => {
    // Giriş işlemleri burada yapılacak
    console.log('Giriş yapılıyor:', email);
  };

  return (
    <Surface style={styles.surface}>
      <Title style={styles.title}>Giriş Yap</Title>
      
      <TextInput
        label="E-posta"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        label="Şifre"
        value={sifre}
        onChangeText={setSifre}
        mode="outlined"
        style={styles.input}
        secureTextEntry
      />

      <Button
        mode="contained"
        onPress={girisYap}
        style={styles.button}
      >
        Giriş Yap
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate('KayitOl')}
        style={styles.linkButton}
      >
        Hesabınız yok mu? Kayıt olun
      </Button>
    </Surface>
  );
};

const KayitEkrani = ({ navigation }) => {
  const [ad, setAd] = useState('');
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');

  const kayitOl = () => {
    // Kayıt işlemleri burada yapılacak
    console.log('Kayıt yapılıyor:', email);
  };

  return (
    <Surface style={styles.surface}>
      <Title style={styles.title}>Kayıt Ol</Title>

      <TextInput
        label="Ad Soyad"
        value={ad}
        onChangeText={setAd}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="E-posta"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        label="Şifre"
        value={sifre}
        onChangeText={setSifre}
        mode="outlined"
        style={styles.input}
        secureTextEntry
      />

      <Button
        mode="contained"
        onPress={kayitOl}
        style={styles.button}
      >
        Kayıt Ol
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate('GirisYap')}
        style={styles.linkButton}
      >
        Zaten hesabınız var mı? Giriş yapın
      </Button>
    </Surface>
  );
};

const Kullanici = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GirisYap" component={GirisEkrani} options={{ headerShown: false }} />
      <Stack.Screen name="KayitOl" component={KayitEkrani} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  surface: {
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
    backgroundColor: '#FF6F00',
  },
  linkButton: {
    marginTop: 20,
  },
});

export default Kullanici; 