import React, { useState, useRef, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, Pressable, Animated, Image, TextInput, Platform, StatusBar } from "react-native";
import { ArrowLeftStartOnRectangleIcon, HeartIcon, ArrowPathIcon, ArrowUpTrayIcon, MapIcon } from "react-native-heroicons/solid";

export default function Header() {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current; // Inicialmente fora da tela, na direita

  useEffect(() => {
    if (modalVisible) {
      // Ocultar a StatusBar no iPhone
      if (Platform.OS === 'ios') {
        StatusBar.setHidden(true, 'slide');
      }
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Exibir a StatusBar no iPhone
      if (Platform.OS === 'ios') {
        StatusBar.setHidden(false, 'slide');
      }
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  return (
    <View className="w-full h-[115px] flex-row items-end px-8">
      <View className="w-full flex-row items-center justify-between">
        <View className="flex-row">
          <Text className="font-bold text-2xl items-center">Bem vindo </Text>
          <Text className="text-orange-500 text-2xl">Gabriel</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
          source={require('./Assets/sla.jpg')}
          className="w-[45px] h-[45px] rounded-full"
          />
        </TouchableOpacity>
      </View>


      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="fade" // Disable default animation
      >
        <Pressable className="flex-1 bg-[#0000007f]" onPress={() => setModalVisible(false)}>
          <Animated.View className='absolute right-0 top-0 bottom-0 w-4/5 bg-white p-6 py-10' style={[ { transform: [{ translateX: slideAnim }] }]}>
            <View className="flex-1 gap-6" style={{ marginTop: Platform.OS === 'ios' ? 20 : 0 }}>
              <View className="flex-row items-center justify-between mb-8">
                <View className="flex-row items-center gap-3">
                  <Image
                  source={require('./Assets/sla.jpg')}
                  className="w-[40px] h-[40px] rounded-full"
                  />
                  <View>
                    <Text className="text-lg font-normal">Gabriel Alexandre</Text>
                    <Text className="text-sm font-light">+55 (11) 99999-9999</Text>
                    <Text className="text-sm font-light">DnO0z@example.com</Text>
                  </View>
                </View>

                <Pressable className="p-3 h-10 bg-red-600 rounded-xl items-center justify-center">
                  <ArrowLeftStartOnRectangleIcon color="white" size={17} />
                </Pressable>
              </View>
              <View className="flex-row justify-between">
                <TextInput
                className="w-4/5 border-2 border-orange-400 rounded-xl p-2 px-5"
                placeholder="Alterar meu nome"
                placeholderTextColor={'#fb923c'}
                />
                <Pressable className="p-3.5 bg-orange-500 rounded-xl items-center justify-center">
                  <ArrowPathIcon color="white" size={20} />
                </Pressable>
              </View>
              <View className="flex-row justify-between">
                <TextInput
                className="w-4/5 border-2 border-orange-400 rounded-xl p-2 px-5"
                placeholder="Alterar meu número"
                placeholderTextColor={'#fb923c'}
                />
                <Pressable className="p-3.5 bg-orange-500 rounded-xl items-center justify-center">
                  <ArrowPathIcon color="white" size={20} />
                </Pressable>
              </View>
              <View className="flex-row justify-between">
                <TextInput
                className="w-4/5 border-2 border-orange-400 rounded-xl p-2 px-5"
                placeholder="Alterar meu e-mail"
                placeholderTextColor={'#fb923c'}
                />
                <Pressable className="p-3.5 bg-orange-500 rounded-xl items-center justify-center">
                  <ArrowPathIcon color="white" size={20} />
                </Pressable>
              </View>
              <View className="flex-row justify-between">
                <TextInput
                className="w-4/5 border-2 border-orange-400 rounded-xl p-2 px-5"
                placeholder="Alterar minha senha"
                placeholderTextColor={'#fb923c'}
                />
                <Pressable className="p-3.5 bg-orange-500 rounded-xl items-center justify-center">
                  <ArrowPathIcon color="white" size={20} />
                </Pressable>
              </View>
              <Pressable className="w-full p-4 bg-orange-500 rounded-xl items-center justify-center flex-row gap-3">
                <Text className="text-white font-medium">Descarregar imagem</Text>
                <ArrowUpTrayIcon color="white" size={20} />
              </Pressable>
              <Pressable className="w-full p-3 bg-orange-500 rounded-xl items-center justify-center flex-row gap-3">
                <Text className="text-white font-medium">Meus endereços</Text>
                <MapIcon color="white" size={20} />
              </Pressable>
              <Pressable className="w-full p-3 bg-red-500 rounded-xl items-center justify-center flex-row gap-3">
                <Text className="text-white font-medium">Meus favoritos</Text>
                <HeartIcon color="white" size={20} />
              </Pressable>
            </View>
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
}
