import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function LoadingState() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#3B82F6" />
    </View>
  );
} 
