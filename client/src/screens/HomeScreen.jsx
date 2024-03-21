import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import Axios for API requests
import { AuthContext } from '../helpers/Auth';
import LoadingScreen from './LoadingScreen';
import { BASE_URL } from '../../config';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const { userSession, logoutUser, isLoading } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/recipes`); // Adjust URL based on your API
      if(response.data.success){
        setRecipes(response.data.data); // Assuming your API returns an array of recipes
      }else{
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      // Handle error as needed (e.g., show error message to the user)
    }
  };

  useEffect(() => {
    if (!userSession) {
      navigation.navigate('login');
    } else {
      // Fetch all recipes from the API
      fetchRecipes();
    }
  }, [userSession]); // Trigger effect when userSession changes

  const handlePressButton = (_id) => {
    navigation.navigate('view-recipe', { recipeId: _id });
  };

  const renderRecipeCard = ({ item }) => (
    <TouchableOpacity
      className="bg-white rounded-lg shadow-md p-4 m-2"
      onPress={() => handlePressButton(item._id)}
    >
      <View className="flex items-center">
        <Text className="text-lg font-bold">{item.title}</Text>
        <Text className="text-sm">{item.description}</Text>
        <View className="flex-row items-center mt-2">
          <Text className="text-sm ml-1">{item.cookingTime} mins</Text>
        </View>
        <Text className="text-sm mt-1">{item.servings} servings</Text>
        <Text className="text-sm mt-1">{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    logoutUser();
  };
  return (
    <>
      {
        isLoading ?
          <LoadingScreen></LoadingScreen>
          :
          <View className="flex-1">
            {!!userSession ? (
              <View className="flex-row items-center justify-between px-4 py-2">
                <Text className="text-lg font-bold">Welcome Back {userSession.name} </Text>
                <Image source={require('../../assets/icons/profile.png')} className="w-8 h-8 rounded-full" />
                <TouchableOpacity className="bg-red-500 rounded-lg p-2" onPress={handleLogout}>
                  <Text className="text-white">Logout</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="flex-row justify-between px-4 py-2">
                <TouchableOpacity className="bg-blue-500 rounded-lg p-2" onPress={() => navigation.navigate('login')}>
                  <Text className="text-white">Login</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-green-500 rounded-lg p-2" onPress={() => navigation.navigate('signup')}>
                  <Text className="text-white">Sign Up</Text>
                </TouchableOpacity>
              </View>
            )}

            <TextInput
              className="border border-gray-300 rounded-lg p-2 mx-4 my-2"
              placeholder="Search recipes"
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />

            <FlatList
              data={filteredRecipes}
              keyExtractor={(item) => item._id}
              renderItem={renderRecipeCard}
              numColumns={1} // Display one item per row (list layout)
              contentContainerClassName="p-4"
            />
          </View>
      }
    </>
  );
};

export default HomeScreen;
