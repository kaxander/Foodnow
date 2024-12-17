// Splash.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';

const { width, height } = Dimensions.get('window');

export default function Splash({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    async function prepareApp() {
      await SplashScreen.preventAutoHideAsync(); // Impede que a splash screen desapareça automaticamente
    }
    prepareApp();
  }, []);

  const handlePlaybackStatusUpdate = async (status: any) => {
    if (status.isLoaded && status.didJustFinish) {
      console.log("Vídeo terminou, chamando onReady");
      await SplashScreen.hideAsync(); // Esconde a Splash Screen
      onReady(); // Chama a função quando o vídeo termina
    }
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('./splashscreen.mp4')} // Verifique se o caminho está correto
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        isLooping={false}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate} // Usa a função de status de reprodução
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Fundo branco para verificar se o vídeo está oculto
  },
  video: {
    width: width,
    height: height,
  },
});
