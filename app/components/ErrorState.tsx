import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

const ErrorState = React.memo(({ message, onRetry }: ErrorStateProps) => (
  <View className="flex-1 items-center justify-center bg-background p-4">
    <MaterialCommunityIcons name="alert-circle-outline" size={64} color="#EF4444" />
    <Text className="text-red-500 text-lg mt-4 text-center">{message}</Text>
    {onRetry && (
      <TouchableOpacity 
        onPress={onRetry}
        className="mt-4 bg-blue-500 px-6 py-3 rounded-lg flex-row items-center"
      >
        <MaterialCommunityIcons name="refresh" size={20} color="white" />
        <Text className="text-white text-lg ml-2">Reintentar</Text>
      </TouchableOpacity>
    )}
  </View>
));

ErrorState.displayName = 'ErrorState';

export default ErrorState; 
