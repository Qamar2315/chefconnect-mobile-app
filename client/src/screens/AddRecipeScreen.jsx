import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik'; // Import Formik
import * as Yup from 'yup'; // Import Yup for form validation
import { AuthContext } from '../helpers/Auth';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { Alert } from 'react-native';

const AddRecipeScreen = () => {
  const navigation = useNavigation();
  const { userSession } = useContext(AuthContext);


  const handleAddRecipe = async (values) => {
    // Split comma-separated values into arrays
    values.ingredients = values.ingredients.split(',');
    values.instructions = values.instructions.split(',');
    values.tags = values.tags.split(',');

    // Convert string values to integer where needed
    values.cookingTime = parseInt(values.cookingTime);
    values.servings = parseInt(values.servings);

    // Send POST request to server with form data
    const response = await axios.post(`${BASE_URL}/api/recipes`, values, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userSession.token}`, // Include authorization token if needed
      },
    });
    if (response.data.success) {
      Alert.alert("Congrats", response.data.message);
      navigation.navigate('home');
    } else {
      Alert.alert("Error", response.data.message);
    }
  };


  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    ingredients: Yup.string().required('Ingredients are required'),
    instructions: Yup.string().required('Instructions are required'),
    cookingTime: Yup.number().required('Cooking Time is required').positive('Cooking Time must be positive').max(120),
    servings: Yup.number().required('Servings are required').positive('Servings must be positive').min(1).max(10),
    category: Yup.string().required('Category is required'),
    tags: Yup.string().required('Tags are required'),
  });
  
  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        cookingTime: '',
        servings: '',
        category: '',
        tags: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleAddRecipe}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View className="flex-1 p-4">
          <Text className="text-2xl font-bold mb-4">Add New Recipe</Text>
          <TextInput
            placeholder="Title"
            value={values.title}
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
          />
          {touched.title && errors.title && <Text style={{ color: 'red' }}>{errors.title}</Text>}

          <TextInput
            placeholder="Description"
            value={values.description}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
          />
          {touched.description && errors.description && <Text style={{ color: 'red' }}>{errors.description}</Text>}

          <TextInput
            placeholder="Ingredients (comma-separated)"
            value={values.ingredients}
            onChangeText={handleChange('ingredients')}
            onBlur={handleBlur('ingredients')}
          />
          {touched.ingredients && errors.ingredients && <Text style={{ color: 'red' }}>{errors.ingredients}</Text>}

          <TextInput
            placeholder="Instructions (Comma seperated)"
            value={values.instructions}
            onChangeText={handleChange('instructions')}
            onBlur={handleBlur('instructions')}
          />
          {touched.instructions && errors.instructions && <Text style={{ color: 'red' }}>{errors.instructions}</Text>}

          <TextInput
            placeholder="Cooking Time (mins)"
            value={values.cookingTime}
            onChangeText={handleChange('cookingTime')}
            onBlur={handleBlur('cookingTime')}
          />
          {touched.cookingTime && errors.cookingTime && <Text style={{ color: 'red' }}>{errors.cookingTime}</Text>}

          <TextInput
            placeholder="Servings"
            value={values.servings}
            onChangeText={handleChange('servings')}
            onBlur={handleBlur('servings')}
          />
          {touched.servings && errors.servings && <Text style={{ color: 'red' }}>{errors.servings}</Text>}

          <TextInput
            placeholder="Category"
            value={values.category}
            onChangeText={handleChange('category')}
            onBlur={handleBlur('category')}
          />
          {touched.category && errors.category && <Text style={{ color: 'red' }}>{errors.category}</Text>}

          <TextInput
            placeholder="Tags (comma-separated)"
            value={values.tags}
            onChangeText={handleChange('tags')}
            onBlur={handleBlur('tags')}
          />
          {touched.tags && errors.tags && <Text style={{ color: 'red' }}>{errors.tags}</Text>}

          <TouchableOpacity
            className="bg-blue-500 rounded-lg p-2 mt-4"
            onPress={handleSubmit}
          >
            <Text className="text-white text-center">Add Recipe</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default AddRecipeScreen;
