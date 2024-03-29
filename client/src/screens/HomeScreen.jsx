import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import Axios for API requests
import { AuthContext } from '../helpers/Auth';
import { BASE_URL } from '../../config';
import { useIsFocused } from '@react-navigation/native';
import LoadingScreen from '../components/LoadingScreen';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const { userSession, logoutUser, isLoading, setIsLoading } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const isFocused = useIsFocused();
  const [showSideTab, setShowSideTab] = useState(false);

  const fetchRecipes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/api/recipes`); // Adjust URL based on your API
      if (response.data.success) {
        setRecipes(response.data.data); // Assuming your API returns an array of recipes
        setIsLoading(false);
      } else {
        Alert.alert('Error', response.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      // Handle error as needed (e.g., show error message to the user)
      setIsLoading(false);

    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [userSession, isFocused]); // Trigger effect when userSession changes or screen is focused

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

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <View className="flex-1">
      {!!userSession ? (
        <View className='p-4 flex flex-row justify-end'>
          <TouchableOpacity onPress={() => setShowSideTab(!showSideTab)}>
            <Image source={require('../../assets/icons/profile.png')} style={{ width: 30, height: 30, borderRadius: 15 }} />
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
      )
      }

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
      <TouchableOpacity
        className="bg-blue-500 rounded-full w-16 h-16 items-center justify-center absolute bottom-8 right-8"
        onPress={() => { navigation.navigate('add-recipe') }}
      >
        <Text className="text-white text-xl">+</Text>
      </TouchableOpacity>
      {/* Side tab */}
      {showSideTab && (
        <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, backgroundColor: '#fff', width: 200, padding: 20 }}>
          {userSession && (
            <>
              <TouchableOpacity onPress={() => navigation.navigate('profile', { userId: userSession._id })}>
                <Text>View Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text></Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout}>

                <Text>Logout {userSession.name}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
