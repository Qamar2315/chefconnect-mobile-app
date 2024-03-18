import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddRecipeScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servings, setServings] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');

  const handleAddRecipe = () => {
    // Here you can send the recipe data to your backend or perform any other actions
    console.log('Add Recipe:', { title, description, ingredients, instructions, cookingTime, servings, category, tags });
    // Reset the form after submission
    setTitle('');
    setDescription('');
    setIngredients('');
    setInstructions('');
    setCookingTime('');
    setServings('');
    setCategory('');
    setTags('');
    // Navigate to a different screen if needed
    navigation.navigate('Home');
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">Add New Recipe</Text>
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
      />
      <TextInput
        className="border border-gray-300 rounded-lg p-2 mb-2"
        placeholder="Cooking Time (mins)"
        value={cookingTime}
        onChangeText={text => setCookingTime(text)}
      />
      <TextInput
        className="border border-gray-300 rounded-lg p-2 mb-2"
        placeholder="Servings"
        value={servings}
        onChangeText={text => setServings(text)}
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
        onPress={handleAddRecipe}
      >
        <Text className="text-white text-center">Add Recipe</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddRecipeScreen;
