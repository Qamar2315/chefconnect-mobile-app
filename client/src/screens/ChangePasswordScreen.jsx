import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

const ChangePasswordScreen = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = () => {
    // Perform password change logic here (e.g., API call)
    if (oldPassword === '' || newPassword === '') {
      Alert.alert('Error', 'Please fill in both old and new password.');
    } else {
      // Replace this alert with actual logic to update password
      Alert.alert('Success', 'Password updated successfully.');
      setOldPassword('');
      setNewPassword('');
    }
  };

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
