import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../theme';

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export default function Header({ title, showBack = false }: HeaderProps) {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <View 
      className="flex-row items-center justify-between px-4 py-3"
      style={{ backgroundColor: theme.colors.card }}
    >
      <View className="flex-row items-center flex-1">
        {showBack && (
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mr-3"
          >
            <MaterialCommunityIcons 
              name="arrow-left" 
              size={24} 
              color={theme.colors.text}
            />
          </TouchableOpacity>
        )}
        <Text 
          className="text-xl font-bold flex-1"
          style={{ color: theme.colors.text }}
        >
          {title}
        </Text>
      </View>
      <TouchableOpacity 
        onPress={toggleTheme}
        className="p-2 rounded-full"
        style={{ backgroundColor: theme.colors.background }}
      >
        <MaterialCommunityIcons 
          name={isDark ? "white-balance-sunny" : "moon-waning-crescent"} 
          size={24} 
          color={theme.colors.text}
        />
      </TouchableOpacity>
    </View>
  );
} 
