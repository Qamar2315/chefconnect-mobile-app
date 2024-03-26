import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
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
    <View className="flex-1 p-4">
      <Text className="text-xl font-bold mb-4">Change Password</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-2 mb-2"
        placeholder="Old Password"
        value={oldPassword}
        onChangeText={text => setOldPassword(text)}
        secureTextEntry={true}
      />
      <TextInput
        className="border border-gray-300 rounded-lg p-2 mb-4"
        placeholder="New Password"
        value={newPassword}
        onChangeText={text => setNewPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity
        className="bg-blue-500 rounded-lg p-2"
        onPress={handleChangePassword}
      >
        <Text className="text-white">Update Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordScreen;
