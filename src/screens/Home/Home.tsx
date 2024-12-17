import React from 'react';
import { Text, View, Pressable, ImageBackground, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/stackNav/stack.routes';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  if (Platform.OS === 'android') {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ImageBackground
          source={require('../Home/Assets/background.jpg')}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        />

        <LinearGradient
          colors={['transparent', '#ffffff', '#fffffff7', 'white']}
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}
          className="h-3/5 w-full"
        >
          <View className="flex-1 justify-center items-center mt-20 gap-8">
            <View className="items-center">
              <View className="flex-row">
                <Text className="text-5xl font-bold text-black">Food </Text>
                <Text className="text-5xl font-extrabold text-orange-500">paradise</Text>
              </View>
              <Text className="text-5xl font-bold text-black">Awaits you!</Text>
            </View>

            <View className="items-center">
              <Text>Explore suas comidas favoritas e</Text>
              <Text>faça seu pedido de forma rápida e segura.</Text>
            </View>

            <Pressable
              className="bg-orange-500 rounded-3xl w-80 h-16 justify-center items-center"
              onPress={() => navigation.navigate('Register')}
            >
              <Text className="text-white text-lg font-bold">Registrar-se</Text>
            </Pressable>

            <View className="flex-row">
              <Text className="text-xl">Já tem uma conta? </Text>
              <Text className="text-orange-500 underline text-xl" onPress={() => navigation.navigate('Login')}>Entrar</Text>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  // Código específico para iOS com StatusBar
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ImageBackground
        source={require('../Home/Assets/background.jpg')}
        resizeMode="cover"
        style={{ width: '100%', height: '85%' }}
      />

      <LinearGradient
        colors={['#ffffff3b', '#ffffffdf', '#ffffff', '#ffffff', '#fffffff7', 'white']}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 70 }}
        className="h-3/5 w-full"
      >
        <View className="flex-1 justify-center items-center mt-20 gap-8">
          <View className="items-center mt-5">
            <View className="flex-row">
              <Text className="text-5xl font-bold text-black">Food </Text>
              <Text className="text-5xl font-extrabold text-orange-500">paradise</Text>
            </View>
            <Text className="text-5xl font-bold text-black">Awaits you!</Text>
          </View>

          <View className="items-center">
            <Text>Explore suas comidas favoritas e</Text>
            <Text>faça seu pedido de forma rápida e segura.</Text>
          </View>

          <Pressable
            className="bg-orange-500 rounded-3xl w-80 h-16 justify-center items-center"
            onPress={() => navigation.navigate('Register')}
          >
            <Text className="text-white text-lg font-bold">Registrar-se</Text>
          </Pressable>

          <View className="flex-row">
            <Text className="text-xl">Já tem uma conta? </Text>
            <Text className="text-orange-500 underline text-xl" onPress={() => navigation.navigate('Login')}>Entrar</Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
