import React, { useState, useEffect, useRef } from 'react';
import { View, Pressable, Image, Animated } from 'react-native';
import PagerView from 'react-native-pager-view';

const banners = [
  require('../../Assets/banner1.png'),
  require('../../Assets/banner2.png'),
];

export default function Banner() {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerViewRef = useRef<PagerView>(null);

  // Ref que mantém uma animação separada para cada indicador
  const indicators = banners.map(() => useRef(new Animated.Value(8)).current);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextPage = (currentPage + 1) % banners.length;
      setCurrentPage(nextPage);
      if (pagerViewRef.current) {
        pagerViewRef.current.setPage(nextPage);
      }
    }, 5000); // Troca a cada 5 segundos

    return () => clearInterval(interval);
  }, [currentPage]);

  useEffect(() => {
    // Expande o indicador da página atual
    Animated.timing(indicators[currentPage], {
      toValue: 30, // Expansão para 30
      duration: 500, // Animação de 500ms
      useNativeDriver: false,
    }).start();

    // Contrai os outros indicadores
    indicators.forEach((indicator, index) => {
      if (index !== currentPage) {
        Animated.timing(indicator, {
          toValue: 8, // Volta para 8
          duration: 500, // Animação de 500ms
          useNativeDriver: false,
        }).start();
      }
    });
  }, [currentPage]);

  return (
    <View className='w-full h-44 rounded-2xl mt-10 mb-2 justify-center items-center'>
      <PagerView
        ref={pagerViewRef}
        style={{ flex: 1, width: '100%' }}
        initialPage={0}
        pageMargin={14}
        onPageSelected={e => setCurrentPage(e.nativeEvent.position)}
      >
        {banners.map((banner, index) => (
          <View key={index} className='w-full rounded-2xl mb-2 justify-center items-center'>
            <Pressable
              className='w-[90%] h-full rounded-2xl justify-center items-center'
              onPress={() => console.log(`Banner ${index + 1}`)}
            >
              <Image
                source={banner}
                className='w-full h-full rounded-2xl'
                resizeMode="cover"
              />
            </Pressable>
          </View>
        ))}
      </PagerView>

      <View className='flex-row justify-center items-center mt-1'>
        {banners.map((_, index) => (
          <Animated.View
            key={index}
            className={`h-2 rounded-full mx-1 ${currentPage === index ? 'bg-orange-500' : 'bg-gray-400'}`}
            style={{
              width: indicators[index], // Largura animada individualmente
            }}
          />
        ))}
      </View>
    </View>
  );
}
