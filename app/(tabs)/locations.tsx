import { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Location {
  id: number;
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

  const renderItem = ({ item }: { item: Location }) => (
    <TouchableOpacity 
      className="bg-white p-4 mb-2 rounded-lg shadow-sm"
    >
      <View className="flex-row items-center mb-2">
        <MaterialCommunityIcons 
          name="map-marker" 
          size={24} 
          color="#3B82F6" 
        />
        <Text className="ml-2 text-lg font-semibold text-text-primary">
          {item.name}
        </Text>
      </View>
      
      <View className="flex-row items-center mb-1">
        <MaterialCommunityIcons 
          name="earth" 
          size={20} 
          color="#6B7280" 
        />
        <Text className="ml-2 text-text-secondary">
          {item.type}
        </Text>
      </View>
      
      <View className="flex-row items-center">
        <MaterialCommunityIcons 
          name="cube-outline" 
          size={20} 
          color="#6B7280" 
        />
        <Text className="ml-2 text-text-secondary">
          {item.dimension}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
      <FlatList
        data={data.locations.results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
} 
