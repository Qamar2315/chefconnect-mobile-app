import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  const [loadingText, setLoadingText] = useState('Loading...');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingText('Almost there...');
    }, 2000); // Simulating a delay for demonstration

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Background color for the loading screen
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Text color
  },
});

export default LoadingScreen;
