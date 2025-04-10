import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { darkTheme, lightTheme } from '../theme';
import Layout from '../components/Layout';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import Header from '../components/Header';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface Character {
  id: string;
  name: string;
  status: string;
  image: string;
}

const GET_EPISODE = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
        name
        status
        image
      }
    }
  }
`;

export default function EpisodeDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { isDark } = useTheme();
  const colors = isDark ? darkTheme.colors : lightTheme.colors;

  const { loading, error, data } = useQuery(GET_EPISODE, {
    variables: { id },
  });

  if (loading) {
    return (
      <Layout>
        <Header title="Detalles del Episodio" showBack />
        <LoadingState />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Header title="Detalles del Episodio" showBack />
        <ErrorState error={error} />
      </Layout>
    );
  }

  const { episode } = data;

  const renderCharacter = ({ item }: { item: Character }) => (
    <TouchableOpacity
      onPress={() => router.push(`/character/${item.id}`)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.surface,
        borderRadius: 8,
        marginBottom: 8,
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={{ color: colors.text, fontSize: 16, fontWeight: 'bold' }}>
          {item.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 4,
          }}
        >
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor:
                item.status === 'Alive'
                  ? colors.success
                  : item.status === 'Dead'
                  ? colors.error
                  : colors.warning,
              marginRight: 4,
            }}
          />
          <Text style={{ color: colors.textSecondary }}>
            {item.status}
          </Text>
        </View>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color={colors.textSecondary}
      />
    </TouchableOpacity>
  );

  return (
    <Layout>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Header title="Detalles del Episodio" showBack />
        <View
          style={{
            flex: 1,
            backgroundColor: colors.background,
          }}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 16 }}
          >
            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontSize: 24,
                  fontWeight: 'bold',
                  marginBottom: 8,
                }}
              >
                {episode.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <MaterialCommunityIcons
                  name="calendar"
                  size={20}
                  color={colors.primary}
                  style={{ marginRight: 8 }}
                />
                <Text style={{ color: colors.textSecondary }}>
                  {episode.air_date}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons
                  name="play-circle"
                  size={20}
                  color={colors.primary}
                  style={{ marginRight: 8 }}
                />
                <Text style={{ color: colors.textSecondary }}>
                  {episode.episode}
                </Text>
              </View>
            </View>

            <Text
              style={{
                color: colors.text,
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 16,
              }}
            >
              Personajes ({episode.characters.length})
            </Text>

            <FlatList
              data={episode.characters}
              renderItem={renderCharacter}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </ScrollView>
        </View>
      </GestureHandlerRootView>
    </Layout>
  );
} 
