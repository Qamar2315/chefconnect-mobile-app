import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AppStack from "./AppStack";
import LogoutScreen from "../screens/LogoutScreen";
import AskAIScreen from "../screens/AskAI";
import ViewProfileScreen from "../screens/ViewProfileScreen";
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
      <Drawer.Screen name="Ask AI" component={AskAIScreen} />
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
