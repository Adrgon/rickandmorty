import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface LoadingStateProps {
  message?: string;
}

const LoadingState = React.memo(({ message = 'Cargando...' }: LoadingStateProps) => (
  <View className="flex-1 items-center justify-center bg-background p-4">
    <ActivityIndicator size="large" color="#3B82F6" />
    <Text className="text-text-primary text-lg mt-4">{message}</Text>
  </View>
));

LoadingState.displayName = 'LoadingState';

export default LoadingState; 
