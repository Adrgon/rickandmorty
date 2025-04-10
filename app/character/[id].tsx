import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { gql, useQuery } from '@apollo/client';
import { LinearGradient } from 'expo-linear-gradient';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withTiming,
  Easing,
  runOnJS 
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
      episode {
        id
        name
        episode
      }
    }
  }
`;

export default function CharacterDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const translateX = useSharedValue(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [canGoBack, setCanGoBack] = useState(true);

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id },
  });

  const panGesture = Gesture
    .Pan()
    .enabled(canGoBack)
    .minDistance(15)
    .activeOffsetX(10)
    .onStart(() => {
      runOnJS(setIsScrolling)(false);
    })
    .onUpdate((event) => {
      if (!isScrolling && event.translationX >= 0) {
        const dragX = Math.min(event.translationX, width);
        translateX.value = dragX * 0.8;
      }
    })
    .onEnd((event) => {
      if (!isScrolling) {
        if (event.translationX > width * 0.3 || event.velocityX > 800) {
          translateX.value = withTiming(width, {
            duration: 300,
            easing: Easing.out(Easing.ease)
          }, () => {
            runOnJS(router.back)();
          });
        } else {
          translateX.value = withSpring(0, {
            damping: 15,
            stiffness: 150,
            mass: 0.5
          });
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  if (loading) return <Text className="text-text-primary">Cargando...</Text>;
  if (error) return <Text className="text-red-500">Error: {error.message}</Text>;

  const character = data.character;

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: character?.name,
          headerBackTitle: 'Volver',
          headerStyle: {
            backgroundColor: '#F3F4F6',
          },
          headerTintColor: '#1F2937',
          gestureEnabled: false,
        }} 
      />
      <GestureDetector gesture={panGesture}>
        <Animated.View className="flex-1 bg-gray-100" style={animatedStyle}>
          <ScrollView 
            className="flex-1"
            onScrollBeginDrag={() => {
              setIsScrolling(true);
              setCanGoBack(false);
            }}
            onScrollEndDrag={() => {
              setIsScrolling(false);
              setCanGoBack(true);
            }}
            onMomentumScrollBegin={() => setCanGoBack(false)}
            onMomentumScrollEnd={() => setCanGoBack(true)}
            bounces={false}
          >
            <View className="relative h-[400px]">
              <Image 
                source={{ uri: character.image }} 
                className="w-full h-full" 
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                className="absolute left-0 right-0 bottom-0 h-[200px]"
              />
              <View className="absolute bottom-0 left-0 right-0 p-5">
                <Text className="text-white text-3xl font-bold mb-2 shadow-lg">
                  {character.name}
                </Text>
                <View className="flex-row items-center">
                  <View 
                    className={`w-2.5 h-2.5 rounded-full mr-2 ${
                      character.status === 'Alive' ? 'bg-green-500' : 
                      character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
                    }`} 
                  />
                  <Text className="text-white text-lg shadow-lg">
                    {character.status} - {character.species}
                  </Text>
                </View>
              </View>
            </View>
            <View className="p-5 -mt-5">
              <View className="mb-8">
                <Text className="text-2xl font-bold text-gray-800 mb-4">
                  Información
                </Text>
                <View className="bg-white rounded-xl p-5 shadow-sm">
                  <View className="mb-4 pb-4 border-b border-gray-200">
                    <Text className="text-sm text-gray-500 mb-1">Género</Text>
                    <Text className="text-base text-gray-800 font-medium">
                      {character.gender}
                    </Text>
                  </View>
                  <View className="mb-4 pb-4 border-b border-gray-200">
                    <Text className="text-sm text-gray-500 mb-1">Origen</Text>
                    <Text className="text-base text-gray-800 font-medium">
                      {character.origin.name}
                    </Text>
                  </View>
                  <View className="mb-4">
                    <Text className="text-sm text-gray-500 mb-1">Ubicación</Text>
                    <Text className="text-base text-gray-800 font-medium">
                      {character.location.name}
                    </Text>
                  </View>
                </View>
              </View>
              <View className="mb-8">
                <Text className="text-2xl font-bold text-gray-800 mb-4">
                  Episodios
                </Text>
                <View className="bg-white rounded-xl p-5 shadow-sm">
                  {character.episode.map((ep: any) => (
                    <View key={ep.id} className="mb-4 pb-4 border-b border-gray-200">
                      <Text className="text-base text-gray-800 font-medium mb-1">
                        {ep.name}
                      </Text>
                      <Text className="text-sm text-gray-500">
                        {ep.episode}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </GestureDetector>
    </>
  );
} 
