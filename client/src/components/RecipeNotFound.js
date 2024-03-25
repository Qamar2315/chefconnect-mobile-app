import React from 'react';
import { View, Text } from 'react-native';

const RecipeNotFound = () => {
  return (
    <View className="flex items-center justify-center h-full">
      <Text className="text-lg text-center text-gray-700">
        Recipe Not Found
      </Text>
    </View>
  );
};

export default RecipeNotFound;