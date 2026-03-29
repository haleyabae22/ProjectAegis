import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { InitialState, NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./src/navigation/AppNavigator";
import { colors } from "./src/theme/colors";
import { ProfileProvider } from "./src/contexts/ProfileContext";

const NAVIGATION_STATE_KEY = "PROJECT_AEGIS_NAVIGATION_STATE_V1";

export default function App() {
  const [isNavStateReady, setIsNavStateReady] = useState(false);
  const [initialNavState, setInitialNavState] = useState<InitialState | undefined>(undefined);

  useEffect(() => {
    const restoreNavigationState = async () => {
      try {
        if (Platform.OS === "web") {
          const navEntry = typeof window !== "undefined" && typeof window.performance?.getEntriesByType === "function"
            ? (window.performance.getEntriesByType("navigation")[0] as { type?: string } | undefined)
            : undefined;
          const isReload = navEntry?.type === "reload";

          // Keep refresh behavior, but start from Landing on normal app loads.
          if (!isReload) {
            await AsyncStorage.removeItem(NAVIGATION_STATE_KEY);
            return;
          }
        }

        const savedState = await AsyncStorage.getItem(NAVIGATION_STATE_KEY);
        if (savedState) {
          setInitialNavState(JSON.parse(savedState) as InitialState);
        }
      } finally {
        setIsNavStateReady(true);
      }
    };

    restoreNavigationState();
  }, []);

  if (!isNavStateReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ProfileProvider>
        <NavigationContainer
          initialState={initialNavState}
          onStateChange={(state) => {
            if (!state) {
              return;
            }

            AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state)).catch(() => {
              // Ignore persistence failures to keep navigation responsive.
            });
          }}
        >
          <StatusBar style="light" backgroundColor={colors.primary} />
          <AppNavigator />
        </NavigationContainer>
      </ProfileProvider>
    </SafeAreaProvider>
  );
}
