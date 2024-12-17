import React from 'react';
import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import Logo from '../../Assets/Logo.svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/stackNav/stack.routes'; // Ajuste o caminho conforme necessário

type HeaderNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function Header() {
  const navigation = useNavigation<HeaderNavigationProp>();

  return (
    <View className="w-full flex-row items-center h-56">
      {/* Botão Voltar */}
      <Pressable className="pl-6" onPress={() => navigation.goBack()}>
        <ChevronLeftIcon size={40} color={"#f97316"} strokeWidth={3} />
      </Pressable>

      {/* Logo Centralizada */}
      <View className="flex-1 flex items-center pr-12">
        <Logo />
      </View>
    </View>
  );
}


