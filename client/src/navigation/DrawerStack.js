import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AppStack from "./AppStack";
import LogoutScreen from "../screens/LogoutScreen";
import AskAIScreen from "../screens/AskAI";
import ViewProfileScreen from "../screens/ViewProfileScreen";
import { AuthContext } from "../helpers/Auth"; // Import AuthContext

const Drawer = createDrawerNavigator();
const DrawerStack = () => {
  const { userSession } = useContext(AuthContext); // Get userSession from AuthContext

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={AppStack} />
      <Drawer.Screen
        name="View Profile"
        component={ViewProfileScreen}
        initialParams={{ userId: userSession.id }} // Pass userSession as initialParams
      />
      <Drawer.Screen name="Ask AI" component={AskAIScreen} />
      <Drawer.Screen
        name="Logout"
        component={LogoutScreen} // Replace with your logout button component
        options={{
          gestureEnabled: false, // Disable swipe gesture for logout screen
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
