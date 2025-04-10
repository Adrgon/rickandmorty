import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const { width } = Dimensions.get('window');

const GET_CHARACTER_DETAILS = gql`
  query GetCharacterDetails($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      origin {
        name
      }
      location {
        name
      }
      episode {
        id
        name
        episode
      }
    }
  }
`;

export default function CharacterDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { loading, error, data } = useQuery(GET_CHARACTER_DETAILS, {
    variables: { id },
  });

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-text-primary">Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-red-500">Error: {error.message}</Text>
      </View>
    );
  }

  const character = data.character;

  return (
    <ScrollView className="flex-1 bg-background">
      <Stack.Screen 
        options={{ 
          title: character.name,
          headerBackTitle: 'Volver',
          headerBackVisible: true,
          headerStyle: {
            backgroundColor: '#F3F4F6',
          },
          headerTintColor: '#1F2937',
        }} 
      />
      
      <Image
        source={{ uri: character.image }}
        className="w-full h-96"
        resizeMode="cover"
      />

      <View className="p-4">
        <View className="flex-row items-center mb-4">
          <View 
            className={`w-3 h-3 rounded-full mr-2 ${
              character.status === 'Alive' ? 'bg-green-500' : 
              character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
            }`} 
          />
          <Text className="text-text-primary text-lg">
            {character.status} - {character.species}
          </Text>
        </View>

        <View className="bg-white rounded-lg p-4 mb-4">
          <Text className="text-text-secondary text-base mb-1">Información Personal</Text>
          <Text className="text-text-primary text-lg">Género: {character.gender}</Text>
          {character.type && (
            <Text className="text-text-primary text-lg">Tipo: {character.type}</Text>
          )}
        </View>

        <View className="bg-white rounded-lg p-4 mb-4">
          <Text className="text-text-secondary text-base mb-1">Lugar de Origen</Text>
          <Text className="text-text-primary text-lg">{character.origin.name}</Text>
        </View>

        <View className="bg-white rounded-lg p-4 mb-4">
          <Text className="text-text-secondary text-base mb-1">Última Ubicación Conocida</Text>
          <Text className="text-text-primary text-lg">{character.location.name}</Text>
        </View>

        <View className="bg-white rounded-lg p-4">
          <Text className="text-text-secondary text-base mb-2">Episodios en los que Aparece</Text>
          {character.episode.map((episode: any) => (
            <View key={episode.id} className="mb-2">
              <Text className="text-text-primary text-lg">{episode.name}</Text>
              <Text className="text-text-secondary">{episode.episode}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
} 
