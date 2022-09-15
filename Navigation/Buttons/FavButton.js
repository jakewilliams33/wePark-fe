import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../AppContext';
import axios from 'axios';

export default FavButton = ({ spot_id }) => {
  const [IDtoFav, setIDToFav] = useState();
  const [addToFavs, toggleAddToFavs] = useState(false);
  const [IDtoUnFav, setIDtoUnFav] = useState();
  const [unFav, toggleUnFav] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleFavPress = (event) => {
    console.log('in handleFavPress');
    const spot_id = event.spot_id;
    setIDToFav(spot_id);
    console.log(IDtoFav);
    toggleAddToFavs(true);
  };

  const handleUnFavPress = (event) => {
    console.log("handleUnFavPress hits, here's spot_id: ", event.spot_id);
    const spot_id = event.spot_id;
    setIDtoUnFav(spot_id);
    toggleUnFav(true);
  };

  //-----------------------------------------------------------------------------
  // POST USER FAV
  useEffect(() => {
    if (addToFavs) {
      const FAVSPOT = IDtoFav;
      console.log('Beginning POST fav request, spot_id-->>', FAVSPOT);
      toggleAddToFavs(false);
      setIDToFav(null);
      const newUser = user;
      newUser.favourites.push(FAVSPOT);
      setUser(newUser);
      axios
        .post(
          `https://wepark-be.herokuapp.com/api/users/${user.username}/favourites`,
          {
            spot_id: FAVSPOT,
          }
        )
        .then((response) => {
          return response.data;
        })
        .then((spot) => {
          console.log("FAV WORKED, here's the response -->>", spot);

          const newUser = user;
          newUser.favourites.push(FAVSPOT);
          return setUser(newUser);
        })
        .catch((err) => {
          console.log('Error in FavButton, in post Favs useEffect', err);
          const newUser = user;
          newUser.favourites = user.favourites.filter((fav) => fav !== FAVSPOT);
          return setUser(newUser);
        });
    }
  }, [addToFavs]);

  //--------------------------------------------------------------------------
  // DELETE USER FAV

  useEffect(() => {
    if (unFav && IDtoUnFav) {
      console.log('entering delete favourite');
      const unfavourableSpot = IDtoUnFav;
      setIDtoUnFav(null);
      toggleUnFav(false);
      const newUser = user;
      newUser.favourites = user.favourites.filter(
        (fav) => fav !== unfavourableSpot
      );
      setUser(newUser);
      axios
        .delete(
          `https://wepark-be.herokuapp.com/api/users/${user.username}/favourites/${unfavourableSpot}`
        )
        .then(() => {
          console.log('the Fav is gone');
        })
        .catch((err) => {
          console.log('Error in FavButton, in Delete Favs useEffect', err);
          const newUser = user;
          newUser.favourites = user.favourites.push(unfavourableSpot);
          setUser(newUser);
        });
    }
  }, [unFav]);

  return user !== null ? (
    spot_id && user.favourites.includes(spot_id) ? (
      <TouchableOpacity
        className=" ml-2 rounded-md bg-white h-14 w-14 justify-center items-center shadow-md"
        style={styles.shadow}
        onPress={(event) => {
          event.spot_id = spot_id;
          handleUnFavPress(event);
        }}
      >
        <Ionicons name="star" size={20} color="yellow" />
        <Text className="text-m text-[#2D8CFF] font-medium text-center">
          Remove
        </Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        className=" ml-2 rounded-md bg-white h-14 w-14 justify-center items-center"
        onPress={(event) => {
          event.spot_id = spot_id;
          handleFavPress(event);
        }}
      >
        <Ionicons name="star-outline" size={20} color="white" />
        <Text className="text-m text-[#2D8CFF] font-medium text-center">
          Add
        </Text>
      </TouchableOpacity>
    )
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0.5,
      height: -2.5,
    },
    shadowOpacity: 0.69,
    shadowRadius: 2.65,
    elevation: 4,
  },
});
