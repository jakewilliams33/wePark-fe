import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

//screens
import HomeScreen from "./Screens/HomeScreen";
import MapScreen from "./Screens/MapScreen";
import UserScreen from "./Screens/UserScreen";

//screen names
const homeName = "Home";
const mapName = "Map";
const userPageName = "User";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              icon = focused ? "home" : "home-outline";
            } else if (rn === mapName) {
              icon = focused ? "map" : "map-outline";
            } else if (rn === userPageName) {
              icon = focused ? "id-card" : "id-card-o";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={mapName} component={MapScreen} />
        <Tab.Screen name={userPageName} component={UserScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
