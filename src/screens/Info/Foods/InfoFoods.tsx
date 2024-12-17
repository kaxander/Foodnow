import { useRoute } from '@react-navigation/native';
import { SafeAreaView, Text, Image, View, Pressable, ScrollView, StatusBar, ImageBackground } from 'react-native';
import { HeartIcon, MinusIcon, PlusIcon } from 'react-native-heroicons/solid';
import { FoodProps } from "../../Initial/Components/FoodsList/FoodsList";
import { LinearGradient } from 'expo-linear-gradient';

export default function InfoFoods() {
  const route = useRoute();
  const { food } = route.params as { food: FoodProps }; 

  return (
    <View className='flex-1'>
      <StatusBar barStyle={'light-content'} />
      
      
      
      
      <Image
        source={{ uri: food.image }}
        className='w-full h-2/5'
        resizeMode='cover'
      />
      
      
      
      {/* Gradiente sobreposto */}
      <LinearGradient
        colors={['rgb(0, 0, 0)', 'transparent']}
        style={{
          position: 'absolute',
          width: '100%',
          top: 0,
          justifyContent: 'flex-end', // Ajusta a posição do gradiente
        }}
      >
        <View className='p-20'/>
        
      </LinearGradient>
      <Text className='text-white text-3xl uppercase font-extrabold w-full text-center absolute top-20'>{food.name}</Text>
      <View className='flex-row justify-around gap-16 items-end w-full h-2/5 absolute top-7'>
        <View className='flex-row justify-between bg-white rounded-full'
        style={{
        shadowColor: '#000',        // Cor da sombra
        shadowOffset: { width: 0, height: 2 }, // Offset da sombra
        shadowOpacity: 0.25,        // Opacidade da sombra
        shadowRadius: 3.84,         // Raio da sombra
        }}
        >
          <Pressable className='w-20 items-center justify-center h-14 border-e-2 border-gray-100'>
            <MinusIcon color='black' size={25} />
          </Pressable>
          <View className='w-16 items-center justify-center h-14'>
            <Text className=' text-black text-2xl'>0</Text>
          </View>
          <Pressable className='w-20 items-center justify-center h-14 border-s-2 border-gray-100'>
            <PlusIcon color='black' size={25} />
          </Pressable>
        </View>
        <Pressable className='bg-white w-14 h-14 items-center justify-center rounded-full'
        style={{
        shadowColor: '#000',        // Cor da sombra
        shadowOffset: { width: 0, height: 2 }, // Offset da sombra
        shadowOpacity: 0.25,        // Opacidade da sombra
        shadowRadius: 3.84,         // Raio da sombra
        }}>
          <HeartIcon color='red' size={25} />
        </Pressable>
      </View>
      
      <View className='w-full flex-col justify-center items-center mt-16'>
        <Text className='font-bold text-2xl'>Ingredients</Text>
        
      </View>
      
    </View>
  );
}
