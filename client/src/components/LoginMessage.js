import React from 'react';
import { View, Text } from 'react-native';

const LoginMessage = () => {
  return (
    <View className="flex items-center justify-center h-full">
      <Text className="text-lg text-center text-gray-700">
        Please login to view recipe
      </Text>
    </View>
  );
};

export default LoginMessage;