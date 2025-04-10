import { View, Text, FlatList, ActivityIndicator, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

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

export default function CharactersScreen() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#3B82F6" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <Text className="text-red-500 text-lg">Error: {error.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
      <FlatList
        data={data?.characters?.results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 20, alignItems: 'center' }}
        renderItem={({ item }) => (
          <Link href={`/character/${item.id}`} asChild>
            <TouchableOpacity>
              <View 
                style={{ width: CARD_WIDTH }}
                className="bg-white rounded-xl overflow-hidden shadow-lg mb-4"
              >
                <Image 
                  source={{ uri: item.image }} 
                  className="w-full h-64"
                  resizeMode="cover"
                />
                <View className="p-4">
                  <Text className="text-2xl font-bold text-text-primary mb-2">{item.name}</Text>
                  <View className="flex-row items-center mb-1">
                    <View 
                      className={`w-3 h-3 rounded-full mr-2 ${
                        item.status === 'Alive' ? 'bg-green-500' : 
                        item.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
                      }`} 
                    />
                    <Text className="text-text-secondary text-lg">Status: {item.status}</Text>
                  </View>
                  <Text className="text-text-secondary text-lg">Species: {item.species}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </SafeAreaView>
  );
} 
