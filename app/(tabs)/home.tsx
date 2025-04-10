import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import Animated, { 
  FadeInDown, 
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSequence(
      withSpring(1.1),
      withSpring(1)
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View className="flex-1 bg-background p-4">
      <View className="flex-1 items-center justify-center">
        <Animated.View 
          entering={FadeInDown.duration(1000).springify()}
          className="items-center mb-8"
        >
          <Animated.View style={animatedStyle}>
            <View className="bg-purple-100 p-6 rounded-full">
              <MaterialCommunityIcons name="alien" size={80} color="#7C3AED" />
            </View>
          </Animated.View>
          <Text className="text-4xl font-bold text-text-primary mt-4">
            Rick and Morty
          </Text>
          <Text className="text-text-secondary text-center mt-2 text-lg">
            Explora el universo de Rick and Morty
          </Text>
        </Animated.View>

        <View className="w-full space-y-4">
          <Animated.View 
            entering={FadeInUp.delay(200).springify()}
          >
            <Link href="/(tabs)/characters" asChild>
              <TouchableOpacity 
                className="bg-purple-500 p-4 rounded-lg shadow-lg elevation-5"
              >
                <Text className="text-white text-center font-bold text-lg">
                  Personajes
                </Text>
              </TouchableOpacity>
            </Link>
          </Animated.View>

          <Animated.View 
            entering={FadeInUp.delay(400).springify()}
          >
            <Link href="/(tabs)/locations" asChild>
              <TouchableOpacity 
                className="bg-green-500 p-4 rounded-lg shadow-lg elevation-5"
              >
                <Text className="text-white text-center font-bold text-lg">
                  Ubicaciones
                </Text>
              </TouchableOpacity>
            </Link>
          </Animated.View>

          <Animated.View 
            entering={FadeInUp.delay(600).springify()}
          >
            <Link href="/(tabs)/episodes" asChild>
              <TouchableOpacity 
                className="bg-blue-500 p-4 rounded-lg shadow-lg elevation-5"
              >
                <Text className="text-white text-center font-bold text-lg">
                  Episodios
                </Text>
              </TouchableOpacity>
            </Link>
          </Animated.View>
        </View>
      </View>
    </View>
  );
} 
