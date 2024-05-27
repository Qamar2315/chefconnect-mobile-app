import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Menu, Text, Provider, ActivityIndicator } from "react-native-paper";

const SuggestAIScreen = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // State for drop-down menus
  const [diet, setDiet] = useState("");
  const [mealType, setMealType] = useState("");
  const [time, setTime] = useState("");
  const [nutritionalGoals, setNutritionalGoals] = useState("");
  const [cuisine, setCuisine] = useState("");

  // State for menu visibility
  const [visibleDiet, setVisibleDiet] = useState(false);
  const [visibleMealType, setVisibleMealType] = useState(false);
  const [visibleTime, setVisibleTime] = useState(false);
  const [visibleNutritionalGoals, setVisibleNutritionalGoals] = useState(false);
  const [visibleCuisine, setVisibleCuisine] = useState(false);

  // Function to handle "Get Suggestions" button press
  const handleAskAI = () => {
    // Check if all options are selected
    if (diet && mealType && time && nutritionalGoals && cuisine) {
      setLoading(true);
      setTimeout(() => {
        console.log(diet, mealType, time, nutritionalGoals, cuisine);
        setResponse("Here are some meal suggestions based on your preferences.");
        setLoading(false);
      }, 2000);
    } else {
      // If any option is not selected, display an alert or error message
      alert("Please select all options before getting suggestions.");
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        {/* Diet */}
        <View style={styles.menuContainer}>
          <Menu
            visible={visibleDiet}
            onDismiss={() => setVisibleDiet(false)}
            anchor={
              <Button onPress={() => setVisibleDiet(true)} mode="outlined">
                {diet ? diet : "Dietary Preferences"}
              </Button>
            }
          >
            <Menu.Item onPress={() => { setDiet("No Restrictions"); setVisibleDiet(false); }} title="No Restrictions" />
            <Menu.Item onPress={() => { setDiet("Vegetarian"); setVisibleDiet(false); }} title="Vegetarian" />
            <Menu.Item onPress={() => { setDiet("Vegan"); setVisibleDiet(false); }} title="Vegan" />
            <Menu.Item onPress={() => { setDiet("Gluten-Free"); setVisibleDiet(false); }} title="Gluten-Free" />
            <Menu.Item onPress={() => { setDiet("Dairy-Free"); setVisibleDiet(false); }} title="Dairy-Free" />
            <Menu.Item onPress={() => { setDiet("Keto"); setVisibleDiet(false); }} title="Keto" />
            <Menu.Item onPress={() => { setDiet("Paleo"); setVisibleDiet(false); }} title="Paleo" />
            <Menu.Item onPress={() => { setDiet("Pescatarian"); setVisibleDiet(false); }} title="Pescatarian" />
            <Menu.Item onPress={() => { setDiet("Kosher"); setVisibleDiet(false); }} title="Kosher" />
            <Menu.Item onPress={() => { setDiet("Halal"); setVisibleDiet(false); }} title="Halal" />
            {/* Other diet options */}
          </Menu>
        </View>

        {/* Meal Type */}
        <View style={styles.menuContainer}>
          <Menu
            visible={visibleMealType}
            onDismiss={() => setVisibleMealType(false)}
            anchor={
              <Button onPress={() => setVisibleMealType(true)} mode="outlined">
                {mealType ? mealType : "Meal Type and Time of Day"}
              </Button>
            }
          >
            <Menu.Item onPress={() => { setMealType("Breakfast"); setVisibleMealType(false); }} title="Breakfast" />
            <Menu.Item onPress={() => { setMealType("Lunch"); setVisibleMealType(false); }} title="Lunch" />
            <Menu.Item onPress={() => { setMealType("Dinner"); setVisibleMealType(false); }} title="Dinner" />
            <Menu.Item onPress={() => { setMealType("Snack"); setVisibleMealType(false); }} title="Snack" />
            <Menu.Item onPress={() => { setMealType("Dessert"); setVisibleMealType(false); }} title="Dessert" />
          </Menu>
        </View>

        {/* Time */}
        <View style={styles.menuContainer}>
          <Menu
            visible={visibleTime}
            onDismiss={() => setVisibleTime(false)}
            anchor={
              <Button onPress={() => setVisibleTime(true)} mode="outlined">
                {time ? time : "Time Available"}
              </Button>
            }
          >
            <Menu.Item onPress={() => { setTime("Under 15 Minutes"); setVisibleTime(false); }} title="Under 15 Minutes" />
            <Menu.Item onPress={() => { setTime("15-30 Minutes"); setVisibleTime(false); }} title="15-30 Minutes" />
            <Menu.Item onPress={() => { setTime("30-60 Minutes"); setVisibleTime(false); }} title="30-60 Minutes" />
            <Menu.Item onPress={() => { setTime("Over 60 Minutes"); setVisibleTime(false); }} title="Over 60 Minutes" />
          </Menu>
        </View>

        {/* Nutritional Goals */}
        <View style={styles.menuContainer}>
          <Menu
            visible={visibleNutritionalGoals}
            onDismiss={() => setVisibleNutritionalGoals(false)}
            anchor={
              <Button onPress={() => setVisibleNutritionalGoals(true)} mode="outlined">
                {nutritionalGoals ? nutritionalGoals : "Nutritional Goals"}
              </Button>
            }
          >
            <Menu.Item onPress={() => { setNutritionalGoals("Balanced Diet"); setVisibleNutritionalGoals(false); }} title="Balanced Diet" />
            <Menu.Item onPress={() => { setNutritionalGoals("Low-Calorie"); setVisibleNutritionalGoals(false); }} title="Low-Calorie" />
            <Menu.Item onPress={() => { setNutritionalGoals("High-Protein"); setVisibleNutritionalGoals(false); }} title="High-Protein" />
            <Menu.Item onPress={() => { setNutritionalGoals("Low-Carb"); setVisibleNutritionalGoals(false); }} title="Low-Carb" />
            <Menu.Item onPress={() => { setNutritionalGoals("Heart-Healthy"); setVisibleNutritionalGoals(false); }} title="Heart-Healthy" />
            <Menu.Item onPress={() => { setNutritionalGoals("Diabetes-Friendly"); setVisibleNutritionalGoals(false); }} title="Diabetes-Friendly" />
            <Menu.Item onPress={() => { setNutritionalGoals("Custom"); setVisibleNutritionalGoals(false); }} title="Custom (Specify)" />
          </Menu>
        </View>

        {/* Cuisine */}
        <View style={styles.menuContainer}>
          <Menu
            visible={visibleCuisine}
            onDismiss={() => setVisibleCuisine(false)}
            anchor={
              <Button onPress={() => setVisibleCuisine(true)} mode="outlined">
                {cuisine ? cuisine : "Cuisine Preference"}
              </Button>
            }
          >
            <Menu.Item onPress={() => { setCuisine("No Preference"); setVisibleCuisine(false); }} title="No Preference" />
            <Menu.Item onPress={() => { setCuisine("Italian"); setVisibleCuisine(false); }} title="Italian" />
            <Menu.Item onPress={() => { setCuisine("Chinese"); setVisibleCuisine(false); }} title="Chinese" />
            <Menu.Item onPress={() => { setCuisine("Mexican"); setVisibleCuisine(false); }} title="Mexican" />
            <Menu.Item onPress={() => { setCuisine("Indian"); setVisibleCuisine(false); }} title="Indian" />
            <Menu.Item onPress={() => { setCuisine("Mediterranean"); setVisibleCuisine(false); }} title="Mediterranean" />
            <Menu.Item onPress={() => { setCuisine("American"); setVisibleCuisine(false); }} title="American" />
            <Menu.Item onPress={() => { setCuisine("Thai"); setVisibleCuisine(false); }} title="Thai" />
            <Menu.Item onPress={() => { setCuisine("Japanese"); setVisibleCuisine(false); }} title="Japanese" />
            <Menu.Item onPress={() => { setCuisine("Custom"); setVisibleCuisine(false); }} title="Custom (Specify)" />
          </Menu>
        </View>

        {/* Get Suggestions Button */}
        <Button mode="contained" onPress={handleAskAI} style={styles.button}>
          Get Suggestions
        </Button>

        {/* Loading Indicator */}
        {loading && <ActivityIndicator animating={true} size="large" style={styles.loading} />}

        {/* AI Response */}
        {response !== "" && !loading && (
          <View style={styles.responseContainer}>
            <Text style={styles.responseText}>AI Response:</Text>
            <Text style={styles.response}>{response}</Text>
          </View>
        )}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  menuContainer: {
    marginVertical: 10,
    width: "80%",
  },
  button: {
    marginTop: 20,
    width: "80%",
  },
  loading: {
    marginTop: 20,
  },
  responseContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  responseText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  response: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default SuggestAIScreen;
