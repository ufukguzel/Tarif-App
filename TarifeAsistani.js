import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const TarifeAsistani = ({ navigation }) => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipesFromCohere = async () => {
    if (!ingredients) {
      alert("Lütfen malzemelerinizi girin!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://api.cohere.ai/generate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer iPv8K39lodsfqoShALIU5H3mpYroz5WgSPD6UK83`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'command-xlarge-nightly',
          prompt: `Elimde şu malzemeler var: ${ingredients}. Bu malzemelerle yapabileceğim tariflerin numaralandırılmış isimlerini ve detaylarını ayrı ayrı listele. Örnek format: 1. Tarif Adı: Detaylar`,
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        console.error("API Hatası:", response.status, response.statusText);
        alert(`API Hatası: ${response.status} - ${response.statusText}`);
        return;
      }

      const data = await response.json();
      console.log("API Yanıtı:", data);

      if (data.text) {
        const aiResponse = data.text.trim();

        const recipeList = aiResponse
          .split('\n')
          .filter((line) => line.trim() !== "")
          .slice(0, 10) // İlk 10 tarifi al
          .map((line, index) => {
            const [name, details] = line.split(':', 2);
            return {
              id: index.toString(),
              name: name.trim(),
              details: details ? details.trim() : "Detay bulunamadı.",
            };
          });

        setRecipes(recipeList);
      } else {
        throw new Error("Yanıt metni bulunamadı.");
      }
    } catch (error) {
      console.error("Hata oluştu:", error);
      alert(`Hata: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarif Asistanı</Text>

      <TextInput
        style={styles.input}
        placeholder="Malzemeleri girin (örn: yumurta, süt)"
        value={ingredients}
        onChangeText={setIngredients}
      />

      <TouchableOpacity style={styles.button} onPress={fetchRecipesFromCohere}>
        <Text style={styles.buttonText}>Tarif Ara</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}

      <FlatList
        data={recipes}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    marginVertical: 20,
  },
  recipeCard: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default TarifeAsistani;
