import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { gql, useQuery } from '@apollo/client';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../theme';
import Layout from '../components/Layout';
import Header from '../components/Header';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const GET_EPISODES = gql`
  query GetEpisodes {
    episodes {
      results {
        id
        name
        episode
        air_date
      }
    }
  }
`;

interface Episode {
  id: string;
  name: string;
  episode: string;
  air_date: string;
}

export default function EpisodesScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const { loading, error, data, refetch } = useQuery(GET_EPISODES);

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

  const renderItem = ({ item }: { item: Episode }) => (
    <TouchableOpacity
      className="mb-4 rounded-xl p-4"
      style={{ backgroundColor: theme.colors.card }}
      onPress={() => router.push(`/episode/${item.id}`)}
    >
      <View className="flex-row items-center">
        <View 
          className="w-12 h-12 rounded-full items-center justify-center mr-4"
          style={{ backgroundColor: theme.colors.accent + '20' }}
        >
          <MaterialCommunityIcons
            name="television-classic"
            size={24}
            color={theme.colors.accent}
          />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold mb-1" style={{ color: theme.colors.text }}>
            {item.name}
          </Text>
          <View className="flex-row items-center">
            <Text style={{ color: theme.colors.textSecondary }}>
              {item.episode} • {item.air_date}
            </Text>
          </View>
        </View>
        <MaterialCommunityIcons 
          name="chevron-right" 
          size={24} 
          color={theme.colors.textSecondary}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <Layout>
      <View style={{ flex: 1 }}>
        <Header title="Episodios" />
        <FlatList
          data={data?.episodes?.results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Layout>
  );
} 
