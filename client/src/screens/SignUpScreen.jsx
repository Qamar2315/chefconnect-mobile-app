import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../../config";
import LoadingScreen from "../components/LoadingScreen";

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    try {
      // Validate input fields
      if (!name || !email || !password) {
        Alert.alert("Error", "Please fill in all fields to sign up.");
        return;
      }

      // Validate email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        Alert.alert("Error", "Please enter a valid email address.");
        return;
      }

      // Validate password strength
      const minLength = 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (
        password.length < minLength ||
        !hasUpperCase ||
        !hasLowerCase ||
        !hasNumbers ||
        !hasSpecialChar
      ) {
        Alert.alert(
          "Error",
          "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters."
        );
        return;
      }

      setIsLoading(true);

      // Send signup request to the server
      const response = await axios.post(`${BASE_URL}/api/users/signup`, {
        name,
        email,
        password,
      });

      setIsLoading(false);

      if (response.data.success) {
        Alert.alert("Congrats", response.data.message);
        navigation.navigate("login");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Sign Up Error:", error);
      // Handle sign up errors (e.g., display error message to the user)
      Alert.alert("Error", "Sign up failed. Please try again.");
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#007bff",
  },
  inputContainer: {
    width: "80%",
    marginBottom: 16,
  },
  label: {
    color: "#333",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  button: {
    width: "80%",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignUpScreen;
