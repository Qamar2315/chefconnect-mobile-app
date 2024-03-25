import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useContext, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../helpers/Auth';
import axios from 'axios';
import { BASE_URL } from '../../config';
import LoginMessage from '../components/LoginMessage';
import { useIsFocused } from '@react-navigation/native';

const ViewRecipeScreen = () => {
    const route = useRoute();
    const { recipeId } = route.params;
    const navigation = useNavigation();
    const { userSession } = useContext(AuthContext);
    const [recipe, setRecipe] = useState(null);
    const isFocused = useIsFocused();
    const [rating, setRating] = useState('0');
    const [description, setDescription] = useState('');

    const handleDeleteReview = async (index) => {
        try {
            // Get the ID of the review to be deleted based on its index in the reviews array
            const reviewIdToDelete = recipe.reviews[index]._id;

            // Send a DELETE request to your backend API to delete the review
            const response = await axios.delete(
                `${BASE_URL}/api/recipes/${recipeId}/reviews/${reviewIdToDelete}`,
                {
                    headers: {
                        Authorization: `Bearer ${userSession.token}`, // Assuming userSession.token contains the JWT token
                    },
                }
            );
            // console.log('Add Review Response:', response.data);
            if (response.data.success) {
                // Create a copy of the current reviews array
                const updatedReviews = [...recipe.reviews];
                // Remove the review at the specified index
                updatedReviews.splice(index, 1);
                // Update the recipe state with the updated reviews array
                setRecipe({ ...recipe, reviews: updatedReviews });
                Alert.alert("Congrats", response.data.message)
            } else {
                Alert.alert("Error", response.data.message)
            }
        } catch (error) {
            console.error('Delete Review Error:', error);
            // Handle errors such as displaying an error message to the user
        }
    };

    const handleAddReview = async () => {
        // Add the new review to the local state first
        const newReview = { rating, description, author: { _id: userSession._id, name: userSession.name } }; // Update author ID based on your authentication
        const updatedReviews = [...recipe.reviews, newReview];
        setRecipe({ ...recipe, reviews: updatedReviews });
        try {
            const response = await axios.post(
                `${BASE_URL}/api/recipes/${recipeId}/reviews`,
                {
                    rating,
                    description
                },
                {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${userSession.token}`,
                    },
                }
            );
            // console.log('Add Review Response:', response.data);
            if (response.data.success) {
                Alert.alert("Congrats", response.data.message)
            } else {
                Alert.alert("Error", response.data.message)
            }
            // Reset review fields
            setRating(0);
            setDescription('');
            // Refresh the recipe details to display the updated review
            // You can implement this part based on your data fetching logic
        } catch (error) {
            console.error('Add Review Error:', error);
        }
    };

    const getRecipe = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/recipes/${recipeId}`);
            if (response.data.success) {
                setRecipe(response.data.data); // Setting recipe we received from backend.
            } else {
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching recipe:', error);
            throw error; // Throw the error for handling in the component
        }
    };

    const handleEditRecipe = () => {
        navigation.navigate('update-recipe', { recipeId });
    };

    const handleDeleteRecipe = async () => {
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

    useEffect(() => {
        // Check if user is logged in
        if (!userSession) {
            navigation.navigate('login'); // Navigate to login if user is not logged in
            return;
        } else {
            getRecipe();
        }
    }, [recipeId, userSession, isFocused]); // Depend on recipeId and userSession changes

    return (
        recipe ?
        <ScrollView className="flex-1 p-4">
            <Text className="text-2xl font-bold mb-4">{recipe.title}</Text>
            <Text className="text-lg mb-2">{recipe.description}</Text>
            <Text className="text-lg font-bold mb-2">Ingredients:</Text>
            {recipe.ingredients.map((ingredient, index) => (
                <Text key={index} className="mb-1">{ingredient}</Text>
            ))}
            <Text className="text-lg font-bold mb-2">Instructions:</Text>
            {recipe.instructions.map((instruction, index) => (
                <Text key={index} className="mb-1">{instruction}</Text>
            ))}
            <Text className="text-lg font-bold mb-2">Cooking Time:</Text>
            <Text>{recipe.cookingTime} mins</Text>
            <Text className="text-lg font-bold mb-2">Servings:</Text>
            <Text>{recipe.servings} servings</Text>
            <Text className="text-lg font-bold mb-2">Author:</Text>
            <Text>{recipe.author.name}</Text>
            <Text className="text-lg font-bold mb-2">Category:</Text>
            <Text>{recipe.category}</Text>
            <Text className="text-lg font-bold mb-2">Tags:</Text>
            {recipe.tags.map((tag, index) => (
                <Text key={index} className="mb-1">{tag}</Text>
            ))}
            {
                userSession?._id === recipe.author._id &&
                <View className="flex-row justify-between px-4 pt-4">
                    <TouchableOpacity
                        className="bg-blue-500 rounded-lg p-2"
                        onPress={handleEditRecipe}
                    >
                        <Text className="text-white">Edit Recipe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="bg-red-500 rounded-lg p-2"
                        onPress={handleDeleteRecipe}
                    >
                        <Text className="text-white">Delete Recipe</Text>
                    </TouchableOpacity>
                </View>
            }
            {/* Reviews section */}
            {
                recipe?.reviews.length > 0 &&
                <View className="mt-4 border-t border-gray-300 pt-4">
                    <Text className="text-xl font-bold mb-2">Reviews:</Text>
                    {recipe.reviews.map((review, index) => (
                        <View key={index} className="mb-2">
                            <Text>Rating: {review.rating}</Text>
                            <Text>Description: {review.description}</Text>
                            <Text className="text-sm text-slate-800" >By: {review.author.name}</Text>
                            {
                                userSession && userSession._id === review.author._id &&
                                <TouchableOpacity
                                    className="bg-red-500 rounded-lg p-2 mt-1"
                                    onPress={() => handleDeleteReview(index)}
                                >
                                    <Text className="text-white">Delete</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    ))}
                </View>
            }
            <View className="mt-4 border-t border-gray-300 pt-4 mb-10">
                <Text className="text-xl font-bold mb-2">Add Review:</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg p-2 mb-2"
                    placeholder="Rating (1-5)"
                    value={rating}
                    onChangeText={text => setRating(parseInt(text, 10))}
                    keyboardType="numeric"
                />
                <TextInput
                    className="border border-gray-300 rounded-lg p-2 mb-2"
                    placeholder="Review Description"
                    value={description}
                    onChangeText={text => setDescription(text)}
                    multiline
                />
                <TouchableOpacity
                    className="bg-blue-500 rounded-lg p-2"
                    onPress={handleAddReview}
                >
                    <Text className="text-white">Add Review</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>:
        <LoginMessage></LoginMessage>
    );
};

export default ViewRecipeScreen;
