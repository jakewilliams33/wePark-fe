import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default SpotsComponent = ({ spotsObj, handleBack, styles }) => {
  return (
    <View style={styles.spots}>
      {spotsObj.spots.map((spot) => {
        return (
          <View style={styles.spot} key={spot.id}>
            <Text>Name: {spot.spotName}</Text>
            <Text>latitude: {spot.latitude}</Text>
            <Text>longitude: {spot.longitude}</Text>
          </View>
        );
      })}
      <TouchableOpacity
        title={"Spots"}
        activeOpacity={0.7}
        onPress={handleBack}
        containerStyle={styles.touchableOpacityStyle}
        style={styles.touchableOpacityStyle}
      >
        <Text style={{ color: "white" }}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};
