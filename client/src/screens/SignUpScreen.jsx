import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('login');
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <Text className="text-3xl mb-8 text-blue-600">Sign Up</Text>
      <View className="w-4/5 mb-4">
        <Text className="text-gray-700 mb-2">Full Name</Text>
        <TextInput
          className="w-full h-12 border border-gray-300 rounded px-4"
          placeholder="Enter your full name"
        />
      </View>
      <View className="w-4/5 mb-4">
        <Text className="text-gray-700 mb-2">Email</Text>
        <TextInput
          className="w-full h-12 border border-gray-300 rounded px-4"
          placeholder="Enter your email"
        />
      </View>
      <View className="w-4/5 mb-4">
        <Text className="text-gray-700 mb-2">Password</Text>
        <TextInput
          className="w-full h-12 border border-gray-300 rounded px-4"
          placeholder="Enter your password"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        className="w-4/5 h-12 bg-blue-600 rounded items-center justify-center"
        onPress={handleLogin}
      >
        <Text className="text-white text-base">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;