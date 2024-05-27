import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../../config";
import { AuthContext } from "../helpers/Auth";
import { useIsFocused } from "@react-navigation/native";
import LoadingScreen from "../components/LoadingScreen";
import LoginMessage from "../components/LoginMessage";

const ViewRecipeScreen = () => {
  const route = useRoute();
  const { recipeId } = route.params;
  const navigation = useNavigation();
  const { userSession, isLoading, setIsLoading } = useContext(AuthContext);
  const [recipe, setRecipe] = useState(null);
  const isFocused = useIsFocused();
  const [rating, setRating] = useState("0");
  const [description, setDescription] = useState("");

  const handleDeleteReview = async (index) => {
    try {
      const reviewIdToDelete = recipe.reviews[index]._id;
      const response = await axios.delete(
        `${BASE_URL}/api/recipes/${recipeId}/reviews/${reviewIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${userSession.token}`,
          },
        }
      );
      if (response.data.success) {
        const updatedReviews = [...recipe.reviews];
        updatedReviews.splice(index, 1);
        setRecipe({ ...recipe, reviews: updatedReviews });
        Alert.alert("Congrats", response.data.message);
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.error("Delete Review Error:", error);
    }
  };

  const handleAddReview = async () => {
    const newReview = {
      rating,
      description,
      author: { _id: userSession._id, name: userSession.name },
    };
    const updatedReviews = [...recipe.reviews, newReview];
    setRecipe({ ...recipe, reviews: updatedReviews });
    try {
      const response = await axios.post(
        `${BASE_URL}/api/recipes/${recipeId}/reviews`,
        {
          rating,
          description,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userSession.token}`,
          },
        }
      );
      if (response.data.success) {
        Alert.alert("Congrats", response.data.message);
      } else {
        Alert.alert("Error", response.data.message);
      }
      setRating("0");
      setDescription("");
    } catch (error) {
      console.error("Add Review Error:", error);
    }
  };

  const getRecipe = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/recipes/${recipeId}`);
      if (response.data.success) {
        setRecipe(response.data.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setIsLoading(false);
      throw error;
    }
  };

  const handleEditRecipe = () => {
    navigation.navigate("update-recipe", { recipeId });
  };

  const handleDeleteRecipe = async () => {
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
              setIsLoading(true);
              const response = await axios.delete(
                `${BASE_URL}/api/recipes/${recipeId}`,
                {
                  headers: {
                    Authorization: `Bearer ${userSession.token}`,
                  },
                }
              );
              if (response.data.success) {
                Alert.alert("Congrats", response.data.message);
                setIsLoading(false);
                navigation.navigate("home");
              } else {
                setIsLoading(false);
                Alert.alert("Error", response.data.message);
              }
            } catch (error) {
              console.error("Delete Recipe Error:", error);
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    getRecipe();
  }, [recipeId, userSession, isFocused]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return recipe ? (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.description}>{recipe.description}</Text>
      <Text style={styles.subtitle}>Ingredients:</Text>
      {recipe.ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.item}>
          {ingredient}
        </Text>
      ))}
      <Text style={styles.subtitle}>Instructions:</Text>
      {recipe.instructions.map((instruction, index) => (
        <Text key={index} style={styles.item}>
          {instruction}
        </Text>
      ))}
      <Text style={styles.subtitle}>Cooking Time:</Text>
      <Text style={styles.item}>{recipe.cookingTime} mins</Text>
      <Text style={styles.subtitle}>Servings:</Text>
      <Text style={styles.item}>{recipe.servings} servings</Text>
      <Text style={styles.subtitle}>Author:</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("profile", { userId: recipe.author._id });
        }}
      >
        <Text style={styles.item}>{recipe.author.name}</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Category:</Text>
      <Text style={styles.item}>{recipe.category}</Text>
      <Text style={styles.subtitle}>Tags:</Text>
      {recipe.tags.map((tag, index) => (
        <Text key={index} style={styles.item}>
          {tag}
        </Text>
      ))}
      {userSession?._id === recipe.author._id && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleEditRecipe}>
            <Text style={styles.buttonText}>Edit Recipe</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleDeleteRecipe}
          >
            <Text style={styles.buttonText}>Delete Recipe</Text>
          </TouchableOpacity>
        </View>
      )}
      {recipe?.reviews.length > 0 && (
        <View style={styles.reviewsContainer}>
          <Text style={styles.reviewTitle}>Reviews:</Text>
          {recipe.reviews.map((review, index) => (
            <View key={index} style={styles.reviewItem}>
              <Text>Rating: {review.rating}</Text>
              <Text>Description: {review.description}</Text>
              <Text style={styles.authorText}>By: {review.author.name}</Text>
              {userSession && userSession._id === review.author._id && (
                <TouchableOpacity
                  style={styles.deleteReviewButton}
                  onPress={() => handleDeleteReview(index)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      )}
      <View style={styles.addReviewContainer}>
        <Text style={styles.addReviewTitle}>Add Review:</Text>
        <TextInput
          style={styles.input}
          placeholder="Rating (1-5)"
          value={rating}
          onChangeText={(text) => setRating(parseInt(text, 10))}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Review Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddReview}>
          <Text style={styles.buttonText}>Add Review</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  ) : (
    <LoginMessage />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#DC3545",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewsContainer: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
    paddingTop: 16,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  reviewItem: {
    marginBottom: 16,
  },
  authorText: {
    color: "#666666",
    fontSize: 12,
  },
  deleteReviewButton: {
    backgroundColor: "#DC3545",
    padding: 6,
    borderRadius: 4,
    marginTop: 8,
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  addReviewContainer: {
    marginTop: 24,
    paddingBottom:20
  },
  addReviewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
});

export default ViewRecipeScreen;
