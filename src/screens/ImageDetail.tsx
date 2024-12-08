import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';

const ImageDetail = ({ route }) => {
  const { image } = route.params;

  const imageUrl = image.links && image.links[0] && image.links[0].href;
  const title = image.data && image.data[0] && image.data[0].title;
  const description = image.data && image.data[0] && image.data[0].description;
  const criacao = image.data && image.data[0] && image.data[0].date_created;

  const { width, height } = Dimensions.get('window');
  const isPortrait = height > width;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: imageUrl }} style={isPortrait ? styles.imagePortrait : styles.imageLandscape} />
      <Text style={styles.subtitle}>Criação: {criacao}</Text>
      <Text style={styles.description}>{description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  imagePortrait: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  imageLandscape: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default ImageDetail;
