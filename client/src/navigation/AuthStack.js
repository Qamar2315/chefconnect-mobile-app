import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName='home' screenOptions={{ headerShown: true }}>
            <Stack.Screen name='home' component={HomeScreen} />
            <Stack.Screen name='login' component={LoginScreen} />
            <Stack.Screen name='signup' component={SignUpScreen} />
        </Stack.Navigator>
    );
};

export default AuthStack;