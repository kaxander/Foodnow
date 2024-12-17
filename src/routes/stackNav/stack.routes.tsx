import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home/Home";
import Register from "../../screens/Register/Register";
import Login from "../../screens/Login/Login";
import TabRoutes from './../../routes/bottomNav/tab.routes';
import Bag from "../../screens/Bag/Bag";
import Buy from "../../screens/Bag/Checkout";
import Checkout from "../../screens/Bag/Checkout";
import InfoFoods from './../../screens/Info/Foods/InfoFoods';
import { FoodProps } from "../../screens/Initial/Components/FoodsList/FoodsList";

export type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Login: undefined;
  MainTabs: undefined;
  Bag: undefined;
  Checkout: undefined;
  InfoFoods: {food: FoodProps};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MainTabs" component={TabRoutes} />
      <Stack.Screen name="Bag" component={Bag} 
      options={{
          gestureEnabled: true,
          headerShown: false,
          presentation: 'modal',
        }} 
      />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="InfoFoods" component={InfoFoods}/>
    </Stack.Navigator>
  );
}
