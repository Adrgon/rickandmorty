import { View, Text, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Character, CharactersResponse } from '../types/character';
import React from 'react';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

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

const CharacterItem = React.memo(({ item, onPress }: { item: Character; onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-gray-800 rounded-lg overflow-hidden mb-4"
    activeOpacity={0.7}
  >
    <Image
      source={{ uri: item.image }}
      className="w-full h-48"
      resizeMode="cover"
    />
    <View className="p-4">
      <Text className="text-white text-lg font-bold">{item.name}</Text>
      <Text className="text-gray-400 mt-1">{item.species}</Text>
    </View>
  </TouchableOpacity>
));

export default function CharactersScreen() {
  const { loading, error, data, refetch } = useQuery<CharactersResponse>(GET_CHARACTERS);
  const router = useRouter();

  if (loading) {
    return <LoadingState message="Cargando personajes..." />;
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-4 bg-gray-900">
        <MaterialCommunityIcons name="alert-circle" size={48} color="#ef4444" />
        <Text className="text-red-500 text-lg font-bold mt-4 text-center">
          ¡Ups! Algo salió mal
        </Text>
        <Text className="text-gray-400 text-sm mt-2 text-center">
          {error.message || 'No pudimos cargar los personajes. Por favor, intenta de nuevo.'}
        </Text>
        <TouchableOpacity 
          className="mt-4 bg-blue-500 px-6 py-2 rounded-full"
          onPress={() => refetch()}
        >
          <Text className="text-white font-semibold">Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
      <FlatList
        data={data?.characters?.results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterItem
            item={item}
            onPress={() => router.push(`/character/${item.id}`)}
          />
        )}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
        ListEmptyComponent={
          !loading && (
            <View className="flex-1 items-center justify-center py-8">
              <Text className="text-gray-400 text-lg">No se encontraron personajes</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
} 
