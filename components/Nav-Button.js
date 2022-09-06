import React from "react";
import { StyleSheet, Button } from "react-native";

const NavButton = ({ destination, func }) => {
  return (
    <Button
      title={destination}
      activeOpacity={0.7}
      onPress={(event) => {
        event.buttonValue = destination;
        func(event);
      }}
      containerStyle={styles.touchableOpacityStyle}
      style={styles.touchableOpacityStyle}
    ></Button>
  );
};

export default NavButton;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 400,
    marginBottom: 400,
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
