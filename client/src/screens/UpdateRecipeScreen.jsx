import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../helpers/Auth';
import { BASE_URL } from '../../config';
import RecipeNotFound from '../components/RecipeNotFound';
import { useIsFocused } from '@react-navigation/native';

const UpdateRecipeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userSession } = useContext(AuthContext);
    const [recipe, setRecipe] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        // Fetch recipe data based on route params or any other method
        const fetchRecipe = async () => {
            try {
                const { recipeId } = route.params;
                const response = await axios.get(`${BASE_URL}/api/recipes/${recipeId}`);
                if (response.data.success) {
                    setRecipe(response.data.data); // Assuming your API returns recipe data
                } else {
                    Alert.alert('Error', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching recipe:', error);
                Alert.alert('Error', 'Failed to fetch recipe data.');
            }
        };
        fetchRecipe();
    }, [route.params, isFocused]);

    const handleUpdateRecipe = async (values) => {
        // Split comma-separated values into arrays
        values.ingredients = values.ingredients.split(',');
        values.instructions = values.instructions.split(',');
        values.tags = values.tags.split(',');

        // Convert string values to integer where needed
        values.cookingTime = parseInt(values.cookingTime);
        values.servings = parseInt(values.servings);
        try {
            const response = await axios.put(`${BASE_URL}/api/recipes/${recipe._id}`, values, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userSession.token}`, // Include authorization token if needed
                },
            });
            if (response.data.success) {
                Alert.alert('Success', response.data.message);
                navigation.navigate('view-recipe', { recipeId: recipe._id }); // Go back to the view recipe screen after successful update
            } else {
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            console.error('Update Recipe Error:', error);
            Alert.alert('Error', 'Failed to update recipe.');
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
        recipe ?
            <Formik
                initialValues={{
                    title: recipe ? recipe.title : '',
                    description: recipe ? recipe.description : '',
                    ingredients: recipe ? recipe.ingredients.join(', ') : '',
                    instructions: recipe ? recipe.instructions.join(', ') : '',
                    cookingTime: recipe ? `${recipe.cookingTime}` : '',
                    servings: recipe ? `${recipe.servings}` : '',
                    category: recipe ? recipe.category : '',
                    tags: recipe ? recipe.tags.join(', ') : '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleUpdateRecipe}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={{ flex: 1, padding: 20 }}>
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
                            placeholder="Instructions (comma-separated)"
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
                            keyboardType="numeric" // Set keyboard type to numeric
                        />
                        {touched.cookingTime && errors.cookingTime && <Text style={{ color: 'red' }}>{errors.cookingTime}</Text>}

                        <TextInput
                            placeholder="Servings"
                            value={values.servings}
                            onChangeText={handleChange('servings')}
                            onBlur={handleBlur('servings')}
                            keyboardType="numeric" // Set keyboard type to numeric
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
                            style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 20 }}
                            onPress={handleSubmit}
                        >
                            <Text style={{ color: 'white', textAlign: 'center' }}>Update Recipe</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
            :
            <RecipeNotFound />
    );
};

export default UpdateRecipeScreen;
