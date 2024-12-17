import React from 'react';
import { View, ScrollView } from 'react-native';
import Card from './Card/Card';
import data from '../../../../restaurants.json';

export default function Main() {
  // Ordenar os dados de maneira decrescente com base no id
  const sortedData = [...data].sort((a, b) => parseInt(b.id) - parseInt(a.id));

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        {sortedData.map((restaurant) => (
          <Card 
            key={restaurant.id}
            id={restaurant.id}
            image={restaurant.image} 
            name={restaurant.name}
          />
        ))}
      </View>
    </ScrollView>
  );
}
