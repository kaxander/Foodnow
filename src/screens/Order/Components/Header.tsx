import { View, Text, Platform } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View className="justify-center items-center w-full h-28" style={{ marginTop: Platform.OS === 'ios' ? 10 : insets.top
     }}>
      <Text className="tracking-[4px] text-2xl font-medium text-orange-500">MEUS PEDIDOS</Text>
    </View>
  );
}