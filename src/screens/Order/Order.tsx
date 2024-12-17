import React from 'react';
import { View, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import Header from './Components/Header';
import Main from './Components/Main';

export default function Order() {
  return (
    <View className="flex-1 bg-white">
      {/* Área cinza na parte superior */}
      <View style={{ height: StatusBar.currentHeight, backgroundColor: '#f9fafb', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }} />
      
      {/* SafeAreaView para o conteúdo */}
      <SafeAreaView className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header />
          <Main />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
