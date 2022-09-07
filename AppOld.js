import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { UserScreen } from "./components/UserScreen";
import { SearchScreen } from "./components/SearchScreen";
import { MapScreen } from "./components/MapScreen";
import { useState, useEffect } from "react";
import NavButton from "./components/Nav-Button";

const App = () => {
  const [screen, toggleScreen] = useState("MapScreen");

  const handlePress = (event) => {
    console.log(event.buttonValue);
    toggleScreen(event.buttonValue);
  };

  useEffect(() => {}, [screen]);

  switch (screen) {
    case "MapScreen":
      return (
        <View style={styles.container}>
          <NavButton destination="UserScreen" func={handlePress} />
          <NavButton destination="SearchScreen" func={handlePress} />
          <MapScreen />
        </View>
      );
      break;

    case "UserScreen":
      return (
        <View style={styles.container}>
          <NavButton destination="MapScreen" func={handlePress} />
          <NavButton destination="SearchScreen" func={handlePress} />
          <UserScreen />
        </View>
      );
      break;

    case "HomeScreen":
      return (
        <View style={styles.container}>
          <NavButton destination="MapScreen" func={handlePress} />
          <NavButton destination="UserScreen" func={handlePress} />
          <SearchScreen />
        </View>
      );
      break;

    default:
      return <Text>Something Went Wrong!</Text>;
  }
};

export default App;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginTop: 150,
    marginBottom: 180,
  },
  touchableOpacityStyle: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    padding: 20,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50,
  },
});
