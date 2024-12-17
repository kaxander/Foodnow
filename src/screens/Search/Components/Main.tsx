import React from 'react';
import { View, Text, SectionList } from 'react-native';
import FoodCard from './Cards/FoodsCard';
import RestaurantCard from './Cards/RestaurantsCard';

interface Food {
  id: string;
  name: string;
  image: string;
  rating: number;
  time: string;
  delivery: number;
  price: number;
  restaurantImg: string;
  category: string;
}

interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  time: string;
  deliveryPrice: number;
  cupom: number;
}

type Item = 
  | (Food & { type: 'food' })
  | (Restaurant & { type: 'restaurant' });

interface MainProps {
  foods: Food[];
  restaurants: Restaurant[];
  searchTerm: string;
  selectedCategory: string | null;
}

export default function Main({ foods, restaurants, searchTerm, selectedCategory }: MainProps) {
  // Combine foods and restaurants into a single list
  const data: Item[] = [
    ...foods.map(food => ({ ...food, type: 'food' as const })),
    ...restaurants.map(restaurant => ({ ...restaurant, type: 'restaurant' as const })),
  ];

  // Filter the items based on search term and selected category
  const filteredData = data.filter(item => {
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = item.type === 'food' && selectedCategory 
      ? item.category === selectedCategory 
      : true;
    return matchesSearchTerm && matchesCategory;
  });

  // Separate filtered data into food and restaurant sections
  const sections = [
    {
      title: 'Comidas',
      data: filteredData.filter(item => item.type === 'food') as (Food & { type: 'food' })[],
    },
    {
      title: 'Restaurantes',
      data: filteredData.filter(item => item.type === 'restaurant') as (Restaurant & { type: 'restaurant' })[],
    },
  ];

  // Render function for SectionList
  const renderItem = ({ item }: { item: Item }) => {
    if (item.type === 'food') {
      return <FoodCard food={item as Food} />;
    } else if (item.type === 'restaurant') {
      return <RestaurantCard restaurant={item as Restaurant} />;
    }
    return null;
  };

  // Render function for SectionList headers with adjusted title size
  const renderSectionHeader = ({ section }: { section: { title: string } }) => (
    <View className="bg-white">
      <Text className="text-3xl font-bold mb-2 mt-4">
        {section.title}
      </Text>
    </View>
  );

  // Key extractor function to ensure unique keys
  const keyExtractor = (item: Item) => `${item.type}-${item.id}`;

  // Check if there are items to display
  const hasResults = sections.some(section => section.data.length > 0);

  return (
    <View className="flex-1 px-6 bg-white">
      {!searchTerm && !selectedCategory ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-center text-gray-500">
            Digite algo na busca ou selecione uma categoria para ver resultados.
          </Text>
        </View>
      ) : hasResults ? (
        <SectionList
          sections={sections}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false} // Impede cabeçalhos fixos
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-center text-gray-500">
            Nenhum resultado encontrado.
          </Text>
        </View>
      )}
    </View>
  );
}
