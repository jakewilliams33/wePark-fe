import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default BottomComponent = ({ userObj, handleClick, styles }) => {
  return (
    <View style={styles.bottom}>
      <Text style={styles.userInfo}>Username: {userObj.username}</Text>
      <Text style={styles.userInfo}>{userObj.full_name}</Text>
      <Text style={styles.userInfo}>bio: {userObj.bio}</Text>
      <Text style={styles.userInfo}>Hometown: {userObj.hometown}</Text>
      <Text style={styles.userInfo}>Kudos: {userObj.kudos}</Text>
      <TouchableOpacity
        title={"Favourites"}
        activeOpacity={0.7}
        onPress={() => handleClick(true)}
        containerStyle={styles.touchableOpacityStyle}
        style={styles.touchableOpacityStyle}
      >
        <Text style={{ color: "white" }}>My Favourites</Text>
      </TouchableOpacity>
      <TouchableOpacity
        title={"Spots"}
        activeOpacity={0.7}
        onPress={() => {
          handleClick(false);
        }}
        containerStyle={styles.touchableOpacityStyle}
        style={styles.touchableOpacityStyle}
      >
        <Text style={{ color: "white" }}>My Spots</Text>
      </TouchableOpacity>
    </View>
  );
};
