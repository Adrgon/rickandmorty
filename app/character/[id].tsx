import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { gql, useQuery } from '@apollo/client';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../theme';
import Layout from '../components/Layout';
import Header from '../components/Header';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
      episode {
        id
        name
      }
    }
  }
`;

const { width } = Dimensions.get('window');

export default function CharacterDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const [isExpanded, setIsExpanded] = useState(false);

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id },
  });

  const panGesture = Gesture.Pan()
    .onEnd((e) => {
      if (e.translationX > 50) {
        router.back();
      }
    });

  if (loading) return (
    <Layout>
      <LoadingState />
    </Layout>
  );
  
  if (error) return (
    <Layout>
      <ErrorState error={error} />
    </Layout>
  );

  const character = data?.character;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'alive':
        return theme.colors.success;
      case 'dead':
        return theme.colors.error;
      default:
        return theme.colors.warning;
    }
  };

  return (
    <Layout>
      <GestureDetector gesture={panGesture}>
        <View style={{ flex: 1 }}>
          <Header title="Detalles del Personaje" showBack />
          <ScrollView 
            className="flex-1"
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <View className="items-center">
              <Image
                source={{ uri: character.image }}
                className="w-full h-80"
                style={{ backgroundColor: theme.colors.card }}
              />
              <View className="absolute top-4 right-4 bg-black/50 rounded-full p-2">
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color="white"
                  onPress={() => router.back()}
                />
              </View>
            </View>

            <View className="p-4">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-2xl font-bold" style={{ color: theme.colors.text }}>
                  {character.name}
                </Text>
                <View 
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: getStatusColor(character.status) + '20' }}
                >
                  <Text 
                    className="text-sm font-medium"
                    style={{ color: getStatusColor(character.status) }}
                  >
                    {character.status}
                  </Text>
                </View>
              </View>

              <View className="bg-white/5 rounded-xl p-4 mb-4">
                <Text className="text-lg font-bold mb-2" style={{ color: theme.colors.text }}>
                  Información
                </Text>
                <View className="space-y-2">
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons 
                      name="alien" 
                      size={20} 
                      color={theme.colors.primary}
                      style={{ marginRight: 8 }}
                    />
                    <Text style={{ color: theme.colors.textSecondary }}>
                      {character.species} {character.type && `- ${character.type}`}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons 
                      name="gender-male-female" 
                      size={20} 
                      color={theme.colors.primary}
                      style={{ marginRight: 8 }}
                    />
                    <Text style={{ color: theme.colors.textSecondary }}>
                      {character.gender}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons 
                      name="earth" 
                      size={20} 
                      color={theme.colors.primary}
                      style={{ marginRight: 8 }}
                    />
                    <Text style={{ color: theme.colors.textSecondary }}>
                      {character.origin.name}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons 
                      name="map-marker" 
                      size={20} 
                      color={theme.colors.primary}
                      style={{ marginRight: 8 }}
                    />
                    <Text style={{ color: theme.colors.textSecondary }}>
                      {character.location.name}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="bg-white/5 rounded-xl p-4">
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-lg font-bold" style={{ color: theme.colors.text }}>
                    Episodios
                  </Text>
                  <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                    <MaterialCommunityIcons
                      name={isExpanded ? "chevron-up" : "chevron-down"}
                      size={24}
                      color={theme.colors.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
                {isExpanded && (
                  <View className="space-y-2">
                    {character.episode.map((ep: any) => (
                      <TouchableOpacity
                        key={ep.id}
                        className="flex-row items-center p-2 rounded-lg"
                        style={{ backgroundColor: theme.colors.card }}
                        onPress={() => router.push(`/episode/${ep.id}`)}
                      >
                        <MaterialCommunityIcons
                          name="play-circle"
                          size={20}
                          color={theme.colors.primary}
                          style={{ marginRight: 8 }}
                        />
                        <Text style={{ color: theme.colors.text }}>
                          {ep.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </GestureDetector>
    </Layout>
  );
} 
