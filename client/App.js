import React from 'react';

// Importing Auth Providor
import { AuthProvider } from './src/helpers/Auth'; // Import your AuthProvider

// Importing Navigation Container
import { NavigationContainer } from '@react-navigation/native';

// Importing Main Component
import Main from './src/components/Main';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Main></Main>
      </NavigationContainer>
    </AuthProvider>
  );
}