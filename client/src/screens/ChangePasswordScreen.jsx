import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { AuthContext } from '../helpers/Auth';
import LoadingScreen from '../components/LoadingScreen';

const ChangePasswordScreen = () => {
  const route = useRoute();
  const { userId } = route.params;

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { userSession, isLoading, setIsLoading } = useContext(AuthContext);
  
  const handleChangePassword = async () => {
    try {
      if (oldPassword === '' || newPassword === '') {
        Alert.alert('Error', 'Please fill in both old and new password.');
      } else {
        setIsLoading(true);
        // Send PUT request to update password
        const response = await axios.put(`${BASE_URL}/api/users/${userId}/update-password`, {
          oldPassword,
          newPassword,
        },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userSession.token}`, // Authorization Token
            }
          }
        );

        if (response.data.success) {
          Alert.alert('Success', 'Password updated successfully.');
          setOldPassword('');
          setNewPassword('');
          setIsLoading(false);
        } else {
          Alert.alert('Error', response.data.message); // Display error message from API response
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('Error', 'An error occurred while updating password.');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Old Password"
        value={oldPassword}
        onChangeText={text => setOldPassword(text)}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        onChangeText={text => setNewPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleChangePassword}
      >
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;
