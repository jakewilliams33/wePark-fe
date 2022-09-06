import React from "react";
import { View, StyleSheet, Image, Text, Button } from "react-native";

export const SearchScreen = ({ navigation, route }) => {
  return (
    <View navigation={navigation}>
      <Text>This is the Search Page</Text>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
      <Button
        title={"Home"}
        activeOpacity={0.7}
        onPress={() => navigation.push("Map")}
        containerStyle={styles.touchableOpacityStyle}
        style={styles.touchableOpacityStyle}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 100,
    marginBottom: 180,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  touchableOpacityStyle: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 800,
    marginLeft: 179,
    padding: 20,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50,
  },
});
