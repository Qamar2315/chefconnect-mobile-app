import React from 'react';
import { AuthProvider } from './src/helpers/Auth'; // Import your AuthProvider
import LoginScreen from './src/screens/LoginScreen'
import SignUpScreen  from './src/screens/SignUpScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='login'>
          <Stack.Screen name='login' component={LoginScreen} />
          <Stack.Screen name='signup' component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
