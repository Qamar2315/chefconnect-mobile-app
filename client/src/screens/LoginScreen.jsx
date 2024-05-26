import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../helpers/Auth";
import LoadingScreen from "../components/LoadingScreen";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, isLoading } = useContext(AuthContext);

  const handleSignIn = async () => {
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    // Validate password length
    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long.");
      return;
    }

    // Call the loginUser function
    try {
      const res = await loginUser({ email, password });
      if (res) {
        navigation.navigate("home");
      } else {
        Alert.alert("Error", "Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Sign In Error:", error);
      Alert.alert("Error", "Sign in failed. Please try again later.");
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

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
      <TouchableOpacity
        className="w-4/5 h-12 bg-green-500 rounded items-center justify-center mt-4"
        onPress={() => {
          navigation.navigate("signup");
        }}
      >
        <Text className="text-white text-base">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
