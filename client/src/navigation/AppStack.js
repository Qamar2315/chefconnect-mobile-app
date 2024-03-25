import React from 'react';

// Importing Stack Navigator
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importing Screens
import HomeScreen from '../screens/HomeScreen';
import ViewRecipeScreen from '../screens/ViewRecipeScreen';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import UpdateRecipeScreen from '../screens/UpdateRecipeScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ViewProfileScreen from '../screens/ViewProfileScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';

const AppStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="view-recipe" component={ViewRecipeScreen} />
            <Stack.Screen name="add-recipe" component={AddRecipeScreen} />
            <Stack.Screen name="update-recipe" component={UpdateRecipeScreen} />
            <Stack.Screen name="update-password" component={ChangePasswordScreen} />
            <Stack.Screen name="profile" component={ViewProfileScreen} />
            <Stack.Screen name="update-profile" component={UpdateProfileScreen} />
        </Stack.Navigator>
    );
};

export default AppStack;