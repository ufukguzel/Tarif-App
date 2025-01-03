import React from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Card, Title, Paragraph, List } from 'react-native-paper';

const { width } = Dimensions.get('window');

const TarifDetay = ({ route }) => {
  const { recipe } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: recipe.image }} style={styles.image} />
        <Card.Content>
          <Title style={styles.title}>{recipe.name}</Title>
          <Paragraph style={styles.details}>
            {recipe.duration} • {recipe.difficulty} • {recipe.serving}
          </Paragraph>

          <Title style={styles.sectionTitle}>Malzemeler</Title>
          {recipe.ingredients?.map((ingredient, index) => (
            <List.Item
              key={index}
              title={ingredient}
              left={props => <List.Icon {...props} icon="circle-small" />}
            />
          ))}

          <Title style={styles.sectionTitle}>Hazırlanışı</Title>
          {recipe.instructions?.map((instruction, index) => (
            <Paragraph key={index} style={styles.instruction}>
              {instruction}
            </Paragraph>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    borderRadius: 12,
    elevation: 4,
  },
  image: {
    height: width * 0.6,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    fontSize: width * 0.06,
    marginTop: 16,
    color: '#333',
  },
  details: {
    fontSize: width * 0.035,
    color: '#666',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: width * 0.045,
    marginTop: 24,
    marginBottom: 8,
    color: '#FF6F00',
  },
  instruction: {
    fontSize: width * 0.035,
    lineHeight: 24,
    marginBottom: 8,
  },
});

export default TarifDetay;
