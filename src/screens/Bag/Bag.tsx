import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/stackNav/stack.routes';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';

type BagScreenProp = NativeStackNavigationProp<RootStackParamList, 'Bag'>;

const Bag = () => {
  const [totals, setTotals] = useState<{ [key: string]: number }>({});

  const handleGetTotal = (total: number, id: string) => {
    setTotals(prevTotals => ({
      ...prevTotals,
      [id]: total,
    }));
  };

  const totalSum = Object.values(totals).reduce((acc, curr) => acc + curr, 0);

  return (
    <SafeAreaView style={styles.container}>
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContainer}
      >
        <Header />
        <Main handleGetTotal={handleGetTotal} />
      </ScrollView>
      <Footer totalSum={totalSum} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Ajuste conforme necessário
  },
});

export default Bag;
