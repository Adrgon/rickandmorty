import React from 'react';
import { Stack } from 'expo-router';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';
import { lightTheme, darkTheme } from './theme';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

function RootLayoutNav() {
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen
          name="episode/[id]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="location/[id]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="character/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <ApolloProvider client={client}>
          <RootLayoutNav />
        </ApolloProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
