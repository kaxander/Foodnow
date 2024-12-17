import { View, Pressable, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FoodProps } from './FoodsList';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../routes/stackNav/stack.routes';
import InfoFoods from '../../../Info/Foods/InfoFoods';
export function Foods({food}: {food: FoodProps}) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

 return (
  <Pressable className='flex flex-col rounded-xl relative mt-4 mb-6'
    onPress={() => {
      navigation.navigate('InfoFoods', {food});
    }}
    >
      <Image 
      source={{uri: food.image}}
      className='w-[135px] h-[120px] rounded-2xl'/>

      <View className='flex flex-row bg-neutral-900/80 w-fit gap-1 rounded-full absolute top-2 right-3 px-2 py-1 items-center justify-center'>
        <Ionicons name='star' size={14} color='#ca8a04'/>
        <Text className='text-white text-sm'>{food.rating}</Text>
      </View>

      <View className='flex flex-row rounded-full absolute top-[-10px] left-[-10px]  items-center justify-center'>
        <Image className='w-[45px] h-[45px] rounded-full bg-orange-500'
        source={{uri: food.image}}
        />
      </View>

      <Text className='text-black mt-1'>{food.name}</Text>
      <Text className='text-neutral-600'>{food.time} - R$ {food.delivery}</Text>
      <Text className='text-orange-500 font-medium text-lg mt-3'>R$ {food.price}</Text>
    </Pressable>
  );
}