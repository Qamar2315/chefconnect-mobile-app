import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AppStack from "./AppStack";
import LogoutScreen from "../screens/LogoutScreen";
import SuggestAIScreen from "../screens/SuggestAIScreen";
import ViewProfileScreen from "../screens/ViewProfileScreen";
import RecognizeFoodScreen from "../screens/FoodRecognition";
import RecognizeProduceScreen from "../screens/FruitVeggieRecognizerScreen";

import { AuthContext } from "../helpers/Auth";
import { useContext } from "react";

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  const { userSession } = useContext(AuthContext);
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={AppStack} />
      <Drawer.Screen
        name="View Profile"
        component={ViewProfileScreen}
        initialParams={{ userId: userSession._id }}
      />
      <Drawer.Screen name="Recipe Recommender" component={SuggestAIScreen} />
      <Drawer.Screen name="Food Snap Recognizer" component={RecognizeFoodScreen} />
      <Drawer.Screen name="Calorie Count AI" component={RecognizeProduceScreen} />
      <Drawer.Screen
        name={`Logout ${userSession.name}`}
        component={LogoutScreen}
        options={{
          gestureEnabled: false, // Disable swipe gesture for logout screen
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
