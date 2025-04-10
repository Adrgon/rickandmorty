import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../theme';
import Header from '../components/Header';

type MenuItem = {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  route: string;
  description: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  const menuItems: MenuItem[] = [
    {
      title: 'Personajes',
      icon: 'account-group',
      route: '/characters',
      description: 'Explora todos los personajes del multiverso',
    },
    {
      title: 'Ubicaciones',
      icon: 'map-marker',
      route: '/locations',
      description: 'Descubre los diferentes planetas y dimensiones',
    },
    {
      title: 'Episodios',
      icon: 'television-classic',
      route: '/episodes',
      description: 'Revive todas las aventuras de Rick y Morty',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header />
      <ScrollView className="flex-1 p-4">
        <View className="items-center mb-8">
          <View className="w-32 h-32 mb-4 items-center justify-center rounded-full" style={{ backgroundColor: theme.colors.accent + '20' }}>
            <MaterialCommunityIcons name="alien" size={80} color={theme.colors.accent} />
          </View>
          <Text className="text-2xl font-bold mb-2 text-center" style={{ color: theme.colors.text }}>
            Rick and Morty
          </Text>
          <Text className="text-base text-center" style={{ color: theme.colors.textSecondary }}>
            Explora el multiverso con Rick y Morty
          </Text>
        </View>

        <View className="space-y-4">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="p-4 rounded-xl"
              style={{ backgroundColor: theme.colors.card }}
              onPress={() => router.push(item.route as any)}
            >
              <View className="flex-row items-center">
                <View 
                  className="w-12 h-12 rounded-full items-center justify-center mr-4"
                  style={{ backgroundColor: theme.colors.primary + '20' }}
                >
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={24}
                    color={theme.colors.primary}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-semibold" style={{ color: theme.colors.text }}>
                    {item.title}
                  </Text>
                  <Text style={{ color: theme.colors.textSecondary }}>
                    {item.description}
                  </Text>
                </View>
                <MaterialCommunityIcons 
                  name="chevron-right" 
                  size={24} 
                  color={theme.colors.textSecondary} 
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
} 
