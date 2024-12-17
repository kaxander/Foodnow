// VideoTest.tsx
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

const { width, height } = Dimensions.get('window');

export default function VideoTest() {
  return (
    <View style={styles.container}>
      <Video
        source={require('./splashscreen.mp4')} // Verifique se o caminho está correto
        resizeMode={ResizeMode.COVER} // Tente COVER para preencher a tela
        shouldPlay
        isLooping={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Altere para preto para ver se ajuda
  },
});
