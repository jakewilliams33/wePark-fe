import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

//screens
import HomeScreen from "./Screens/HomeScreen";
import MapScreen from "./Screens/MapScreen";
import UserScreen from "./Screens/UserScreen";
import { UserProvider, UserContext } from "./AppContext";

//screen names
const homeName = "Home";
const mapName = "Map";
const userPageName = "User";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={UserContext ? homeName : LoginName}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;

              if (rn === homeName) {
                iconName = focused ? "home" : "home-outline";
              } else if (rn === mapName) {
                iconName = focused ? "map" : "map-outline";
              } else if (rn === userPageName) {
                iconName = focused ? "person" : "person-outline";
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
    </UserProvider>
  );
}

export { UserContext, MainContainer };
