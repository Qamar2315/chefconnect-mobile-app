import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { recipes } from '../../test'; // Import your recipe data or API call
import { useState } from 'react';

const ViewRecipeScreen = () => {
    const navigation = useNavigation();
    const [recipe, setRecipe] = useState(recipes.find(item => item._id === "65ef197bba7ae0d7cf2adc48"));
    const [reviews, setReviews] = useState(recipe.reviews || [{rating:"5",description:"good",author:"Qamar"}]);

    const handleDeleteReview = (index) => {
        const updatedReviews = [...reviews];
        updatedReviews.splice(index, 1);
        setReviews(updatedReviews);
        // You can send an API request to delete the review from the backend as well
    };
    if (!recipe) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-lg text-red-500">Recipe not found!</Text>
            </View>
        );
    }
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

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
            setError('');
            // Refresh the recipe details to display the updated review
            // You can implement this part based on your data fetching logic
        } catch (error) {
            console.error('Add Review Error:', error);
            setError('Failed to add review. Please try again.');
        }
    };

    return (
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
                {error ? <Text className="text-red-500 mb-2">{error}</Text> : null}
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
