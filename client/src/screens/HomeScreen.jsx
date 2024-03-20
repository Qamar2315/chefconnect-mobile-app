import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { recipes } from '../../test';
import { AuthContext } from '../helpers/Auth';
import LoadingScreen from './LoadingScreen';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const { userSession, logoutUser, isLoading } = useContext(AuthContext);

  const handlePressButtton = (_id) => {
    navigation.navigate('view-recipe', { recipeId: _id });
  }
  
  const renderRecipeCard = ({ item }) => (
    <TouchableOpacity className="bg-white rounded-lg shadow-md p-4 m-2"
      onPress={() => { handlePressButtton(item._id) }}>
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
  }
  // console.log(userSession);
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
