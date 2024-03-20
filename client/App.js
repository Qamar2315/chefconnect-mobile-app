import React from 'react';
import { AuthProvider } from './src/helpers/Auth'; // Import your AuthProvider
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Importing Screens
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';

export default function App() {
  const Stack = createNativeStackNavigator();
  const isLogin =  false;
  return (
    <AuthProvider>
      <NavigationContainer>
        {
          isLogin ? <AppStack/> : <AuthStack/>
        }
      </NavigationContainer>
    </AuthProvider>
  );
}
