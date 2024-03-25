import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { AuthContext } from '../helpers/Auth';
import LoadingScreen from '../components/LoadingScreen';
import { useNavigation } from '@react-navigation/native';

const UpdateProfileScreen = () => {
  const route = useRoute();
  const { userId } = route.params;
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { userSession, isLoading, setIsLoading } = useContext(AuthContext);

  const handleUpdateProfile = async () => {
    try {
      if (name === '' || email === '') {
        Alert.alert('Error', 'Please fill in both name and email.');
      } else {
        // Send PUT request to update profile
        const response = await axios.put(`${BASE_URL}/api/users/${userId}`, {
          name,
          email,
        },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userSession.token}`, // Include authorization token if needed
            }
          }
        );

        if (response.data.success) {
          Alert.alert('Success', 'Profile updated successfully.');
          setName('');
          setEmail('');
          navigation.navigate('profile', { userId: userId })
        } else {
          Alert.alert('Error', response.data.message); // Display error message from API response
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'An error occurred while updating profile.');
    }
  };
  useEffect(() => {
    // Function to fetch user data based on userId
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/users/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userSession.token}`, // Authorization
          },
        });
        setName(response.data.data.name);
        setEmail(response.data.data.email)
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
        // Handle error as needed (e.g., show error message to the user)
      }
    };

    fetchUserData(); // Call the fetchUserData function when the component mounts
  }, [userId]); // Fetch data when userId changes
  if (isLoading) {
    return <LoadingScreen />; // You can create a loading spinner or message component
  }
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
