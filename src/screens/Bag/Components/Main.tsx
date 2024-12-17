import { View, Text } from "react-native";
import Items from "./Items/Items";
import data from '../../../../foods.json';

interface MainProps {
  handleGetTotal: (total : number, id: string) => void
}

export default function Main({ handleGetTotal }: MainProps) {

  return (
    <View className="bg-white w-full h-full">
      <Text className="text-[18px] font-medium tracking-[1px] px-8">Items adicionados</Text>
      <View style={{padding: 20 }}>
        {data.map((food) => (
          <Items 
            key={food.id}
            id={food.id}
            image={food.image} 
            name={food.name}
            restaurantName={food.restaurantName}
            price={food.price}
            ingredients={food.ingredients}
            getTotal={handleGetTotal}
          />
        ))}
      </View>
    </View>
  );
}