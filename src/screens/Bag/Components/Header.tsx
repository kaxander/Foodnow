import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, Text, View, StatusBar } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { RootStackParamList } from "../../../routes/stackNav/stack.routes";

type BagScreenProp = NativeStackNavigationProp<RootStackParamList, 'Bag'>;

export default function Header() {
  const navigation = useNavigation<BagScreenProp>();

  const handleBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' as keyof RootStackParamList }],
    });
  };

  return (
    <View
      className="flex-row items-center justify-between bg-white px-5 h-32"
    >
      <Pressable onPress={handleBack}>
        <ChevronLeftIcon size={35} color={"#f97316"} strokeWidth={3} />
      </Pressable>

      <Text className="text-center tracking-[4px] text-2xl font-medium text-orange-500">
        SACOLA
      </Text>

      <Text className="text-orange-500 font-medium text-xl">Limpar</Text>
    </View>
  );
};
