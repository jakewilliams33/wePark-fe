import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import SpotsComponent from "./ScreenComponents/SpotsComponent";
import BottomComponent from "./ScreenComponents/BottomComponent";
import LoginScreen from "./LoginScreen";

import axios from "axios";
import { UserContext } from "../AppContext";

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

const noSpotsObject = {
  spots: [{ id: 0, spotName: "Waiting for Spots", latitude: 0, longitude: 0 }],
};

export default function UserScreen({ navigation }) {
  const [isInfoScreen, setIsInfoScreen] = useState(true);
  const [isFavScreen, setIsFavScreen] = useState();
  const { user, setUser } = useContext(UserContext);
  const [spots, setSpots] = useState();
  const [spotsError, toggleSpotsError] = useState(false);

  const handleClick = (bool) => {
    setIsFavScreen(bool);
    setIsInfoScreen(false);
  };

  const handleBack = () => {
    setIsInfoScreen(true);
  };

  useEffect(() => {
    if (!isInfoScreen && !isFavScreen) {
      axios
        .get("https://wepark-be.herokuapp.com/api/spots", {
          params: { creator: user.username, radius: 1000000000 },
        })
        .then((response) => {
          return response.data;
        })
        .then((spots) => {
          console.log(
            "in UserScreen get spots useEffect --->> spots, user.username",
            spots,
            user.username
          );
          return setSpots(spots);
        })
        .catch((err) => {
          console.log("Error in UserScreen, in getSpots useEffect", err.config);
        });
    }
  }, [isFavScreen, isInfoScreen]);

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
            spotsObj={spots || noSpotsObject}
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
