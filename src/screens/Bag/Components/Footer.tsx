import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { RootStackParamList } from "../../../routes/stackNav/stack.routes";

interface FooterProps {
  totalSum: number;
}

export default function Footer({ totalSum }: FooterProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.footerContainer}>
      <View className="flex-col gap-3 mt-3">
        <Text>Total com entrega <Text className="text-green-700">R$ 5,00</Text></Text>
        <View className="flex-row items-center">
          <Text className="text-xl font-semibold">Total: </Text>
          <Text className="text-xl text-green-700">R$ {totalSum.toFixed(2).replace('.', ',')}</Text>
          <Text className="text-base font-light"> / 1 item</Text>
        </View>
      </View>

      <Pressable className="bg-orange-500 p-3.5 rounded-xl w-32 flex items-center justify-center" onPress={() => navigation.navigate('Checkout')}>
        <Text className="text-white font-bold">Concluir</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    height: 90, // Ajuste a altura conforme necessário
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 'auto', // Adiciona margem automática para empurrar para o fundo
    ...Platform.select({
      ios: {
        shadowColor: '#000000a1',
        shadowOffset: { width: 0, height: -4 }, // Ajuste para aumentar a sombra na parte superior
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

