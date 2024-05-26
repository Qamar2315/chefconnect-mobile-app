import React, { useContext, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { AuthContext } from "../helpers/Auth"; // Import your AuthContext

const LogoutScreen = () => {
  const { logout } = useContext(AuthContext); // Get the logout function from the AuthContext

  useEffect(() => {
    // Call the logout function when the component mounts
    const performLogout = async () => {
      await logout();
    };
    performLogout();
  }, [logout]);

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
