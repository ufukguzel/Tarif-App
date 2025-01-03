import React, { useState } from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import { Appbar, Text, Avatar, List, Button, TextInput, Portal, Dialog } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const Kullanici = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogin = () => {
    // Giriş işlemleri burada yapılacak
    setIsLoggedIn(true);
    setShowLoginDialog(false);
    setEmail('');
    setPassword('');
  };

  const handleRegister = () => {
    // Kayıt işlemleri burada yapılacak
    setIsLoggedIn(true);
    setShowRegisterDialog(false);
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const LoginDialog = () => (
    <Portal>
      <Dialog visible={showLoginDialog} onDismiss={() => setShowLoginDialog(false)}>
        <Dialog.Title>Giriş Yap</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="E-posta"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Şifre"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setShowLoginDialog(false)}>İptal</Button>
          <Button onPress={handleLogin}>Giriş Yap</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );

  const RegisterDialog = () => (
    <Portal>
      <Dialog visible={showRegisterDialog} onDismiss={() => setShowRegisterDialog(false)}>
        <Dialog.Title>Kayıt Ol</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Ad Soyad"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="E-posta"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Şifre"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setShowRegisterDialog(false)}>İptal</Button>
          <Button onPress={handleRegister}>Kayıt Ol</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );

  const SettingsDialog = () => (
    <Portal>
      <Dialog visible={showSettingsDialog} onDismiss={() => setShowSettingsDialog(false)}>
        <Dialog.Title>Ayarlar</Dialog.Title>
        <Dialog.Content>
          <List.Item
            title="Bildirimler"
            description="Bildirim ayarlarını düzenle"
            left={props => <List.Icon {...props} icon="bell-outline" />}
          />
          <List.Item
            title="Tema"
            description="Uygulama temasını değiştir"
            left={props => <List.Icon {...props} icon="palette-outline" />}
          />
          <List.Item
            title="Dil"
            description="Uygulama dilini değiştir"
            left={props => <List.Icon {...props} icon="translate" />}
          />
          <List.Item
            title="Hesap Ayarları"
            description="Hesap bilgilerini düzenle"
            left={props => <List.Icon {...props} icon="account-cog-outline" />}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setShowSettingsDialog(false)}>Kapat</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content 
          title="Profil" 
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      {isLoggedIn ? (
        <>
          <View style={styles.profileSection}>
            <Avatar.Icon 
              size={80} 
              icon="account"
              style={styles.avatar}
              color="#fff"
            />
            <Text style={styles.userName}>{name || 'Kullanıcı Adı'}</Text>
          </View>

          <List.Section>
            <List.Item
              title="Tariflerim"
              left={props => <List.Icon {...props} icon="book-outline" />}
              onPress={() => navigation.navigate('Tariflerim')}
            />
            <List.Item
              title="Favorilerim"
              left={props => <List.Icon {...props} icon="heart-outline" />}
              onPress={() => navigation.navigate('Favoriler')}
            />
            <List.Item
              title="Ayarlar"
              left={props => <List.Icon {...props} icon="cog-outline" />}
              onPress={() => setShowSettingsDialog(true)}
            />
            <List.Item
              title="Çıkış Yap"
              left={props => <List.Icon {...props} icon="logout" />}
              onPress={handleLogout}
            />
          </List.Section>
        </>
      ) : (
        <View style={styles.authContainer}>
          <Button 
            mode="contained" 
            style={styles.authButton}
            onPress={() => setShowLoginDialog(true)}
          >
            Giriş Yap
          </Button>
          <Button 
            mode="outlined" 
            style={styles.authButton}
            onPress={() => setShowRegisterDialog(true)}
          >
            Kayıt Ol
          </Button>
        </View>
      )}

      <LoginDialog />
      <RegisterDialog />
      <SettingsDialog />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  header: {
    backgroundColor: '#FF6F00',
    elevation: 4,
    height: Platform.OS === 'ios' ? height * 0.07 : height * 0.06,
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: '600',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    backgroundColor: '#FF6F00',
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  authButton: {
    marginVertical: 10,
    backgroundColor: '#FF6F00',
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});

export default Kullanici; 