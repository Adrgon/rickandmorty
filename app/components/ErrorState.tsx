import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../theme';

interface ErrorStateProps {
  error: Error;
  onRetry?: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <View 
      className="flex-1 items-center justify-center p-5"
      style={{ backgroundColor: theme.colors.background }}
    >
      <MaterialCommunityIcons 
        name="alert-circle" 
        size={48} 
        color={theme.colors.error}
      />
      <Text 
        className="text-2xl font-bold mt-4 mb-2"
        style={{ color: theme.colors.text }}
      >
        ¡Ups! Algo salió mal
      </Text>
      <Text 
        className="text-base text-center mb-6"
        style={{ color: theme.colors.textSecondary }}
      >
        {error.message || 'Ha ocurrido un error. Por favor, intenta de nuevo.'}
      </Text>
      {onRetry && (
        <TouchableOpacity
          className="px-6 py-3 rounded-lg"
          style={{ backgroundColor: theme.colors.primary }}
          onPress={onRetry}
        >
          <Text 
            className="text-base font-bold"
            style={{ color: theme.colors.background }}
          >
            Intentar de nuevo
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
} 
