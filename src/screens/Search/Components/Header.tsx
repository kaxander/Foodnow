import React from 'react';
import { View, TextInput, FlatList, Platform } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/solid';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Category from './CategoryList/Category'; // Ajuste o caminho conforme necessário

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string | null; // Prop para a categoria selecionada
  setSelectedCategory: (category: string | null) => void;
}

const categories = ['Lanche', 'Churrasco', 'Comida', 'Sorvete', 'Bebida'];

export default function Header({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }: HeaderProps) {
  const insets = useSafeAreaInsets();

  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Desativa a categoria se já estiver ativa
    } else {
      setSearchTerm(''); // Limpa o termo de pesquisa ao selecionar uma nova categoria
      setSelectedCategory(category);
    }
  };

  return (
    <View className="w-full bg-white justify-end items-center gap-4" style={{ height: Platform.OS === 'ios' ? 190 : 190 }}>
      <View className="w-full max-w-[350px] h-16 border-2 border-orange-500 rounded-2xl px-4 flex-row items-center">
        <MagnifyingGlassIcon size={28} color="#f97316" />
        <TextInput
          className="flex-1 ms-2"
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Pesquisar"
          placeholderTextColor="#f97316"
        />
      </View>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <Category
            name={item}
            onPress={() => handleCategoryPress(item)}
            isActive={selectedCategory === item} // Define se a categoria está ativa
          />
        )}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        style={{ maxHeight: 60 }}
      />
    </View>
  );
}
