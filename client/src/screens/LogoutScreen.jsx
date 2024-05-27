import React, { useContext, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { AuthContext } from "../helpers/Auth"; // Import your AuthContext
import { useNavigation } from "@react-navigation/native";

const LogoutScreen = () => {
  const { logoutUser } = useContext(AuthContext); // Get the logout function from the AuthContext
  const navigation = useNavigation();

  useEffect(() => {
    // Call the logout function when the component mounts
    const performLogout = async () => {
      await logoutUser();
    };
    performLogout().then(() => {
      console.log("Logged out");
      navigation.navigate("login"); // Redirect to the login screen after logout
    });
  }, [logoutUser]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Logging out...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LogoutScreen;
