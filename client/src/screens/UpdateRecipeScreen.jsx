import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { recipes } from '../../test'; // Import your recipe data or API call

const UpdateRecipeScreen = ({ route }) => {
    const navigation = useNavigation();
    //   const { recipeData } = route.params;
    const recipeData = recipes[0];
    
    const [title, setTitle] = useState(recipeData.title);
    const [description, setDescription] = useState(recipeData.description);
    const [ingredients, setIngredients] = useState(recipeData.ingredients.join(','));
    const [instructions, setInstructions] = useState(recipeData.instructions.join(','));
    const [cookingTime, setCookingTime] = useState(recipeData.cookingTime.toString());
    const [servings, setServings] = useState(recipeData.servings.toString());
    const [category, setCategory] = useState(recipeData.category);
    const [tags, setTags] = useState(recipeData.tags.join(','));

    const handleUpdateRecipe = () => {
        // Check if any of the required fields is empty
        if (!title || !description || !ingredients || !instructions || !cookingTime || !servings || !category || !tags) {
            Alert.alert('Error', 'Please fill in all fields to update the recipe.');
            return;
        }
        // Here you can send the updated recipe data to your backend or perform any other actions
        console.log('Updated Recipe:', { title, description, ingredients, instructions, cookingTime, servings, category, tags });
        // Navigate back to the previous screen
        navigation.goBack();
    };

    return (
        <View className="flex-1 p-4">
            <Text className="text-2xl font-bold mb-4">Update Recipe</Text>
            <TextInput
                className="border border-gray-300 rounded-lg p-2 mb-2"
                placeholder="Title"
                value={title}
                onChangeText={text => setTitle(text)}
            />
            <TextInput
                className="border border-gray-300 rounded-lg p-2 mb-2"
                placeholder="Description"
                value={description}
                onChangeText={text => setDescription(text)}
            />
            <TextInput
                className="border border-gray-300 rounded-lg p-2 mb-2"
                placeholder="Ingredients (comma-separated)"
                value={ingredients}
                onChangeText={text => setIngredients(text)}
            />
            <TextInput
                className="border border-gray-300 rounded-lg p-2 mb-2"
                placeholder="Instructions"
                value={instructions}
                onChangeText={text => setInstructions(text)}
                multiline={true}
                numberOfLines={4}
            />
            <TextInput
                className="border border-gray-300 rounded-lg p-2 mb-2"
                placeholder="Cooking Time (mins)"
                value={cookingTime}
                onChangeText={text => setCookingTime(text)}
                keyboardType="numeric"
            />
            <TextInput
                className="border border-gray-300 rounded-lg p-2 mb-2"
                placeholder="Servings"
                value={servings}
                onChangeText={text => setServings(text)}
                keyboardType="numeric"
            />
            <TextInput
                className="border border-gray-300 rounded-lg p-2 mb-2"
                placeholder="Category"
                value={category}
                onChangeText={text => setCategory(text)}
            />
            <TextInput
                className="border border-gray-300 rounded-lg p-2 mb-2"
                placeholder="Tags (comma-separated)"
                value={tags}
                onChangeText={text => setTags(text)}
            />
            <TouchableOpacity
                className="bg-blue-500 rounded-lg p-2 mt-4"
                onPress={handleUpdateRecipe}
            >
                <Text className="text-white text-center">Update Recipe</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UpdateRecipeScreen;
