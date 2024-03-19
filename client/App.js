import React from 'react';
import { AuthProvider } from './src/helpers/Auth'; // Import your AuthProvider
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Importing Screens
import SignUpScreen  from './src/screens/SignUpScreen'
import LoginScreen from './src/screens/LoginScreen'
import HomeScreen from './src/screens/HomeScreen';
import AddRecipeScreen from './src/screens/AddRecipeScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='add-recipe'>
          <Stack.Screen name='login' component={LoginScreen} />
          <Stack.Screen name='signup' component={SignUpScreen} />
          <Stack.Screen name='home' component={HomeScreen} />
          <Stack.Screen name='add-recipe' component={AddRecipeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
