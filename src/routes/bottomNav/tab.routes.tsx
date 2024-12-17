import React, { useRef, useEffect } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Initial from "../../screens/Initial/Initial";
import Search from '../../screens/Search/Search';
import { View, Animated, Dimensions, StyleSheet, Platform } from "react-native";
import { HomeIcon, MagnifyingGlassIcon, FireIcon, ShoppingBagIcon } from "react-native-heroicons/solid";
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Order from '../../screens/Order/Order';
import Transition from '../../screens/Bag/Transition';

// Obter a largura da tela
const { width } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

interface TabBarIconProps {
  focused: boolean;
  icon: React.ReactNode;
  disableAnimation?: boolean;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ focused, icon, disableAnimation }) => {
  const indicatorWidth = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (disableAnimation) {
      return;
    }
    if (isFocused && focused) {
      Animated.timing(indicatorWidth, {
        toValue: width / 8, // Ajuste a largura do indicador conforme necessário
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(indicatorWidth, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [focused, isFocused, disableAnimation]);

  return (
    <View style={styles.iconContainer}>
      {!disableAnimation && (
        <Animated.View
          style={[styles.indicator, { width: indicatorWidth }]}
        />
      )}
      {icon}
    </View>
  );
};

export default function TabRoutes() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        let disableAnimation = false;
        if (route.name === 'Transition') {
          disableAnimation = true;
        }
        return {
          headerShown: false,
          tabBarStyle: {
            ...styles.tabBarStyle,
            display: route.name === 'Transition' ? 'none' : 'flex', // Esconder a tabBar se for a tela de Transição
          },
          tabBarIcon: ({ focused }) => {
            let icon;
            if (route.name === 'Initial') {
              icon = <HomeIcon size={35} color={focused ? '#f97316' : 'gray'} />;
            } else if (route.name === 'Search') {
              icon = <MagnifyingGlassIcon size={35} color={focused ? '#f97316' : 'gray'} />;
            } else if (route.name === 'Order') {
              icon = <FireIcon size={35} color={focused ? '#f97316' : 'gray'} />;
            } else if (route.name === 'Transition') {
              icon = (
                <View className='flex justify-center items-center bg-orange-500 p-3 rounded-xl'>
                  <ShoppingBagIcon size={28} color={focused ? 'white' : 'white'} />
                </View>
              );
            }
            return <TabBarIcon focused={focused} icon={icon} disableAnimation={disableAnimation} />;
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#f97316',
        };
      }}
    >
      <Tab.Screen name="Initial" component={Initial} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Order" component={Order} />
      <Tab.Screen name="Transition" component={Transition} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    width: '100%',
    height: Platform.OS === 'ios' ? 95 : 75,
    position: 'relative',
    paddingBottom: Platform.OS === 'ios' ? 10 : 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0, // Remove a borda superior se houver
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 }, // Sombra no topo
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
    }),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flex: 1,
  },
  indicator: {
    height: 4,
    backgroundColor: '#f97316',
    position: 'absolute',
    top: 0, // Ajusta o indicador para colar no topo da TabBar
    borderRadius: 10,
  },
});
