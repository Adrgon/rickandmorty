import { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
}

const GET_LOCATIONS = gql`
  query GetLocations($page: Int) {
    locations(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        type
        dimension
      }
    }
  }
`;

export default function LocationsScreen() {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_LOCATIONS, {
    variables: { page },
  });

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3B82F6" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="text-text-primary">Error: {error.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
      <FlatList
        data={data.locations.results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 m-2 rounded-lg shadow-sm flex-row items-center">
            <View className="bg-blue-100 p-3 rounded-full mr-4">
              <MaterialCommunityIcons name="map-marker" size={24} color="#3B82F6" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-text-primary">{item.name}</Text>
              <View className="flex-row items-center mt-1">
                <MaterialCommunityIcons name="tag" size={16} color="#6B7280" />
                <Text className="text-text-secondary ml-1">Type: {item.type}</Text>
              </View>
              <View className="flex-row items-center mt-1">
                <MaterialCommunityIcons name="earth" size={16} color="#6B7280" />
                <Text className="text-text-secondary ml-1">Dimension: {item.dimension}</Text>
              </View>
            </View>
          </View>
        )}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
} 
