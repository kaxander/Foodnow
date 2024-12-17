import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../../routes/stackNav/stack.routes'; // Ajuste o caminho conforme necessário
import Bag from './Bag';

export default function Transition () {
  return (
    <Bag />
  );
};

