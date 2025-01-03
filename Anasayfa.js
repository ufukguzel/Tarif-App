import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image, Platform } from 'react-native';
import { Text, Card, Title, Surface, Appbar } from 'react-native-paper';
import { Ionicons } from 'react-native-vector-icons';

const { width, height } = Dimensions.get('window');

const AnaSayfa = ({ navigation }) => {
  const [bannerImageUrl, setBannerImageUrl] = useState('https://i.pinimg.com/originals/11/12/52/11125299c208c0b413a2efa5fdcd79e4.gif');
  const [screenDimensions, setScreenDimensions] = useState({ width, height });

  // Ekran boyutu değişikliklerini dinle
  useEffect(() => {
    const updateLayout = () => {
      setScreenDimensions({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
      });
    };

    Dimensions.addEventListener('change', updateLayout);
    return () => {
      // Cleanup
      if (Platform.OS !== 'web') {
        // React Native'de farklı cleanup gerekiyor
        Dimensions.removeEventListener('change', updateLayout);
      }
    };
  }, []);

  const categories = [
    { id: 1, title: 'Kahvaltılıklar', icon: 'cafe-outline', color: '#FF6B6B' },
    { id: 2, title: 'Ana Yemekler', icon: 'restaurant-outline', color: '#4ECDC4' },
    { id: 3, title: 'Hızlı Tarifler', icon: 'timer-outline', color: '#45B7D1' },
    { id: 4, title: 'Tatlılar', icon: 'ice-cream-outline', color: '#96CEB4' },
    { id: 5, title: 'Dünya Mutfağı', icon: 'globe-outline', color: '#FFEEAD' },
    { id: 6, title: 'Diyet Tarifler', icon: 'leaf-outline', color: '#D4A5A5' },
  ];

  const popularRecipes = [
    {
      id: 1,
      name: 'Ev Yapımı Pizza',
      duration: '30 dakika',
      difficulty: 'Kolay',
      serving: '4 Kişilik',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
      category: 'Ana Yemekler'
    },
    {
      id: 2,
      name: 'Mercimek Çorbası',
      duration: '40 dakika',
      difficulty: 'Kolay',
      serving: '6 Kişilik',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
      category: 'Çorbalar'
    },
    {
      id: 3,
      name: 'Brownie',
      duration: '45 dakika',
      difficulty: 'Orta',
      serving: '8 Kişilik',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c',
      category: 'Tatlılar'
    },
    {
      id: 4,
      name: 'Karnıyarık',
      duration: '60 dakika',
      difficulty: 'Orta',
      serving: '4 Kişilik',
      image: 'https://images.unsplash.com/photo-1625944525903-a500f9e85a83',
      category: 'Ana Yemekler'
    }
  ];

  const cookingTips = [
    "Pişirme sırasında et ve tavukları çevirmek için çatal yerine maşa kullanın. Böylece etin suyu dışarı akmaz.",
    "Pirinç pilavını daha lezzetli yapmak için pirinçleri önceden hafifçe kavurun.",
    "Sebzelerin renginin canlı kalması için haşlarken bir tutam karbonat ekleyin.",
    "Keklerin daha kabarmış olması için fırını önceden ısıtın.",
    "Patates kızartmasının çıtır olması için patatesleri önce soğuk suda bekletin.",
    "Köftelerin dağılmaması için harcı en az yarım saat dinlendirin.",
    "Makarna suyuna tuz eklemeyi unutmayın, bu lezzeti artırır.",
    "Soğan doğrarken gözlerinizin yanmaması için bıçağı ıslatın."
  ];

  const dietitianAdvices = [
    "Günde en az 2 litre su içmeyi ihmal etmeyin.",
    "Öğün atlamayın, özellikle kahvaltı çok önemli!",
    "Akşam yemeğini yatmadan en az 3 saat önce yiyin.",
    "Haftada en az 2 kez balık tüketin.",
    "Mevsiminde sebze ve meyve tüketmeye özen gösterin.",
    "Protein ağırlıklı kahvaltı metabolizmanızı hızlandırır.",
    "Yemekleri yavaş yiyin ve iyice çiğneyin.",
    "Her gün 1 avuç kuru yemiş tüketin."
  ];

  const [currentTip, setCurrentTip] = useState(0);
  const [currentAdvice, setCurrentAdvice] = useState(0);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % cookingTips.length);
    }, 5000);

    const adviceInterval = setInterval(() => {
      setCurrentAdvice((prev) => (prev + 1) % dietitianAdvices.length);
    }, 4000);

    return () => {
      clearInterval(tipInterval);
      clearInterval(adviceInterval);
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Ionicons 
              name="restaurant" 
              size={width * 0.045} 
              color="#fff" 
              style={styles.headerIcon} 
            />
            <Text style={styles.headerTitle}>Tarif Asistanı</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => {/* Bildirimler için */}}
            >
              <Ionicons 
                name="notifications-outline" 
                size={width * 0.06} 
                color="#fff" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </Appbar.Header>

      <ScrollView>
        {/* Banner Bölümü */}
        <Surface style={[styles.bannerContainer, { 
          height: screenDimensions.height * (Platform.OS === 'ios' ? 0.25 : 0.23),
          marginTop: 16
        }]}>
          <Image
            source={{ uri: bannerImageUrl }}
            style={styles.bannerImage}
            resizeMode="cover"
            onError={() => {
              setBannerImageUrl('https://media.giphy.com/media/ry24WYgvxHqes/giphy.gif');
            }}
          />
          <View style={[styles.bannerOverlay, {
            paddingTop: Platform.OS === 'ios' ? 30 : 0
          }]}>
            <Text style={[styles.bannerText, {
              fontSize: screenDimensions.width * 0.055
            }]}>Lezzetli Tarifler Keşfedin</Text>
          </View>
        </Surface>

        {/* Popüler Kategoriler */}
        <Title style={styles.sectionTitle}>Popüler Kategoriler</Title>
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: category.color }]}
              onPress={() => navigation.navigate('Tarif Detay', { 
                category: category.title,
                recipes: popularRecipes.filter(recipe => 
                  (category.id === 1 && recipe.name.includes('Kahvaltı')) ||
                  (category.id === 2 && recipe.name.includes('Köfte')) ||
                  (category.id === 3 && recipe.duration.includes('25')) ||
                  (category.id === 4 && recipe.name.includes('Tatlı')) ||
                  (category.id === 5 && recipe.name.includes('Dünya')) ||
                  (category.id === 6 && recipe.name.includes('Diyet'))
                )
              })}
            >
              <Ionicons name={category.icon} size={32} color="#fff" />
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popüler Tarifler */}
        <Title style={styles.sectionTitle}>Popüler Tarifler</Title>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularRecipes.map((recipe) => (
            <TouchableOpacity
              key={recipe.id}
              onPress={() => navigation.navigate('Tarif Detay', { recipe })}
            >
              <Card style={styles.recipeCard}>
                <Card.Cover 
                  source={{ uri: recipe.image }} 
                  style={styles.recipeImage}
                />
                <Card.Content>
                  <Title style={styles.recipeTitle}>{recipe.name}</Title>
                  <Text style={styles.recipeDetails}>
                    {recipe.duration} • {recipe.difficulty} • {recipe.serving}
                  </Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Günün İpucu */}
        <Title style={styles.sectionTitle}>Günün Mutfak İpucu</Title>
        <Card style={styles.tipCard}>
          <Card.Content>
            <View style={styles.tipHeader}>
              <Ionicons name="bulb-outline" size={24} color="#FF6F00" style={styles.tipIcon} />
              <Title style={styles.tipTitle}>Günün Mutfak İpucu</Title>
            </View>
            <Text style={styles.tipText}>{cookingTips[currentTip]}</Text>
          </Card.Content>
        </Card>

        <Card style={styles.adviceCard}>
          <Card.Content>
            <View style={styles.tipHeader}>
              <Ionicons name="medical-outline" size={24} color="#4CAF50" style={styles.tipIcon} />
              <Title style={styles.adviceTitle}>Diyetisyen Tavsiyeleri</Title>
            </View>
            <Text style={styles.adviceText}>{dietitianAdvices[currentAdvice]}</Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#FF6F00',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: Platform.OS === 'ios' ? height * 0.07 : height * 0.06,
    justifyContent: 'flex-end',
    paddingBottom: height * 0.008,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.03,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: width * 0.015,
    fontSize: width * 0.045,
  },
  headerTitle: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  headerButton: {
    padding: width * 0.015,
  },
  bannerContainer: {
    marginHorizontal: width * 0.04,
    marginBottom: width * 0.04,
    borderRadius: Math.round(width * 0.03),
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    color: '#fff',
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    paddingHorizontal: width * 0.05,
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
    color: '#333',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 48) / 2,
    padding: width * 0.04,
    margin: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  categoryTitle: {
    color: '#fff',
    marginTop: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: width * 0.035,
  },
  recipeCard: {
    width: width * 0.7,
    margin: 8,
    marginLeft: 16,
    borderRadius: 12,
    elevation: 4,
  },
  recipeImage: {
    height: height * 0.2,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  recipeTitle: {
    fontSize: width * 0.04,
    marginBottom: 4,
  },
  recipeDetails: {
    color: '#666',
    fontSize: width * 0.03,
  },
  tipCard: {
    margin: 16,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: '#FFF8E1',
  },
  tipIcon: {
    marginBottom: 8,
  },
  tipText: {
    fontSize: width * 0.035,
    lineHeight: 20,
    color: '#333',
  },
  adviceCard: {
    margin: 16,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: '#E8F5E9',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: width * 0.045,
    color: '#FF6F00',
    marginLeft: 8,
  },
  adviceTitle: {
    fontSize: width * 0.045,
    color: '#4CAF50',
    marginLeft: 8,
  },
  adviceText: {
    fontSize: width * 0.035,
    lineHeight: 20,
    color: '#333',
    fontStyle: 'italic',
  }
});

export default AnaSayfa;
