import React from 'react';
import { Pressable } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface CategoryProps {
  name: string;
  onPress: () => void;
  isActive: boolean;
}

export default function Category({ name, onPress, isActive }: CategoryProps) {
  const backgroundColor = useSharedValue(isActive ? '#f97316' : 'white');
  const textColor = useSharedValue(isActive ? 'white' : '#f97316');

  React.useEffect(() => {
    backgroundColor.value = withTiming(isActive ? '#f97316' : 'white', {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
    textColor.value = withTiming(isActive ? 'white' : '#f97316', {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
    borderColor: isActive ? 'transparent' : '#f97316',
  }), [isActive]);

  const animatedTextStyle = useAnimatedStyle(() => ({
    color: textColor.value,
  }), [isActive]);

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={[{ width: 96, height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginHorizontal: 8, borderWidth: 2 }, animatedStyle]}
      >
        <Animated.Text style={[{ fontWeight: 'bold' }, animatedTextStyle]}>
          {name}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}
