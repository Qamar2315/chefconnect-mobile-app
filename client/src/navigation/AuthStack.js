import React from 'react';

// Importing Stack Navigator
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Importing Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';

const AuthStack = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName='home' screenOptions={{headerShown: true}}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signup" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;