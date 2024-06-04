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
        <ButtonComponent title="Reconocimiento de Test" color="#C64756" onPress={() => navigation.navigate('Camera')} />
        <ButtonComponent title="Ingreso de Datos" color="#184D47" />
        <ButtonComponent title="Ambos" color="#FAD586" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#badba2',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    width: 300,
    alignItems: 'stretch',
  },
});

export default HomeScreen;
