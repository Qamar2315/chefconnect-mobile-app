import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddRecipeScreen from '../screens/AddRecipeScreen';
import ViewRecipeScreen from '../screens/ViewRecipeScreen';
import ViewProfileScreen from '../screens/ViewProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import UpdateRecipeScreen from '../screens/UpdateRecipeScreen';
import HomeScreen from '../screens/HomeScreen';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="loading" component={LoadingScreen} />
            <Stack.Screen name='home' component={HomeScreen} />
            <Stack.Screen name='add-recipe' component={AddRecipeScreen} />
            <Stack.Screen name='view-recipe' component={ViewRecipeScreen} />
            <Stack.Screen name='view-profile' component={ViewProfileScreen} />
            <Stack.Screen name='change-password' component={ChangePasswordScreen} />
            <Stack.Screen name='update-profile' component={UpdateProfileScreen} />
            <Stack.Screen name='update-recipe' component={UpdateRecipeScreen} />
        </Stack.Navigator>
    );
};

export default AppStack;