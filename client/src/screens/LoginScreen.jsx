import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../helpers/Auth';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser, userSession } = useContext(AuthContext);
  
  const handleSignIn = async () => {
    if (email.length === 0 || password.length === 0) {
      Alert.alert('Error', 'Enter Both Email And Password');
      return;
    }
    const userData = {
      email: email,
      password: password
    }
    const res = await loginUser(userData);
    if (res) {
      navigation.navigate('home');
    }
  };
  useEffect(() => {
    if(userSession){
      navigation.navigate('home');
    }
  }, [])
  
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
