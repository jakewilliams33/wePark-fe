import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
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

export default function UserScreen({ navigation }) {
  const [isInfoScreen, setIsInfoScreen] = useState(true);
  const [isFavScreen, setIsFavScreen] = useState();
  const { user, setUser } = useContext(UserContext);
  const [spots, setSpots] = useState();
  const [favs, setFavs] = useState();
  const [spotsError, toggleSpotsError] = useState(false);
  const [IDtoFav, setIDToFav] = useState();
  const [addToFavs, toggleAddToFavs] = useState(false);
  const [IDtoUnFav, setIDToUnFav] = useState();
  const [unFav, toggleUnFav] = useState(false);
  const [IDtoDelete, setIDtoDelete] = useState();
  const [shouldDelete, toggleShouldDelete] = useState(false);

  const handleClick = (bool) => {
    setIsFavScreen(bool);
    setIsInfoScreen(false);
  };

  const handleBack = () => {
    setIsInfoScreen(true);
  };

  const handleDelete = (event) => {
    const spot_id = event.spot_id;
    setIDtoDelete(spot_id);
    toggleShouldDelete(true);
  };

  const handleFavPress = (event) => {
    const spot_id = event.spot_id;
    setIDToFav(spot_id);
    toggleAddToFavs(true);
  };

  const handleUnFavPress = (event) => {
    const spot_id = event.spot_id;
    setIDToUnFav(spot_id);
    toggleUnFav(true);
  };

  useEffect(() => {
    if (addToFavs) {
      const spot = IDtoFav;
      toggleAddToFavs(false);
      setIDToFav(null);
      axios
        .post(`https://wepark-be.herokuapp.com/api/users/${user}/favourites`, {
          spot_id: IDtoFav,
        })
        .then(() => {
          console.log("FAV WORKED");
        });
    }
  }, [addToFavs]);

  // useEffect(() => {
  //   if (unFav) {
  //     axios.delete("");
  //   }
  // }, [unFav]);

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
          return setSpots(spots);
        })
        .catch((err) => {
          console.log("Error in UserScreen, in getSpots useEffect", err.config);
        });
    }
  }, [isFavScreen, isInfoScreen]);

  useEffect(() => {
    if (!isInfoScreen && isFavScreen) {
      axios
        .get(
          `https://wepark-be.herokuapp.com/api/users/${user.username}/favourites`
        )
        .then((response) => {
          return response.data;
        })
        .then((favs) => {
          return setFavs(favs);
        })
        .catch((err) => {
          console.log(
            "Error in UserScreen, in getfavourites useEffect",
            err.config
          );
        });
    }
  }, [isFavScreen, isInfoScreen]);

  useEffect(() => {
    if (shouldDelete) {
      console.log("beginning delete request, -->> IDtoDelete: ", IDtoDelete);
      const spot = IDtoDelete;
      setIDtoDelete(null);
      toggleShouldDelete(false);
      axios
        .delete(`https://wepark-be.herokuapp.com/api/spots/${IDtoDelete}`)
        .then(() => {
          console.log("hits the .then");
          const newSpots = spots.spots.filter(
            (spot) => !spot.spot_id === IDtoDelete
          );

          console.log("HERE ARE YOUR NEW SPOTS", spots);
          return setSpots(newSpots);
        })
        .catch((err) => {
          console.log("Error in UserScreen, in delete spot useEffect", err);
        });
    }
  }, [shouldDelete]);

  const Card = ({
    isFavScreen,
    isInfoScreen,
    handleDelete,
    handleFavPress,
    spots,
    favs,
  }) => {
    let content;

    if (!isInfoScreen) {
      if (isFavScreen) {
        content = (
          <View className="flex-col">
            <Text className="text-xl text-center font-bold color-slate-600 mb-4">
              Favourites
            </Text>
            <SpotsComponent
              className=" w-screen"
              spotsObj={favs}
              handleFavPress={handleUnFavPress}
              handleDelete={handleDelete}
            />

            <View className="w-screen items-center justify-start ">
              <TouchableOpacity
                title={"Spots"}
                className=" rounded-md bg-slate-400 h-12 w-24 justify-center items-center"
                activeOpacity={0.7}
                onPress={handleBack}
              >
                <Text className="text-xl text-white font-medium ">Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      } else {
        content = (
          <>
            <Text className="text-xl text-center font-bold color-slate-600 mb-4">
              Your Spots
            </Text>
            <SpotsComponent
              className="  w-screen"
              spotsObj={spots}
              handleFavPress={handleFavPress}
              handleDelete={handleDelete}
            />

            <View className="w-screen items-center justify-center ">
              <TouchableOpacity
                title={"Spots"}
                className=" rounded-md bg-slate-600 h-12 w-24 justify-center items-center"
                activeOpacity={0.7}
                onPress={handleBack}
              >
                <Text className="text-xl text-white font-medium ">Back</Text>
              </TouchableOpacity>
            </View>
          </>
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
        <View className="flex-column items-center justify-evenly h-screen mt-8">
          <View className=" flex-row items-center justify-evenly w-screen mb-4 rounded-lg bg-slate-400 py-3 w-10/12">
            <Image
              className="w-32 h-32 rounded-full "
              source={{
                uri: user.avatar || noUserObject.avatar,
              }}
            />
            <View>
              <Text className="text-l text-white font-medium mt-2">
                Username: {user.username}
              </Text>
              <Text className="text-l text-white font-medium mt-2">
                bio: {user.about}
              </Text>
              <Text className="text-l text-white font-medium mt-2">
                Kudos: {user.kudos}
              </Text>
            </View>
          </View>

          <Card
            className=""
            isFavScreen={isFavScreen}
            isInfoScreen={isInfoScreen}
            handleDelete={handleDelete}
            handleFavPress={handleFavPress}
            spots={spots}
            favs={favs}
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
