import { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { Foods } from './Foods'
import React from 'react';

export interface FoodProps{
  id: string;
  name: string;
  price: number;
  time: string;
  delivery: number;
  rating: number;
  image: string;
  restaurantId: string;
}

export function FoodsList() {
  const [foods, setFoods] = useState<FoodProps[]>([]);

  useEffect(() => {
    async function getFoods() {
      const response = await fetch('http://192.168.0.122:3000/foods');
      const data = await response.json();
      setFoods(data);
    }

    getFoods();
  }, []);

 return (
  <FlatList
    data={foods}
    renderItem={({ item }) => <Foods food={item}/>} 
    horizontal={true}
    contentContainerStyle={{gap: 28, paddingLeft: 24, paddingRight: 24}}
    showsHorizontalScrollIndicator={false}/>
  );
}