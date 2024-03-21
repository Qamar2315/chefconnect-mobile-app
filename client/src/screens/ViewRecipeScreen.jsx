import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useContext, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../helpers/Auth';
import axios  from 'axios';
import { BASE_URL } from '../../config';

const ViewRecipeScreen = () => {

    const route = useRoute();
    const { recipeId } = route.params;
    const navigation = useNavigation();
    const { userSession } = useContext(AuthContext);
    const [recipe, setRecipe] = useState(null);
    const [reviews, setReviews] = useState(null);

    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');

    const handleDeleteReview = (index) => {
        const updatedReviews = [...reviews];
        updatedReviews.splice(index, 1);
        setReviews(updatedReviews);
        // You can send an API request to delete the review from the backend as well
    };

    const handleAddReview = async () => {
        try {
            // Send a POST request to your backend API to add the review
            const response = await axios.post('YOUR_BACKEND_URL/add-review', {
                recipeId: recipe._id,
                rating,
                description,
                // Add author ID based on your authentication
            });
            console.log('Add Review Response:', response.data);
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
            if(response.data.success){
                setRecipe(response.data.data); // Assuming your API returns the recipe data in the response
                console.log(response.data.data);
            }else{
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching recipe:', error);
            throw error; // Throw the error for handling in the component
        }
    };

    useEffect( () => {
        // Check if user is logged in
        if (!userSession) {
            navigation.navigate('login'); // Navigate to login if user is not logged in
            return;
        }else{
            getRecipe();
        }
    }, [recipeId, userSession]); // Depend on recipeId and userSession changes

    return (
        recipe &&
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
            <Text>{recipe.author}</Text>
            <Text className="text-lg font-bold mb-2">Category:</Text>
            <Text>{recipe.category}</Text>
            <Text className="text-lg font-bold mb-2">Tags:</Text>
            {recipe.tags.map((tag, index) => (
                <Text key={index} className="mb-1">{tag}</Text>
            ))}
            <TouchableOpacity
                className="bg-blue-500 rounded-lg p-2 mt-4"
                onPress={() => navigation.navigate('Home')} // Navigate to Home screen
            >
                <Text className="text-white">Back to Home</Text>
            </TouchableOpacity>
            {/* Reviews section */}
            <View className="mt-4 border-t border-gray-300 pt-4">
                <Text className="text-xl font-bold mb-2">Reviews:</Text>
                {reviews.map((review, index) => (
                    <View key={index} className="mb-2">
                        <Text>Rating: {review.rating}</Text>
                        <Text>Description: {review.description}</Text>
                        <TouchableOpacity
                            className="bg-red-500 rounded-lg p-2 mt-1"
                            onPress={() => handleDeleteReview(index)}
                        >
                            <Text className="text-white">Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
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
        </ScrollView>
    );
};

export default ViewRecipeScreen;
