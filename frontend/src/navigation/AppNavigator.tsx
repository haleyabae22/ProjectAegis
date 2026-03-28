import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { BottomNav } from "../components/BottomNav";
import { ImpactDashboardScreen } from "../screens/ImpactDashboardScreen";
import { LandingScreen } from "../screens/LandingScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { colors } from "../theme/colors";

export type AppTabParamList = {
  Home: undefined;
  Security: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

export function AppNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNav {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.text.primary,
        headerTitleStyle: { fontWeight: "700" }
      }}
    >
      <Tab.Screen name="Home" component={LandingScreen} />
      <Tab.Screen name="Security" component={ImpactDashboardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
