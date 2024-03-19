import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

const UpdateProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleUpdateProfile = () => {
    // Perform profile update logic here (e.g., API call)
    if (name === '' || email === '') {
      Alert.alert('Error', 'Please fill in both name and email.');
    } else {
      // Replace this alert with actual logic to update profile
      Alert.alert('Success', 'Profile updated successfully.');
      setName('');
      setEmail('');
    }
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-xl font-bold mb-4">Update Profile</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-2 mb-2"
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        className="border border-gray-300 rounded-lg p-2 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TouchableOpacity
        className="bg-blue-500 rounded-lg p-2"
        onPress={handleUpdateProfile}
      >
        <Text className="text-white">Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateProfileScreen;
