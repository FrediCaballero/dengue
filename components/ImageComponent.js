import React from 'react';
import { Image, StyleSheet } from 'react-native';

const ImageComponent = () => {
  return (
    <Image
      style={styles.image}
      source={require('../assets/dengue.png')}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});

export default ImageComponent;
