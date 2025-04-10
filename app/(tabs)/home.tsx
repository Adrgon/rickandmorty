import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-background p-4">
      <View className="flex-1 justify-center items-center">
        <View className="bg-blue-100 p-6 rounded-full mb-4">
          <MaterialCommunityIcons name="alien" size={80} color="#3B82F6" />
        </View>
        <Text className="text-2xl font-bold mb-2 text-text-primary">
          Rick and Morty
        </Text>
        <Text className="text-center mb-8 text-text-secondary">
          Explora el universo de Rick and Morty
        </Text>

        <View className="w-full space-y-4">
          <Link href="/characters" asChild>
            <TouchableOpacity className="bg-indigo-100 p-4 rounded-lg">
              <Text className="text-lg font-semibold text-indigo-900">
                Personajes
              </Text>
              <Text className="mt-1 text-indigo-700">
                Descubre todos los lugares del universo
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/locations" asChild>
            <TouchableOpacity className="bg-blue-100 p-4 rounded-lg">
              <Text className="text-lg font-semibold text-blue-900">
                Ubicaciones
              </Text>
              <Text className="mt-1 text-blue-700">
                Descubre todos los lugares del universo
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/episodes" asChild>
            <TouchableOpacity className="bg-green-100 p-4 rounded-lg">
              <Text className="text-lg font-semibold text-green-900">
                Episodios
              </Text>
              <Text className="mt-1 text-green-700">
                Revive todas las aventuras
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
} 
