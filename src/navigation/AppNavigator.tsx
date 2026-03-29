import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { LandingScreen } from "../screens/LandingScreen";
import { ImpactDashboardScreen } from "../screens/ImpactDashboardScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { ServiceAnalysisReportScreen } from "../screens/ServiceAnalysisReportScreen";
import { colors, radius, spacing } from "../theme/colors";
import { typography } from "../theme/typography";

export type AppTabParamList = {
  Home: undefined;
  Security: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  Landing: undefined;
  ServiceAnalysisReport: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ServiceAnalysisReport"
        component={ServiceAnalysisReportScreen}
        options={{ title: "Service Analysis Report" }}
      />
    </HomeStack.Navigator>
  );
}

function AppTabBar(props: BottomTabBarProps) {
  const activeRoute = props.state.routes[props.state.index];

  if (activeRoute.name === "Home") {
    const focusedHomeRoute = getFocusedRouteNameFromRoute(activeRoute) ?? "Landing";
    if (focusedHomeRoute === "Landing") {
      return null;
    }
  }

  return (
    <View style={styles.tabBarWrap}>
      {props.state.routes.map((route, index) => {
        const isFocused = props.state.index === index;
        const descriptor = props.descriptors[route.key];
        const iconColor = isFocused ? colors.onPrimary : colors.onSurfaceVariant;

        const onPress = () => {
          const event = props.navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate(route.name);
          }
        };

        return (
          <Pressable key={route.key} style={styles.tabItem} onPress={onPress}>
            <View style={isFocused ? styles.activePill : styles.inactivePill}>
              {descriptor.options.tabBarIcon?.({
                focused: isFocused,
                color: iconColor,
                size: 20
              })}
            </View>
            <Text style={[styles.tabLabel, { color: isFocused ? colors.primary : colors.onSurfaceVariant }]}>
              {String(descriptor.options.tabBarLabel ?? route.name)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function AppNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props: BottomTabBarProps) => <AppTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Security"
        component={ImpactDashboardScreen}
        options={{
          tabBarLabel: "Security",
          tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => (
            <Ionicons
              name={focused ? "shield-checkmark" : "shield-checkmark-outline"}
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          )
        }}
/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarWrap: {
    flexDirection: "row",
    paddingHorizontal: spacing[4],
    paddingTop: spacing[2],
    paddingBottom: spacing[3],
    backgroundColor: "rgba(244, 250, 255, 0.96)",
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    gap: spacing[1]
  },
  activePill: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1]
  },
  inactivePill: {
    borderRadius: radius.md,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1]
  },
  tabLabel: {
    ...typography.labelSm
  }
});
