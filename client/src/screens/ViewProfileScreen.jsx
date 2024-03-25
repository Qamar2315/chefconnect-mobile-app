import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect, useContext } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import { AuthContext } from '../helpers/Auth';
import { BASE_URL } from '../../config';
import axios from 'axios';

const ProfileScreen = () => {
    const route = useRoute();
    const { userSession, isLoading, setIsLoading } = useContext(AuthContext);
    const navigation = useNavigation();
    const { userId } = route.params;

    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        // Function to fetch user data based on userId
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/users/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userSession.token}`, // Include authorization token if needed
                    },
                });
                // Assuming your API returns user data in the response.data
                setUserProfile(response.data.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoading(false);
                // Handle error as needed (e.g., show error message to the user)
            }
        };

        fetchUserData(); // Call the fetchUserData function when the component mounts
    }, [userId]); // Fetch data when userId changes

    const handleDeleteRecipe = async (recipeId) => {
        // Show an alert to confirm before deleting
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this recipe?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            // Send a DELETE request to the backend API
                            const response = await axios.delete(`${BASE_URL}/api/recipes/${recipeId}`, {
                                headers: {
                                    Authorization: `Bearer ${userSession.token}`,
                                },
                            });
                            console.log('Delete Recipe Response:', response.data);
                            if (response.data.success) {
                                Alert.alert("Congrats", response.data.message);
                                navigation.navigate('home');
                            } else {
                                Alert.alert("Error", response.data.message);
                            }
                        } catch (error) {
                            console.error('Delete Recipe Error:', error);
                            // Handle errors such as displaying an error message to the user
                        }
                    },
                },
            ]
        );
    };

    const handleViewRecipe = (recipeId) => {
        // Navigate to ViewRecipe screen with the selected recipe ID
        navigation.navigate('view-recipe', { recipeId });
    };

    if (isLoading) {
        return <LoadingScreen />; // You can create a loading spinner or message component
    }

    return (
        userProfile &&
        <ScrollView className="flex-1 p-4">
            <View className="mt-4">
                <Text className="text-xl font-bold mb-2">Profile</Text>
                <Text>Name: {userProfile.name}</Text>
                <Text>Email: {userProfile.email}</Text>
            </View>

            <TouchableOpacity
                className="bg-green-500 rounded-lg p-2 mt-4"
                onPress={() => navigation.navigate('update-password')}
            >
                <Text className="text-white">Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="bg-green-500 rounded-lg p-2 mt-4"
                onPress={() => navigation.navigate('update-profile')}
            >
                <Text className="text-white">Update Profile</Text>
            </TouchableOpacity>

            <ScrollView className="mt-4">
                <Text className="text-xl font-bold mb-2">My Recipes</Text>
                {userProfile.recipes.map(recipe => (
                    <View key={recipe._id} className="mb-4">
                        <TouchableOpacity onPress={() => { handleViewRecipe(recipe._id) }}>
                            <Text className="text-lg font-bold">{recipe.title}</Text>
                            <Text className="text-sm">{recipe.description}</Text>
                            {
                                recipe?.author === userSession?._id &&
                                <TouchableOpacity
                                    className="bg-red-500 rounded-sm p-2 mt-1"
                                    onPress={() => handleDeleteRecipe(recipe._id)}
                                >
                                    <Text className="text-white">Delete Recipe</Text>
                                </TouchableOpacity>
                            }
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

        </ScrollView>
    );
};

export default ProfileScreen;
