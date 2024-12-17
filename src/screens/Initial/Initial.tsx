import { ScrollView, View } from "react-native";
import Banner from "./Components/Banner";
import Header from "./Components/Header";
import { Section } from "./Components/Section";
import { FoodsList } from "./Components/FoodsList/FoodsList";
import RestaurantsList from "./Components/RestaurantsList/RestaurantsList";

export default function Initial() {
  return (
    <ScrollView style={{ flex: 1 }} 
    className="bg-white" 
    showsVerticalScrollIndicator={false}>

      <Header />

      <Banner />

      <Section name={"Top receitas"} 
      size={"text-2xl"} label={"Veja mais"} 
      action={function (): void {
        throw new Error("Function not implemented.");
      } } />

      <FoodsList />

      <Section name={"Top restaurantes"} 
      size={"text-2xl"} label={"Veja mais"} 
      action={function (): void {
        throw new Error("Function not implemented.");
      } } />

      <RestaurantsList />

    </ScrollView>
  )
}