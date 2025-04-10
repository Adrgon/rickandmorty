import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { gql, useQuery } from '@apollo/client';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../theme';
import Layout from '../components/Layout';
import Header from '../components/Header';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
        status
        species
        image
      }
    }
  }
`;

interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
}

export default function CharactersScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const { loading, error, data, refetch } = useQuery(GET_CHARACTERS);

  if (loading) return (
    <Layout>
      <LoadingState />
    </Layout>
  );
  
  if (error) return (
    <Layout>
      <ErrorState error={error} onRetry={refetch} />
    </Layout>
  );

  const renderItem = ({ item }: { item: Character }) => (
    <TouchableOpacity
      className="mb-4 rounded-xl overflow-hidden"
      style={{ backgroundColor: theme.colors.card }}
      onPress={() => router.push(`/character/${item.id}`)}
    >
      <View className="flex-row">
        <Image
          source={{ uri: item.image }}
          className="w-24 h-24"
          style={{ backgroundColor: theme.colors.surface }}
        />
        <View className="flex-1 p-4">
          <Text className="text-lg font-bold mb-1" style={{ color: theme.colors.text }}>
            {item.name}
          </Text>
          <View className="flex-row items-center mb-1">
            <View 
              className="w-2 h-2 rounded-full mr-2"
              style={{ 
                backgroundColor: 
                  item.status === 'Alive' ? theme.colors.success :
                  item.status === 'Dead' ? theme.colors.error :
                  theme.colors.warning
              }}
            />
            <Text style={{ color: theme.colors.textSecondary }}>
              {item.status} - {item.species}
            </Text>
          </View>
        </View>
        <MaterialCommunityIcons 
          name="chevron-right" 
          size={24} 
          color={theme.colors.textSecondary}
          style={{ marginRight: 16, alignSelf: 'center' }}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <Layout>
      <View style={{ flex: 1 }}>
        <Header title="Personajes" />
        <FlatList
          data={data?.characters?.results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Layout>
  );
} 
