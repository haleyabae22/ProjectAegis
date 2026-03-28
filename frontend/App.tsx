import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./src/navigation/AppNavigator";
import { colors } from "./src/theme/colors";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor={colors.primary} />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
