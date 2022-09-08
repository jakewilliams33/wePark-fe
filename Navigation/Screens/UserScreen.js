import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import SpotsComponent from "./ScreenComponents/SpotsComponent";
import BottomComponent from "./ScreenComponents/BottomComponent";

import axios from "axios";

const testUserObject = {
  id: 4,
  username: "Test123",
  full_name: "Test Test",
  user_avatar_uri:
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3f01db52-f675-48dc-9c91-f245d99f1486/d2nqynw-af694fd2-e1ba-4e9c-badb-630a48474599.jpg/v1/fill/w_950,h_633,q_75,strp/random_person_by_vurtov_d2nqynw-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjMzIiwicGF0aCI6IlwvZlwvM2YwMWRiNTItZjY3NS00OGRjLTljOTEtZjI0NWQ5OWYxNDg2XC9kMm5xeW53LWFmNjk0ZmQyLWUxYmEtNGU5Yy1iYWRiLTYzMGE0ODQ3NDU5OS5qcGciLCJ3aWR0aCI6Ijw9OTUwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.c2w8ijUJquyo71KU-F_oxYiyQ7m5RjWAvFeMvkqFUwY",
  bio: "I've seen some Shit",
  hometown: "Manchester",
  kudos: 69,
};

const testFavouritesObject = {
  spots: [
    { id: 1, spotName: "randomSpot1", latitude: 55.3781, longitude: -3.436 },
    { id: 2, spotName: "randomSpot2", latitude: 54.3781, longitude: -4.436 },
  ],
};

const testMySpotsObject = {
  spots: [
    { id: 1, spotName: "randomSpot1", latitude: 55.3781, longitude: -3.436 },
    { id: 2, spotName: "randomSpot2", latitude: 54.3781, longitude: -4.436 },
  ],
};

export default function UserScreen({ navigation }) {
  const [isInfoScreen, setIsInfoScreen] = useState(true);
  const [isFavScreen, setIsFavScreen] = useState();

  const handleClick = (bool) => {
    console.log("hitting handleclick");
    setIsFavScreen(bool);
    setIsInfoScreen(false);
  };

  const handleBack = () => {
    setIsInfoScreen(true);
  };

  useEffect(() => {
    console.log(
      "in useEffect -> isInfoScreen, isFavScreen:",
      isInfoScreen,
      isFavScreen
    );
  }, [isInfoScreen, isFavScreen]);

  const Card = ({ isFavScreen, isInfoScreen }) => {
    let content;

    if (!isInfoScreen) {
      if (isFavScreen) {
        content = (
          <SpotsComponent
            spotsObj={testFavouritesObject}
            handleBack={handleBack}
            styles={styles}
          />
        );
      } else {
        content = (
          <SpotsComponent
            spotsObj={testMySpotsObject}
            handleBack={handleBack}
            styles={styles}
          />
        );
      }
    } else {
      content = (
        <BottomComponent
          userObj={testUserObject}
          handleClick={handleClick}
          styles={styles}
        />
      );
    }

    return <View>{content}</View>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          style={styles.profilePic}
          source={{
            uri: testUserObject.user_avatar_uri,
          }}
        />
      </View>

      <Card isFavScreen={isFavScreen} isInfoScreen={isInfoScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  profilePic: {
    width: 250,
    height: 250,
  },
  userInfo: {},
  touchableOpacityStyle: {
    marginTop: 10,
    padding: 20,

    backgroundColor: "black",
  },
  top: {},
  bottom: {},
  spots: {},
});
