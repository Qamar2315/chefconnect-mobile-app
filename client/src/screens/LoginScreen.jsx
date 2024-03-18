import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if  (!email || !password){
      Alert.alert('Error', 'Enter Both Email And Password'); 
      return;
    }
    try {
      const response = await axios.post('/api/users/login', { email, password });
      console.log(response);
      // navigation.navigate('Home');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
      }
      // Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-3xl mb-8">Login</Text>
      <TextInput
        className="w-4/5 h-12 border border-gray-300 rounded mb-4 px-4"
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        className="w-4/5 h-12 border border-gray-300 rounded mb-4 px-4"
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        className="w-4/5 h-12 bg-blue-500 rounded items-center justify-center mt-4"
        onPress={handleSignIn}
      >
        <Text className="text-white text-base">Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;