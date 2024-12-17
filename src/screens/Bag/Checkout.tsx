import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MapIcon } from 'react-native-heroicons/solid';
import { BanknotesIcon, CurrencyPoundIcon } from 'react-native-heroicons/solid';

// Simulação de itens no carrinho
const cartItems = [
  { id: '1', name: 'Hambúrguer', price: 19.99, quantity: 2 },
  { id: '2', name: 'Pizza Margherita', price: 29.99, quantity: 1 },
  { id: '3', name: 'Suco Natural', price: 9.99, quantity: 3 },
];

// Simulação de taxa de entrega e total
const deliveryFee = 5.99;

export default function CheckoutScreen() {
  const navigation = useNavigation();

  // Cálculo do total do pedido
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + deliveryFee;

  // Estado para armazenar o método de pagamento selecionado
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cash'>('pix');
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirmPurchase = () => {
    setModalVisible(true); // Abre o modal de confirmação
  };

  const handleFinalizarCompra = () => {
    // Aqui você adiciona a lógica para processar o pedido
    console.log('Pedido finalizado com método:', paymentMethod);
    // Navegar para uma tela de sucesso ou de conclusão da compra
    // navigation.navigate('SuccessScreen');
    setModalVisible(false); // Fecha o modal após a confirmação
  };

  const renderItem = ({ item }: { item: { id: string; name: string; price: number; quantity: number; } }) => (
    <View className='flex-row justify-between items-center p-4 border-b border-gray-300'>
      <Text className='text-lg'>{item.name} x{item.quantity}</Text>
      <Text className='text-lg'>R${(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  return (
    <View className='flex-1 items-center justify-center gap-4'>
      {/* Endereço de Entrega */}
      <View className='bg-white w-[90%] p-4 rounded-lg mb-4 gap-5'>
        <Text className='text-lg font-bold'>Endereço de Entrega</Text>
        <Text className='text-base'>Rua Exemplo, 123, Bairro, Cidade, Estado</Text>
        <Pressable className="w-full p-3 bg-orange-500 rounded-xl items-center justify-center flex-row gap-3">
          <Text className="text-white font-medium">Meus endereços</Text>
          <MapIcon color="white" size={20} />
        </Pressable>
      </View>

      {/* Método de Pagamento */}
      <View className='bg-white w-[90%] p-4 rounded-lg mb-4 gap-3'>
        <Text className='text-lg font-bold mb-2'>Método de Pagamento</Text>
        <View className='flex-row items-center justify-center'>
          <Pressable 
            onPress={() => setPaymentMethod('pix')}
            className={`w-44 h-16 flex-row items-center justify-center p-3 rounded-xl ${paymentMethod === 'pix' ? 'bg-orange-500' : 'border border-orange-500'}`}
          >
            <CurrencyPoundIcon color={paymentMethod === 'pix' ? 'white' : 'orange'} size={20} />
            <Text className={`${paymentMethod === 'pix' ? 'text-white' : 'text-orange-500'} ml-2`}>Pix</Text>
          </Pressable>
          <Pressable 
            onPress={() => setPaymentMethod('cash')}
            className={`w-44 h-16 flex-row items-center justify-center p-3 rounded-xl ml-3 ${paymentMethod === 'cash' ? 'bg-orange-500' : 'border border-orange-500'}`}
          >
            <BanknotesIcon color={paymentMethod === 'cash' ? 'white' : 'orange'} size={20} />
            <Text className={`${paymentMethod === 'cash' ? 'text-white' : 'text-orange-500'} ml-2`}>Em dinheiro</Text>
          </Pressable>
        </View>
      </View>

      {/* Resumo do Pedido */}
      <View className='bg-white w-[90%] p-4 rounded-lg mb-4'>
        <Text className='text-lg font-bold mb-2'>Resumo do Pedido</Text>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <View className='flex-row justify-between items-center mt-4'>
          <Text className='text-base font-semibold'>Subtotal</Text>
          <Text className='text-base'>R${subtotal.toFixed(2)}</Text>
        </View>
        <View className='flex-row justify-between items-center mt-2'>
          <Text className='text-base font-semibold'>Taxa de Entrega</Text>
          <Text className='text-base'>R${deliveryFee.toFixed(2)}</Text>
        </View>
        <View className='flex-row justify-between items-center mt-4'>
          <Text className='text-lg font-bold'>Total</Text>
          <Text className='text-lg font-bold'>R${total.toFixed(2)}</Text>
        </View>
      </View>

      {/* Botão de Finalizar Compra */}
      <Pressable
        onPress={handleConfirmPurchase}
        className='bg-orange-500 w-[90%] p-4 rounded-lg'
      >
        <Text className='text-center text-white text-lg font-semibold'>Finalizar Compra</Text>
      </Pressable>

      {/* Modal de Confirmação */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className='flex-1 items-center justify-center bg-[#0000007f]'>
          <View className='bg-white w-[90%] p-8 rounded-lg items-center gap-3'>
            <Text className='text-xl font-bold'>Confirmação</Text>
            <Text className='text-base'>Você tem certeza que deseja finalizar a compra?</Text>
            <View className='flex-row justify-center items-center mt-8'>
              <Pressable onPress={handleFinalizarCompra} className='bg-orange-500 w-32 p-3.5 rounded-xl justify-center items-center'>
                <Text className='text-white font-medium'>Sim</Text>
              </Pressable>
              <Pressable onPress={() => setModalVisible(false)} className='bg-gray-400 w-32 p-3.5 rounded-xl ml-3 justify-center items-center'>
                <Text className='text-white font-medium'>Não</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}