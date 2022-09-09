import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import SpotsComponent from "./ScreenComponents/SpotsComponent";
import BottomComponent from "./ScreenComponents/BottomComponent";
import LoginScreen from "./LoginScreen";

import axios from "axios";
import { UserContext } from "../AppContext";

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

const noUserObject = {
  username: "No User",
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkjktNk_waKZ6A064JikKQRYLxoKPNIUR_g&usqp=CAU",
  about: "Some random user bio",
  kudos: 0,
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
  const { user, setUser } = useContext(UserContext);

  const handleClick = (bool) => {
    setIsFavScreen(bool);
    setIsInfoScreen(false);
  };

  const handleBack = () => {
    setIsInfoScreen(true);
  };

  const Card = ({ isFavScreen, isInfoScreen }) => {
    let content;

    if (!isInfoScreen) {
      if (isFavScreen) {
        content = (
          <SpotsComponent
            className="h-2/4 flex-1 w-screen"
            spotsObj={testFavouritesObject}
            handleBack={handleBack}
          />
        );
      } else {
        content = (
          <SpotsComponent
            className="h-2/4 flex-1 w-screen"
            spotsObj={testMySpotsObject}
            handleBack={handleBack}
          />
        );
      }
    } else {
      content = (
        <BottomComponent
          userObj={user || noUserObject}
          handleClick={handleClick}
        />
      );
    }

    return <View>{content}</View>;
  };

  const WhichScreen = ({ isFavScreen, isInfoScreen, user }) => {
    if (user) {
      return (
        <View className="flex-1 flex-column items-center justify-evenly h-screen ">
          <View className="flex-2/4 flex-row items-center justify-evenly w-screen h-2/4">
            <Image
              className="w-32 h-32 rounded-full "
              source={{
                uri: user.avatar || noUserObject.avatar,
              }}
            />
            <View>
              <Text className="text-l text-slate-600 font-medium mt-2">
                Username: {user.username}
              </Text>
              <Text className="text-l text-slate-600 font-medium mt-2">
                bio: {user.about}
              </Text>
              <Text className="text-l text-slate-600 font-medium mt-2">
                Kudos: {user.kudos}
              </Text>
            </View>
          </View>

          <Card
            className="flex-2/4 "
            isFavScreen={isFavScreen}
            isInfoScreen={isInfoScreen}
          />
        </View>
      );
    } else return <LoginScreen />;
  };

  return (
    <WhichScreen
      isFavScreen={isFavScreen}
      isInfoScreen={isInfoScreen}
      user={user}
    />
  );
}
