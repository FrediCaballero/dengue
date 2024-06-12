import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation desde react-navigation

import ButtonComponent from '../components/ButtonComponent';
import ImageComponent from '../components/ImageComponent';

const HomeScreen = () => {
  const navigation = useNavigation(); // Obtiene el objeto de navegación

  return (
    <SafeAreaView style={styles.container}>
      <ImageComponent />
      <Text style={styles.paragraph}>
        Esta aplicación debe ser utilizada con responsabilidad y en beneficio de la salud pública.
      </Text>
      <View style={styles.buttonContainer}>
        <ButtonComponent title="Prueba Rápida NS1" color="#2E4053" onPress={() => navigation.navigate('Camera')} />
        <ButtonComponent title="Prueba Rápida IgG/IgM" color="#0E6251" />
        <ButtonComponent title="Prueba Rápida Completa" color="#2E4053" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#17202A',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#a6b092",
  },
  buttonContainer: {
    width: 300,
    alignItems: 'stretch',
  },
});

export default HomeScreen;
