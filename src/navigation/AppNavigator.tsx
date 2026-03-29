import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
const TITLE_TOP_BUFFER = 48;
const TITLE_LEFT_BUFFER = 24;
const TITLE_BAR_HEIGHT = 84;

const sharedHeaderOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: "#001f3f",
  },
  headerTitleAlign: "left" as const,
  headerTintColor: "#D4AF37",
  headerTitleContainerStyle: {
    paddingTop: TITLE_TOP_BUFFER,
    height: TITLE_BAR_HEIGHT,
  },
  headerTitleStyle: {
    fontWeight: "700" as const,
    fontSize: 35,
    color: "#D4AF37",
  },
  headerShadowVisible: false,
};

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
        options={{
          title: "Service Analysis Report",
          ...sharedHeaderOptions
        }}
      />
    </HomeStack.Navigator>
  );
}

function AppTabBar(props: BottomTabBarProps) {
  const [hoveredRouteKey, setHoveredRouteKey] = React.useState<string | null>(null);
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
        const iconColor = isFocused ? "#D4AF37" : "#9A7B1C";

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
          <Pressable
            key={route.key}
            style={[styles.tabItem, hoveredRouteKey === route.key && styles.tabItemHover]}
            onHoverIn={() => setHoveredRouteKey(route.key)}
            onHoverOut={() => setHoveredRouteKey((curr) => (curr === route.key ? null : curr))}
            onPress={onPress}
          >
            <View style={isFocused ? styles.activePill : styles.inactivePill}>
              {descriptor.options.tabBarIcon?.({
                focused: isFocused,
                color: iconColor,
                size: 20
              })}
            </View>
            <Text style={[styles.tabLabel, { color: isFocused ? "#D4AF37" : "#9A7B1C" }]}>
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
        headerShown: false, // tabs hide header by default
        tabBarActiveTintColor: "#D4AF37",
        tabBarInactiveTintColor: "#9A7B1C",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator} // Stack handles headers internally
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Security"
        component={ImpactDashboardScreen}
        options={{
          title: "Impact Dashboard",
          tabBarLabel: "Impact",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "stats-chart" : "stats-chart-outline"}
              size={size}
              color={color}
            />
          ),
          ...sharedHeaderOptions,
          headerTitleContainerStyle: {
            height: TITLE_BAR_HEIGHT,
            paddingLeft: TITLE_LEFT_BUFFER,
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "User Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
          ...sharedHeaderOptions,
          headerTitleContainerStyle: {
            height: TITLE_BAR_HEIGHT,
            paddingLeft: TITLE_LEFT_BUFFER,
          },
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
    backgroundColor: "#001f3f"
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    gap: spacing[1]
  },
  tabItemHover: {
    backgroundColor: "rgba(212, 175, 55, 0.1)",
    borderRadius: radius.md,
  },
  activePill: {
    backgroundColor: "#002061",
    borderWidth: 2,
    borderColor: "#D4AF37",
    borderRadius: radius.md,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1]
  },
  inactivePill: {
    backgroundColor: "transparent",
    borderRadius: radius.md,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1]
  },
  tabLabel: {
    ...typography.labelSm,
    fontWeight: "700"
  }
});
