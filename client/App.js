import React from 'react';
import { AuthProvider } from './src/helpers/Auth'; // Import your AuthProvider
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Importing Screens
import SignUpScreen  from './src/screens/SignUpScreen'
import LoginScreen from './src/screens/LoginScreen'
import HomeScreen from './src/screens/HomeScreen';
import AddRecipeScreen from './src/screens/AddRecipeScreen';
import UpdateRecipeScreen from './src/screens/UpdateRecipeScreen';
import ViewRecipeScreen from './src/screens/ViewRecipeScreen';
import ViewProfileScreen from './src/screens/ViewProfileScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import UpdateProfileScreen from './src/screens/UpdateProfileScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='update-recipe'>
          <Stack.Screen name='login' component={LoginScreen} />
          <Stack.Screen name='signup' component={SignUpScreen} />
          <Stack.Screen name='home' component={HomeScreen} />
          <Stack.Screen name='add-recipe' component={AddRecipeScreen} />
          <Stack.Screen name='view-recipe' component={ViewRecipeScreen} />
          <Stack.Screen name='view-profile' component={ViewProfileScreen} />
          <Stack.Screen name='change-password' component={ChangePasswordScreen} />
          <Stack.Screen name='update-profile' component={UpdateProfileScreen} />
          <Stack.Screen name='update-recipe' component={UpdateRecipeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
