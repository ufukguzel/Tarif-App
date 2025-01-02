import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const Favoriler = ({ favorites, navigation }) => {  // props'dan favorites alıyoruz

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoriler</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyMessage}>Henüz favorilere eklenmiş bir tarif yok.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recipeCard}
              onPress={() => navigation.navigate('Tarif Detay', { recipe: item })}
            >
              <Text style={styles.recipeName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF8E1',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FF6F00',
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginTop: 20,
  },
  recipeCard: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#FFD180',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Favoriler;
