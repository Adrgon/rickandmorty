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

interface Resident {
  id: string;
  name: string;
  status: string;
  image: string;
}

const GET_LOCATION = gql`
  query GetLocation($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      residents {
        id
        name
        status
        image
      }
    }
  }
`;

export default function LocationDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  const { loading, error, data } = useQuery(GET_LOCATION, {
    variables: { id },
  });

  if (loading) {
    return (
      <Layout>
        <Header title="Detalles de la Ubicación" showBack />
        <LoadingState />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Header title="Detalles de la Ubicación" showBack />
        <ErrorState error={error} />
      </Layout>
    );
  }

  const { location } = data;

  const renderResident = ({ item }: { item: Resident }) => (
    <TouchableOpacity
      className="p-4 rounded-xl mb-4"
      style={{ backgroundColor: theme.colors.card }}
      onPress={() => router.push(`/character/${item.id}` as any)}
    >
      <View className="flex-row items-center">
        <Image
          source={{ uri: item.image }}
          className="w-12 h-12 rounded-full mr-4"
        />
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
                    ? theme.colors.success
                    : item.status === 'Dead'
                    ? theme.colors.error
                    : theme.colors.warning,
                marginRight: 4,
              }}
            />
            <Text 
              style={{ 
                color: isDark ? theme.colors.textSecondary : theme.colors.textSecondary,
                opacity: isDark ? 0.8 : 1
              }}
            >
              {item.status}
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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Header title="Detalles de la Ubicación" showBack />
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.background,
          }}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 16 }}
          >
            <View
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  color: theme.colors.text,
                  fontSize: 24,
                  fontWeight: 'bold',
                  marginBottom: 8,
                }}
              >
                {location.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <MaterialCommunityIcons
                  name="map-marker"
                  size={20}
                  color={theme.colors.primary}
                  style={{ marginRight: 8 }}
                />
                <Text style={{ color: theme.colors.textSecondary }}>
                  {location.type}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons
                  name="earth"
                  size={20}
                  color={theme.colors.primary}
                  style={{ marginRight: 8 }}
                />
                <Text style={{ color: theme.colors.textSecondary }}>
                  {location.dimension}
                </Text>
              </View>
            </View>

            <Text
              style={{
                color: theme.colors.text,
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 16,
              }}
            >
              Residentes ({location.residents.length})
            </Text>

            <FlatList
              data={location.residents}
              renderItem={renderResident}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </ScrollView>
        </View>
      </GestureHandlerRootView>
    </Layout>
  );
} 
