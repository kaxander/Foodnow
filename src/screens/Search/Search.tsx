import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Header from './Components/Header';
import Main from './Components/Main';
import foodsData from '../../../foods.json';
import restaurantsData from '../../../restaurants.json';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredFoods = foodsData.filter((food) =>
    (selectedCategory ? food.category === selectedCategory : true) &&
    (searchTerm ? food.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
  );

  const filteredRestaurants = restaurantsData.filter((restaurant) =>
    (searchTerm ? restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Main
        foods={filteredFoods}
        restaurants={filteredRestaurants}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
