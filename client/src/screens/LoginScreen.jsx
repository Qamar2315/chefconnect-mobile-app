import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../config'; // Make sure to import your BASE_URL from config

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (email.length === 0 || password.length === 0) {
      Alert.alert('Error', 'Enter Both Email And Password');
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/api/users/login`, { email, password });
      if (!response.data.success) {
        Alert.alert('Error', response.data.message);
      } else {
        // Login successful, navigate to home screen or any other screen
        // navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <Text className="text-3xl mb-8 text-blue-600">Login</Text>
      <TextInput
        className="w-4/5 h-12 border border-gray-300 rounded px-4 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        className="w-4/5 h-12 border border-gray-300 rounded px-4 mb-4"
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        className="w-4/5 h-12 bg-blue-500 rounded items-center justify-center"
        onPress={handleSignIn}
      >
        <Text className="text-white text-base">Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
