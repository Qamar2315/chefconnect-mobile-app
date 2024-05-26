import React from "react";

// Importing Stack Navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// AuthContext
import { AuthContext } from "../helpers/Auth";

// Importing useContext hook from react
import { useContext } from "react";

// Importing screen Stacks
import AppStack from "../navigation/AppStack";
import AuthStack from "../navigation/AuthStack";
// import DrawerStack from "../navigation/DrawerStack";

export default function App() {
  const { userSession } = useContext(AuthContext);
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="authStack"
      screenOptions={{ headerShown: false }}
    >
      {userSession ? (
        <Stack.Screen name="appStack" component={AppStack} />
      ) : (
        <Stack.Screen name="authStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
