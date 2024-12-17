import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { StarIcon, TicketIcon, HeartIcon as HeartSolid } from 'react-native-heroicons/solid';
import { HeartIcon as HeartOutline } from 'react-native-heroicons/outline';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';

interface RestaurantCardProps {
  restaurant: {
    id: string;
    name: string;
    image: string;
    rating: number;
    time: string;
    deliveryPrice: number;
    cupom: number;
  };
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const [liked, setLiked] = useState(false);
  const animation = useSharedValue(0.8); // O valor inicial é 1 (escala normal)

  const handlePress = () => {
    setLiked(!liked);
    // Ajusta a animação de escala no ícone quando for pressionado
    animation.value = withTiming(liked ? 0.8 : 1, {
      duration: 800,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: animation.value, // Anima a escala do ícone
        },
      ],
    };
  });

  return (
    <View className="flex-row justify-between">
      <Pressable className="flex-row rounded-xl relative mb-8 bg-white gap-4">
        <Image
          source={{ uri: restaurant.image }}
          className="w-[60px] h-[60px] rounded-full"
        />
        <View className="flex-col gap-2">
          <View className="flex-row gap-3 items-center">
            <Text className="text-black font-bold mt-1">{restaurant.name}</Text>
            <View className="flex-row items-center gap-0.5 bg-[#fae5ac] w-[50px] h-[30px] p-1.5 rounded-full justify-center">
              <StarIcon color="#ecba30" size={13} />
              <Text className="text-[#ecba30] text-base font-bold">{restaurant.rating.toFixed(1)}</Text>
            </View>
          </View>
          <Text className="text-gray-500 font-normal">{restaurant.time} • R$ {restaurant.deliveryPrice.toFixed(2)}</Text>
          <View className="flex-row items-center gap-2 bg-green-100 py-[0.8] px-2 rounded-md">
            <TicketIcon color="#15803d" size={13} />
            <Text className="text-sm text-green-700">Cupom de R$ {restaurant.cupom} disponível</Text>
          </View>
        </View>
      </Pressable>

      {/* Botão de like */}
      <Pressable className="me-3" onPress={handlePress}>
        <Animated.View style={animatedStyle}>
          {liked ? (
            <HeartSolid color="red" size={40} />
          ) : (
            <HeartOutline color="red" size={40} />
          )}
        </Animated.View>
      </Pressable>
    </View>
  );
}
