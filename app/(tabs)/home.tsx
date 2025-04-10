import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { darkTheme, lightTheme } from '../theme';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Haptics from 'expo-haptics';

// Función para generar un color aleatorio
const getRandomColor = () => {
  const colors = [
    '#97CE4C', // Verde Rick
    '#44281D', // Marrón Morty
    '#E4A788', // Rosa
    '#F0E14A', // Amarillo
    '#E45D44', // Rojo
    '#4747FF', // Azul
    '#9B59B6', // Púrpura
    '#3498DB', // Azul claro
    '#2ECC71', // Verde claro
    '#F1C40F', // Amarillo dorado
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

type MenuItem = {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  route: string;
  description: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const [alienColor, setAlienColor] = useState(getRandomColor());
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiRef = useRef(null);

  // Cambiar el color del marciano cada vez que se monta el componente
  useEffect(() => {
    setAlienColor(getRandomColor());
  }, []);

  // Activar el confeti cada vez que se accede a la pantalla
  useEffect(() => {
    // Activar confeti
    setShowConfetti(true);
    
    // Desactivar confeti después de 3 segundos
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    
    // Limpiar el temporizador cuando el componente se desmonte
    return () => clearTimeout(timer);
  }, []);

  const menuItems: MenuItem[] = [
    {
      title: 'Personajes',
      icon: 'account-group',
      route: '/characters',
      description: 'Explora todos los personajes del multiverso',
    },
    {
      title: 'Ubicaciones',
      icon: 'map-marker',
      route: '/locations',
      description: 'Descubre los diferentes planetas y dimensiones',
    },
    {
      title: 'Episodios',
      icon: 'television-classic',
      route: '/episodes',
      description: 'Revive todas las aventuras de Rick y Morty',
    },
  ];

  const handleImagePress = () => {
    // Activar haptics (vibración)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Activar confeti
    setShowConfetti(true);
    
    // Desactivar confeti después de 3 segundos
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header title="Inicio" />
      <ScrollView className="flex-1 p-4">
        <View className="items-center mb-8">
          <TouchableOpacity 
            className="flex-1 justify-center items-center mt-4 mb-4"
            onPress={handleImagePress}
            activeOpacity={0.8}
          >
            <View
              className="w-32 h-32 items-center justify-center rounded-full"
              style={{ backgroundColor: theme.colors.accent + "20" }}
            >
              <Image
                source={require("../../assets/images/rickandmorty.png")}
                className="w-32 h-32"
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          
          {showConfetti && (
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100 }}>
              <ConfettiCannon
                ref={confettiRef}
                count={200}
                origin={{ x: 0, y: 0 }}
                autoStart={true}
                fadeOut={true}
                fallSpeed={3000}
                explosionSpeed={350}
                colors={['#97CE4C', '#44281D', '#E4A788', '#F0E14A', '#E45D44']}
              />
            </View>
          )}
          
          <Text
            className="text-base text-center text-2xl"
            style={{ color: theme.colors.textSecondary }}
          >
            Explora el multiverso con Rick y Morty
          </Text>
        </View>

        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="p-4 rounded-xl mb-4"
            style={{ backgroundColor: theme.colors.card }}
            onPress={() => router.push(item.route as any)}
          >
            <View className="flex-row items-center">
              <View
                className="w-12 h-12 rounded-full items-center justify-center mr-4"
                style={{ backgroundColor: theme.colors.primary + "20" }}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={24}
                  color={theme.colors.primary}
                />
              </View>
              <View className="flex-1">
                <Text
                  className="text-lg font-semibold"
                  style={{ color: theme.colors.text }}
                >
                  {item.title}
                </Text>
                <Text style={{ color: theme.colors.textSecondary }}>
                  {item.description}
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={theme.colors.textSecondary}
              />
            </View>
          </TouchableOpacity>
        ))}
{/*         <View className="flex-1 justify-center items-center mt-4">
          <View
            className="w-32 h-32 mb-4 items-center justify-center rounded-full"
            style={{ backgroundColor: theme.colors.accent + "20" }}
          >
            <MaterialCommunityIcons name="alien" size={80} color={alienColor} />
          </View>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
} 
