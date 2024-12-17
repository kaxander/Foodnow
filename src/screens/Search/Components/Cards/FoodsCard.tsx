import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { StarIcon } from 'react-native-heroicons/solid';

interface FoodCardProps {
  food: {
    id: string;
    name: string;
    image: string;
    rating: number;
    time: string;
    restaurantImg: string;
    delivery: number;
    price: number;
  };
}


export default function FoodCard({ food }: FoodCardProps) {
  return (
    <View className='flex flex-row justify-between gap mb-8 items-center'>
      
      <Pressable className="flex flex-row rounded-xl relative bg-white gap-4">
        <Image
        source={{ uri: food.image }}
        className="w-[95px] h-[80px] rounded-2xl"
        />

        <View className="flex-col gap-1">
          <View className="flex-row gap-3 items-center">
            <Text className="text-black font-bold">{food.name}</Text>
            <View className="flex-row items-center gap-0.5 bg-[#fae5ac] w-[50px] h-[30px] p-1.5 rounded-full justify-center">
              <StarIcon color="#ecba30" size={13} />
              <Text className="text-[#ecba30] text-base font-bold">{food.rating}</Text>
            </View>
          </View>
          <View className='flex-row'>
            <Text className="text-green-600 font-normal">R$ {food.price.toFixed(2)} • </Text>
            <Text className="text-gray-400 font-normal">{food.time}</Text>
          </View>
          <Text>Entrega R$ {food.delivery.toFixed(2)}</Text>
        </View>
      </Pressable>

      <Pressable className='me-3'>
        <Image className="w-[45px] h-[45px] rounded-full" source={{ uri: food.restaurantImg }} />
      </Pressable>
    </View>
    
  );
}
