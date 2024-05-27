import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect, useCallback } from 'react';
import * as React from 'react';

import UserContext from '../contexts/UserContext';
import { readUser } from '../persistence/userStorage';
import MenuScreen from '../screens/MenuScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colorGuide } from '../styles/styleGuide';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

const RootNavigator = () => {
  const [isUserLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [fontsLoaded, fontError] = useFonts({
    'Karla-Regular': require('../assets/fonts/Karla-Regular.ttf'),
    'MarkaziText-Regular': require('../assets/fonts/MarkaziText-Regular.ttf'),
  });

  const isLoading = isUserLoading || (!fontsLoaded && !fontError);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedUser = await readUser();

      if (savedUser) {
        setUser(savedUser);
      }
    } catch (error) {
      console.error('Error loading user', error);
    } finally {
      setUserLoading(false);
    }
  };

  const onReady = useCallback(async () => {
    if (!isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer onReady={onReady}>
      <UserContext.Provider value={{ user, setUser }}>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: colorGuide.headerTitle.color,
            headerStyle: { backgroundColor: colorGuide.headerTitle.background },
          }}>
          {!user ? (
            <Stack.Screen
              name="onboarding"
              options={{ title: 'Little Lemon' }}
              component={OnboardingScreen}
            />
          ) : (
            <>
              <Stack.Screen name="menu" options={{ title: 'Menu' }} component={MenuScreen} />
              <Stack.Screen
                name="profile"
                options={{ title: 'Profile' }}
                component={ProfileScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
};

export default RootNavigator;
