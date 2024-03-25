import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import { BASE_URL } from '../../config'; // Make sure to import your BASE_URL from config
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [userSession, setUserSession] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const loginUser = async (userData) => {
    setIsLoading(true);
    const { email, password } = userData;
    try {
      const response = await axios.post(`${BASE_URL}/api/users/login`, { email, password });
      if (!response.data.success) {
        Alert.alert('Error', response.data.message);
        setIsLoading(false);
        return false;
      } else {
        // Login successful
        setUserSession(response.data.data);
        AsyncStorage.setItem('userSession', JSON.stringify(response.data.data));
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Login failed. Please try again.');
      setIsLoading(false);
      return false;
    }
  };

  const logoutUser = () => {
    // Logic for logging out the user
    setUserSession(null);
    AsyncStorage.removeItem('userSession');
  };

  const isLoggedIn = async () => {
    try {
      let session = await AsyncStorage.getItem('userSession');
      let userData = JSON.parse(session);
      setUserSession(userData);
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userSession,
        loginUser,
        logoutUser,
        isLoggedIn,
        setIsLoading,
        isLoading
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };