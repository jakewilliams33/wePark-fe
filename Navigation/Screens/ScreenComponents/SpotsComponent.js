import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserContext, SpotContext } from '../../AppContext';
import axios from 'axios';

const SpotsItem = ({
  spot,
  handleFavPress,
  handleDelete,
  handleUnFavPress,
}) => {
  const { user } = useContext(UserContext);
  const { setContextSpot } = useContext(SpotContext);
  const [callMapScreen, toggleCallMapScreen] = useState(false);
  const [spotToNavTo, setSpotToNavTo] = useState();

  const navigation = useNavigation();

  const handleNavToSpot = (event) => {
    // const spotContextArr = [event.spot_id, event.latitude, event.longitude];
    // setContextSpot(spotContextArr);
    console.log('in UserScreen-SpotsComponent, Calling useEffect');
    setSpotToNavTo(event.spot_id);
    toggleCallMapScreen(true);
    // navigation.navigate('Map');
  };

  useEffect(() => {
    if (callMapScreen) {
      toggleCallMapScreen(false);
      axios
        .get(`https://wepark-be.herokuapp.com/api/spots/${spotToNavTo}`)
        .then(({ data }) => {
          return data;
        })
        .then(({ spot }) => {
          setContextSpot(spot);
          setSpotToNavTo(null);
          navigation.navigate('Map');
        })
        .catch(function (error) {
          console.log('ERROR IN getSingleSpot, in SpotsComponent', error);
        });
    }
  }, [callMapScreen]);

  // const favsArray = user.favourites || [];
  useEffect(() => {}, [user.favourites]);
  return (
    <View
      className="bg-slate-400 border-slate-400 flex-col items-center justify-evenly border-2  pl-2 pb-2 mt-3 ml-5 mr-5 rounded-md"
      key={spot.item.id}
    >
      <View className="flex-row">
        <View className=" bg-slate-400 border-slate-400 flex-col  items-start justify-evenly">
          <Text className="text-m text-white flex-wrap font-medium mt-1">
            Name:{' '}
            {spot.item.name.length > 20
              ? spot.item.name.substring(0, 20) + '... '
              : spot.item.name + ',  '}
          </Text>
          <Text className="text-m text-white font-medium mt-1">
            Co-ords: {('' + spot.item.latitude).substring(0, 10)}
            {', '}
            {('' + spot.item.longitude).substring(0, 10)}
            {',  '}
          </Text>

          <View className="flex-row justify-between">
            <Text className="text-m text-white font-medium mt-1">
              Type: {spot.item.parking_type}
              {',  '}
            </Text>
            <Text className="text-m text-white font-medium mt-1">
              Votes: {spot.item.vote_count}
              {',  '}
            </Text>
          </View>
          <TouchableOpacity
            className="  mt-2 rounded-md bg-slate-600 h-10 w-10/12 px-2 flex-row justify-center items-center"
            onPress={(event) => {
              event.spot_id = spot.item.spot_id;
              event.latitude = spot.item.latitude;
              event.longitude = spot.item.longitude;
              handleNavToSpot(event);
            }}
          >
            <Ionicons name="md-globe" size={20} color="white" />
            <Text className="text-m text-white font-medium text-center">
              {'   '}
              See More
            </Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView className="flex-col justify-between items-center mt-2">
          {user.favourites.includes(spot.item.spot_id) ? (
            <TouchableOpacity
              className=" ml-2 rounded-md bg-slate-600 h-14 w-14 justify-center items-center"
              onPress={(event) => {
                event.spot_id = spot.item.spot_id;
                handleUnFavPress(event);
              }}
            >
              <Ionicons name="star" size={20} color="yellow" />
              <Text className="text-m text-white font-medium text-center">
                Remove
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className=" ml-2 rounded-md bg-slate-600 h-14 w-14 justify-center items-center"
              onPress={(event) => {
                event.spot_id = spot.item.spot_id;
                handleFavPress(event);
              }}
            >
              <Ionicons name="star-outline" size={20} color="white" />
              <Text className="text-m text-white font-medium text-center">
                Add
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            className=" ml-2 rounded-md bg-slate-600 h-10 mt-1 w-14 justify-center items-center"
            onPress={(event) => {
              event.spot_id = spot.item.spot_id;
              handleDelete(event);
            }}
          >
            <Text className="text-m text-white font-medium text-center">
              Delete
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default SpotsComponent = ({
  spotsObj,
  handleFavPress,
  handleDelete,
  handleUnFavPress,
}) => {
  const renderItem = (spot) => {
    return (
      <SpotsItem
        spot={spot}
        handleDelete={handleDelete}
        handleFavPress={handleFavPress}
        key={spot.spot_id}
        handleUnFavPress={handleUnFavPress}
      />
    );
  };

  return (
    <View className="flex-col border-slate-400 border-y-2 items-center h-3/5 mb-2">
      {spotsObj ? (
        <SafeAreaView className="w-11/12  ">
          <FlatList
            data={spotsObj.spots}
            renderItem={renderItem}
            keyExtractor={(spot) => spot.spot_id}
          />
        </SafeAreaView>
      ) : null}
    </View>
  );
};
