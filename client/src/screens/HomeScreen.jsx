import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios"; // Import Axios for API requests
import { AuthContext } from "../helpers/Auth";
import { BASE_URL } from "../../config";
import { useIsFocused } from "@react-navigation/native";
import LoadingScreen from "../components/LoadingScreen";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const { userSession, logoutUser, isLoading, setIsLoading } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const isFocused = useIsFocused();

  const fetchRecipes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/api/recipes`); // Adjust URL based on your API
      if (response.data.success) {
        setRecipes(response.data.data); // Assuming your API returns an array of recipes
        setIsLoading(false);
      } else {
        Alert.alert("Error", response.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      // Handle error as needed (e.g., show error message to the user)
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [userSession, isFocused]); // Trigger effect when userSession changes or screen is focused

  const handlePressButton = (_id) => {
    navigation.navigate("view-recipe", { recipeId: _id });
  };

  const renderRecipeCard = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => handlePressButton(item._id)}
    >
      <View style={styles.recipeContent}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <Text style={styles.recipeDescription}>{item.description}</Text>
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeTime}>{item.cookingTime} mins</Text>
          <Text style={styles.recipeServings}>{item.servings} servings</Text>
          <Text style={styles.recipeCategory}>{item.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    logoutUser();
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search recipes"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item._id}
        renderItem={renderRecipeCard}
        numColumns={1} // Display one item per row (list layout)
        contentContainerStyle={styles.recipeList}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate("add-recipe");
        }}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  recipeList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  recipeCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 4,
    padding: 16,
  },
  recipeContent: {
    alignItems: "center",
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  recipeDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  recipeDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recipeTime: {
    fontSize: 12,
  },
  recipeServings: {
    fontSize: 12,
  },
  recipeCategory: {
    fontSize: 12,
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#007bff",
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default HomeScreen;
