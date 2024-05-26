import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library

// Importing Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/SignUpScreen';

const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Tab.Navigator 
      initialRouteName='home' 
      screenOptions={{
        headerShown: true, // Show header for all screens
        headerTitle: 'CheffConnect',
        headerBackTitleVisible: false, // Hide back button text
      }}
    >
      <Tab.Screen 
        name="login" 
        component={LoginScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="log-in-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="signup" 
        component={RegisterScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-add-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthStack;
