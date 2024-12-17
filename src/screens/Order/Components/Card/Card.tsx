import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, LayoutAnimation, Platform, UIManager, Animated } from 'react-native';
import { ChevronDownIcon, CheckBadgeIcon } from 'react-native-heroicons/solid';

interface CardProps {
  id: string;
  image: string;
  name: string;
}

export default function Card({ image, name, id }: CardProps) {
  const [expanded, setExpanded] = useState(false);
  const animationValue = useState(new Animated.Value(0))[0];

  // Habilita animação de layout no Android
  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [expanded]);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const rotation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'], // Gira o ícone de baixo para cima
  });

  return (
    <View className="mb-4 rounded-lg overflow-hidden border border-gray-300 px-4">
      <Pressable onPress={toggleExpand} className="flex-row items-center justify-between p-3 bg-white border-b-gray-300 border-b">
        <View className="flex-row items-center ">
          <Image source={{ uri: image }} className="w-12 h-12 rounded-full mr-3" />
          <Text className="text-lg font-medium">{name}</Text>
        </View>
        <View className='flex-row gap-4 items-center'>
          <Text className="text-base font-light">18/08/2024</Text>
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <ChevronDownIcon size={20} color="black" />
          </Animated.View>
        </View>
        
      </Pressable>
      <View className="p-4 bg-white flex-row gap-3 items-center border-b-gray-300 border-b">
        <Text className='font-bold text-orange-500'>Status:</Text>
        <CheckBadgeIcon size={20} color="#15803d" />
        <Text>Pedido concluído  •   Nº {id}</Text>
      </View>
      {expanded && (
        <>
          <View className="p-4 bg-white flex-col gap-2 border-b-gray-300 border-b">
            <Text className="text-lg font-medium">Detalhes do pedido</Text>
            <View className='flex-row gap-2 items-center'>
              <Text className="bg-orange-100 p-1.5 rounded-lg text-[13px] text-orange-500">2x</Text>
              <Text className=' font-light'>Hot-dog</Text>
            </View>
            <View className='flex-row gap-2 items-center'>
              <Text className="bg-orange-100 p-1.5 rounded-lg text-[13px] text-orange-500">1x</Text>
              <Text className=' font-light'>X-burguer</Text>
            </View>
            <View className='flex-row gap-2 items-center'>
              <Text className="bg-orange-100 p-1.5 rounded-lg text-[13px] text-orange-500">3x</Text>
              <Text className=' font-light'>Coca-cola</Text>
            </View>
          </View>
          <View className='flex-row p-4 justify-between items-center'>
            <View className='flex-row gap-2'>
              <Text className="text-lg font-medium">Total:</Text>
              <Text className="text-lg font-medium text-green-700">R$ 15,00</Text>
            </View>
            <Pressable className='bg-orange-500 p-2 rounded-lg'>
              <Text className="text-lg font-medium text-white">Refazer pedido</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}
