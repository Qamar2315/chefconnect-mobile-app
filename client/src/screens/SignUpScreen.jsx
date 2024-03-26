import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../../config';
import LoadingScreen from '../components/LoadingScreen';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    try {
      // Validate input fields
      if (!name || !email || !password) {
        Alert.alert('Error', 'Please fill in all fields to sign up.');
        return;
      }

      // Send signup request to the server
      const response = await axios.post(`${BASE_URL}/api/users/signup`, {
        name,
        email,
        password,
      });
      if (response.data.success) {
        Alert.alert("Congrats", response.data.message);
        navigation.navigate('login');
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.error('Sign Up Error:', error);
      // Handle sign up errors (e.g., display error message to the user)
      Alert.alert('Error', 'Sign up failed. Please try again.');
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <Text className="text-3xl mb-8 text-blue-600">Sign Up</Text>
      <View className="w-4/5 mb-4">
        <Text className="text-gray-700 mb-2">Full Name</Text>
        <TextInput
          className="w-full h-12 border border-gray-300 rounded px-4"
          placeholder="Enter your full name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View className="w-4/5 mb-4">
        <Text className="text-gray-700 mb-2">Email</Text>
        <TextInput
          className="w-full h-12 border border-gray-300 rounded px-4"
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View className="w-4/5 mb-4">
        <Text className="text-gray-700 mb-2">Password</Text>
        <TextInput
          className="w-full h-12 border border-gray-300 rounded px-4"
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity
        className="w-4/5 h-12 bg-blue-600 rounded items-center justify-center"
        onPress={handleSignUp}
      >
        <Text className="text-white text-base">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
