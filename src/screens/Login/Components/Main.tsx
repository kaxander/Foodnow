import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/stackNav/stack.routes';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "react-native-heroicons/solid";

type HeaderNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function Login() {
  const navigation = useNavigation<HeaderNavigationProp>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Estado para controlar a visibilidade da senha
  const [animationValue] = useState(new Animated.Value(0)); // Valor de animação

  const handleLogin = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      })
    );
  };

  const togglePasswordVisibility = () => {
    const toValue = isPasswordVisible ? 0 : 1;

    // Animação para o ícone de olho
    Animated.timing(animationValue, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsPasswordVisible(!isPasswordVisible);
  };

  // Interpolação de rotação para a animação
  const rotation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'], // Gira o ícone quando alterna entre aberto/fechado
  });

  return (
    <View className="flex-1 gap-10 items-center">
      <Text className="text-5xl font-extrabold text-orange-500 mt-6">Login</Text>

      <View className="gap-10">
        <View className="flex-row items-center w-[320px] h-16 border-2 border-orange-500 rounded-2xl px-4">
          <EnvelopeIcon size={24} color="#f97316"/>
          <TextInput
            className="flex-1 ms-4"
            placeholder="Digite seu e-mail..."
            placeholderTextColor="#f97316"
          />
        </View>

        <View className="flex-row items-center w-[320px] h-16 border-2 border-orange-500 rounded-2xl px-4">
          <LockClosedIcon size={24} color="#f97316" />
          <TextInput
            className="flex-1 ms-4"
            placeholder="Digite sua senha...."
            placeholderTextColor="#f97316"
            secureTextEntry={!isPasswordVisible} // Alterna a visibilidade da senha
          />
          
          {/* Ícone de olho com animação */}
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
              {isPasswordVisible ? (
                <EyeIcon size={24} color="#f97316" />
              ) : (
                <EyeSlashIcon size={24} color="#f97316" />
              )}
            </Animated.View>
          </TouchableOpacity>
        </View>

        <Pressable
          className="w-[320px] h-16 bg-orange-500 rounded-3xl items-center justify-center mt-4"
          onPress={handleLogin}
        >
          <Text className="text-white text-lg font-bold">Logar</Text>
        </Pressable>

        <Pressable className="w-[320px] h-16 border-2 border-orange-500 rounded-3xl flex-row items-center">
          <Ionicons
            color={'#f97316'}
            name="logo-google"
            size={32}
            className="ml-4" 
          />
          <Text className="text-orange-500 text-lg font-bold text-center flex-1 mr-10">
            Login com Google
          </Text>
        </Pressable>
      </View>

      <View className='flex-row mt-6'>
        <Text className='text-xl'>Não tem uma conta? </Text>
        <Text className='text-orange-500 underline text-xl' onPress={() => navigation.navigate('Register')}>
          Registrar-se
        </Text>
      </View>
    </View>
  );
}
