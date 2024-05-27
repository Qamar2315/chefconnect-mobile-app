import React, { useContext, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { AuthContext } from "../helpers/Auth"; // Import your AuthContext
import { useNavigation } from "@react-navigation/native";

const LogoutScreen = () => {
  const { logoutUser } = useContext(AuthContext); // Get the logout function from the AuthContext
  const navigation = useNavigation();

  useEffect(() => {
    // Call the logout function after 1 second
    const timeout = setTimeout(async () => {
      await logoutUser();
      console.log("Logged out");
      navigation.navigate("login"); // Redirect to the login screen after logout
    }, 1000);

    // Clear the timeout if the component unmounts before it expires
    return () => clearTimeout(timeout);
  }, [logoutUser, navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Logging out...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: "#333",
  },
});

export default LogoutScreen;
