import { FlatList } from 'react-native';
import { useEffect, useState } from 'react'
import React from 'react';
import { Restaurants } from './Restaurants';

export interface RestaurantsProps{
  id: string,
  name: string,
  image: string;
}

export default function RestaurantsList() {
  const [restaurants, setRestaurants] = useState<RestaurantsProps[]>([]);

  useEffect(() => {
    async function getRestaurants() {
      const response = await fetch('http://192.168.0.122:3000/restaurants');
      const data = await response.json();
      setRestaurants(data);
    }

    getRestaurants();
  }, []);

 return (
   <FlatList
    data={restaurants}
    renderItem={({ item }) => <Restaurants item={item}/>} 
    horizontal={true}
    contentContainerStyle={{gap: 18, paddingLeft: 24, paddingRight: 24}}
    showsHorizontalScrollIndicator={false}/>
  );
}