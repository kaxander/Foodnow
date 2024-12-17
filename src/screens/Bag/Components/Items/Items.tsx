import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, LayoutAnimation, Platform, UIManager, Animated, TextInput } from 'react-native';
import { ChevronDownIcon, PlusIcon, MinusIcon, XMarkIcon, CheckIcon, TrashIcon, TicketIcon } from 'react-native-heroicons/solid';

interface ItemsProps {
  id: string;
  image: string;
  name: string;
  restaurantName: string;
  price: number;
  ingredients: {
    id: string;
    name: string;
    img: string;
  }[];
  getTotal: (total: number, id: string) => void;
}

export default function Items({ image, name, id, restaurantName, price, ingredients, getTotal }: ItemsProps) {
  const [num, setNum] = useState(1); // Estado para armazenar o valor de num
  const totalPrice = price * num;

  useEffect(() => {
    getTotal(totalPrice, id); // Passa o total e o id para a função pai
  }, [num]);


  function increment() {
    setNum(prevNum => prevNum + 1);
  }

  function decrement() {
    if (num > 1) {
      setNum(prevNum => prevNum - 1);
    } else {
      // Ação opcional para quando chegar a 1 (poderia ser deletar o item)
      console.log('Item será removido');
    }
  }

  const [expanded, setExpanded] = useState(false);
  const animationValue = useState(new Animated.Value(0))[0];

  const [activeIngredients, setActiveIngredients] = useState<{ [key: string]: boolean }>({});

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

  const handleToggleIngredient = (ingredientId: string) => {
    setActiveIngredients(prevState => ({
      ...prevState,
      [ingredientId]: !prevState[ingredientId], // Alterna o estado do ingrediente
    }));
  };

  const rotation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'], // Gira o ícone de baixo para cima
  });

  return (
    <View className="mb-4 rounded-3xl overflow-hidden border border-gray-400 px-4">
      <Pressable onPress={toggleExpand} className="flex-row items-center justify-between p-3 bg-white">
        <View className='flex-row gap-3'>
          <Image source={{ uri: image }} className="w-16 h-16 rounded-lg" />
          <View className="flex-col items-start ">
            <Text className="text-lg font-medium">{name}</Text>
            <Text className=" font-light ">{restaurantName}</Text>
          </View>
        </View>
        
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <ChevronDownIcon size={20} color="black" />
        </Animated.View>
      </Pressable>

      {expanded && (
        <View className="p-4 bg-white flex-col border-b-gray-300 border-b">
          <View className='gap-3'>
            <Text className="text-lg font-medium">Ingredientes</Text>
            {ingredients.map(ingredient => {
              const isActive = activeIngredients[ingredient.id] || false; // Verifica se o ingrediente está ativo

              return (
                <View
                  key={ingredient.id}
                  className={`flex-row items-center ${
                    isActive ? 'bg-gray-100' : 'bg-orange-100' 
                  } rounded-lg p-2 border ${isActive ? 'border-gray-300' : 'border-orange-500' } justify-between`}
                >
                  <View className='flex-row items-center gap-3'>
                    <Image source={{ uri: ingredient.img }} className="w-10 h-10 rounded-sm" />
                    <Text className={`text-lg ${isActive ? 'text-gray-500' : 'text-orange-500'  }`}>{ingredient.name}</Text>
                  </View>
                  
                  <View className='flex-row gap-2'>
                    {isActive ?
                    (
                      <View className='flex-row items-center gap-3'>
                        <Text className='text-red-600'>Removido</Text>
                        <Pressable
                        className='bg-green-100 rounded-lg p-2 border border-green-400'
                        onPress={() => handleToggleIngredient(ingredient.id)}
                        >
                          <CheckIcon size={20} color="green" />
                        </Pressable>
                      </View>
                    ) :

                    (
                      
                      <View className='flex-row items-center gap-3'>
                        <Text className='text-green-600'>Adicionado</Text>
                        <Pressable
                        className='bg-red-100 rounded-lg p-2 border border-red-400'
                        onPress={() => handleToggleIngredient(ingredient.id)}
                        >
                          <XMarkIcon size={20} color="red" />
                        </Pressable>
                      </View>
                    ) }
                  </View>
                </View>
              );
            })}

            <TextInput
            className='border border-gray-300 rounded-lg p-4'
            placeholder='Observações'
            />
            <View className='flex-row items-center border bg-green-50 border-green-200 rounded-lg p-2 px-4 gap-2'>
              <TicketIcon size={20} color="#15803d" />
              <TextInput
              placeholder='Cupom de desconto'
              placeholderTextColor={'#15803d'}
              className='text-lg font-medium text-green-700'
              
              />
            </View>
            
          </View>
        </View>
      )}

      <View className="p-4 bg-white flex-row gap-3 items-center justify-between">
        <View className='flex-row p-2 justify-between items-center'>
          <View className='flex-row gap-2'>
            <Text className="text-lg font-medium">Preço:</Text>
            <Text className="text-lg font-medium text-green-700">R$ {(totalPrice.toFixed(2)).replace('.', ',')}</Text>
          </View>
        </View>
        <View className='flex-row border border-black rounded-lg items-center p-1'>
          <Pressable className='border-e px-2' onPress={decrement}>
            {num === 1 ? (
              <TrashIcon size={20} color="red" /> // Ícone de lixeira quando há 1 item
            ) : (
              <MinusIcon size={20} color="red" /> // Ícone de menos quando há mais de 1 item
            )}
          </Pressable>
  
          <Text className="text-lg font-medium px-2">{num}</Text>
  
          <Pressable className='border-s px-2' onPress={increment}>
            <PlusIcon size={20} color="green" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
