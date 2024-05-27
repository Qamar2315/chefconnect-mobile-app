import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../helpers/Auth";
import { BASE_URL } from "../../config";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import LoadingScreen from "../components/LoadingScreen";

const ProfileScreen = () => {
  const route = useRoute();
  const { userSession, isLoading, setIsLoading } = useContext(AuthContext);
  const navigation = useNavigation();
  const { userId } = route.params;
  const isFocused = useIsFocused();

  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/users/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userSession.token}`,
          },
        });
        setUserProfile(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
        Alert.alert("Error", "Failed to fetch user data. Please try again.");
      }
    };

    fetchUserData();
  }, [userId, isFocused]);

  const handleDeleteRecipe = async (recipeId) => {
    setIsLoading(true);
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this recipe?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await axios.delete(`${BASE_URL}/api/recipes/${recipeId}`, {
                headers: {
                  Authorization: `Bearer ${userSession.token}`,
                },
              });
              if (response.data.success) {
                Alert.alert("Success", response.data.message);
                setIsLoading(false);
                navigation.navigate("home");
              } else {
                setIsLoading(false);
                Alert.alert("Error", response.data.message);
              }
            } catch (error) {
              console.error("Delete Recipe Error:", error);
              setIsLoading(false);
              Alert.alert("Error", "Failed to delete recipe. Please try again.");
            }
          },
        },
      ]
    );
  };

  const handleViewRecipe = (recipeId) => {
    navigation.navigate("view-recipe", { recipeId });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.heading}>Profile</Text>
        <Text style={styles.text}>Name: {userProfile?.name}</Text>
        <Text style={styles.text}>Email: {userProfile?.email}</Text>
      </View>

      {userSession?._id === userId && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("update-password", { userId })}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("update-profile", { userId })}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.recipesContainer}>
        <Text style={styles.heading}>My Recipes</Text>
        {userProfile?.recipes.map((recipe) => (
          <View key={recipe._id} style={styles.recipeItem}>
            <TouchableOpacity onPress={() => handleViewRecipe(recipe._id)}>
              <Text style={styles.recipeTitle}>{recipe.title}</Text>
              <Text style={styles.recipeDescription}>{recipe.description}</Text>
            </TouchableOpacity>
            {recipe?.author === userSession?._id && (
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteRecipe(recipe._id)}>
                <Text style={styles.deleteButtonText}>Delete Recipe</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  recipesContainer: {
    marginBottom: 20,
  },
  recipeItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    padding: 10,
    borderRadius: 5,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  recipeDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    alignSelf: "flex-end",
  },
  deleteButtonText: {
    color: "#FFF",
  },
});

export default ProfileScreen;
