import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { recipes } from '../../test'; // Import your recipe data or API call

const ProfileScreen = () => {
    const navigation = useNavigation();
    const userProfile = {
        name: 'John Doe',
        email: 'johndoe@example.com',
    };
    const userRecipes = recipes;

    const handleDeleteRecipe = (recipeId) => {
        // Implement your delete recipe logic here
        Alert.alert('Delete Recipe', 'Are you sure you want to delete this recipe?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', onPress: () => console.log('Delete recipe with ID:', recipeId) },
        ]);
    };

    const handleViewRecipe = (recipeId) => {
        // Navigate to ViewRecipe screen with the selected recipe ID
        navigation.navigate('ViewRecipe', { recipeId });
    };

    return (
        <ScrollView className="flex-1 p-4">
            <View className="mt-4">
                <Text className="text-xl font-bold mb-2">Profile</Text>
                <Text>Name: {userProfile.name}</Text>
                <Text>Email: {userProfile.email}</Text>
            </View>

            <TouchableOpacity
                className="bg-green-500 rounded-lg p-2 mt-4"
                onPress={() => navigation.navigate('change-password')}
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
                {userRecipes.map(recipe => (
                    <View key={recipe._id} className="mb-4">
                        <Text className="text-lg font-bold">{recipe.title}</Text>
                        <Text className="text-sm">{recipe.description}</Text>
                        <Text className="text-sm font-thin">{recipe.author}</Text>

                        <TouchableOpacity
                            className="bg-red-500 rounded-sm p-2 mt-1"
                            onPress={() => handleDeleteRecipe(recipe._id)}
                        >
                            <Text className="text-white">Delete Recipe</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

        </ScrollView>
    );
};

export default ProfileScreen;
