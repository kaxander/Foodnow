// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import VideoTest from '../screens/SplashScreen/VideoTest'; // Ajuste o caminho conforme necessário
import StackRoutes from './stackNav/stack.routes';

export default function App() {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
}
