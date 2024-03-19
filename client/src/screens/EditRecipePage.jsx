import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditRecipeScreen = ({ recipe }) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [ingredients, setIngredients] = useState(recipe.ingredients.join('\n'));
  const [instructions, setInstructions] = useState(recipe.instructions.join('\n'));
  const [cookingTime, setCookingTime] = useState(recipe.cookingTime.toString());
  const [servings, setServings] = useState(recipe.servings.toString());
  const [category, setCategory] = useState(recipe.category);
  const [tags, setTags] = useState(recipe.tags.join(', '));

  const handleEditRecipe = () => {
    // Check if any of the required fields is empty
    if (!title || !description || !ingredients || !instructions || !cookingTime || !servings || !category || !tags) {
      Alert.alert('Error', 'Please fill in all fields to edit the recipe.');
      return;
    }

    // Here you can send the edited recipe data to your backend or perform any other actions
    console.log('Edited Recipe:', { title, description, ingredients, instructions, cookingTime, servings, category, tags });
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
      <Text className="text-lg font-bold mb-2">Edit Recipe</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-2 mb-2"
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        className="border border-gray-300 rounded-lg p-2 mb-2"
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        className="border border-gray-300 rounded-lg p-2 mb-2 h-40"
        placeholder="Ingredients (one per line)"
        multiline={true}
        value={ingredients}
        onChangeText={setIngredients}
      />
      <TextInput
        className="border border-gray-300 rounded-lg p-2 mb-2 h-40"
        placeholder="Instructions (one per line)"
        multiline={true}
        value={instructions}
        onChangeText={setInstructions}
      />
      <TextInput
        className="border border-gray-300 rounded-lg p-2 mb-2"
        placeholder="Cooking Time (mins)"
        keyboardType="numeric"
        value={cookingTime}
        onChangeText={setCookingTime}
      />
      <TextInput
        className="border border-gray-300 rounded-lg p-2 mb-2"
        placeholder="Servings"
        keyboardType="numeric"
        value={servings}
        onChangeText={setServings}
      />
      <TextInput
        className="border border-gray-300 rounded-lg p-2 mb-2"
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        className="border border-gray-300 rounded-lg p-2 mb-2"
        placeholder="Tags (comma separated)"
        value={tags}
        onChangeText={setTags}
      />
      <TouchableOpacity
        className="bg-blue-500 rounded-lg p-2 mt-4"
        onPress={handleEditRecipe}
      >
        <Text className="text-white">Edit Recipe</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditRecipeScreen;
