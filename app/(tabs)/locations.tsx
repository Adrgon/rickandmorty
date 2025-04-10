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

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      results {
        id
        name
        type
        dimension
      }
    }
  }
`;

interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
}

export default function LocationsScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const { loading, error, data, refetch } = useQuery(GET_LOCATIONS);

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

  const renderItem = ({ item }: { item: Location }) => (
    <TouchableOpacity
      className="p-4 rounded-xl mb-4"
      style={{ backgroundColor: theme.colors.card }}
      onPress={() => router.push(`/location/${item.id}` as any)}
    >
      <View className="flex-row items-center">
        <View 
          className="w-12 h-12 rounded-full items-center justify-center mr-4"
          style={{ backgroundColor: theme.colors.primary + '20' }}
        >
          <MaterialCommunityIcons
            name="map-marker"
            size={24}
            color={theme.colors.primary}
          />
        </View>
        <View className="flex-1">
          <Text 
            className="text-lg font-semibold" 
            style={{ 
              color: isDark ? theme.colors.text : theme.colors.text,
              fontWeight: '600'
            }}
          >
            {item.name}
          </Text>
          <Text 
            style={{ 
              color: isDark ? theme.colors.textSecondary : theme.colors.textSecondary,
              opacity: isDark ? 0.8 : 1
            }}
          >
            {item.type} • {item.dimension}
          </Text>
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
        <Header title="Ubicaciones" />
        <FlatList
          data={data?.locations?.results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Layout>
  );
} 
