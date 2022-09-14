import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SpotContext, HistoryContext } from '../AppContext';
import axios from 'axios';

export default NavSpotButton = ({ spot }) => {
  const { setContextSpot } = useContext(SpotContext);
  const [callMapScreen, toggleCallMapScreen] = useState(false);
  const [spotToNavTo, setSpotToNavTo] = useState();
  const { history, setHistory } = useContext(HistoryContext);
  const navigation = useNavigation();

  const handleNavToSpot = (event) => {
    console.log('in NavSpotButton, Calling useEffect');
    setSpotToNavTo(event.spot_id);
    toggleCallMapScreen(true);
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

          if (history.length > 0) {
            let pushToHistory = true;
            for (const thisSpot of history) {
              if (thisSpot.spot_id === spot.spot_id) {
                pushToHistory = false;
              }
            }
            if (pushToHistory) {
              const newHistory = history;
              newHistory.push(spot);
              setHistory((curr) => [...curr, spot]);
            }
          } else setHistory([spot]);
          navigation.navigate('Map');
        })
        .catch(function (error) {
          console.log('ERROR IN NavSpotButton, Spot: err:', spot, error);
        });
    }
  }, [callMapScreen]);

  return (
    <TouchableOpacity
      className="  mt-2 rounded-md bg-slate-600 h-8 w-30 px-2 flex-row justify-center items-center "
      onPress={(event) => {
        event.spot_id = spot.spot_id;
        event.latitude = spot.latitude;
        event.longitude = spot.longitude;
        handleNavToSpot(event);
      }}
      style={styles.shadow}
    >
      <Ionicons name="md-globe" size={20} color="white" />
      <Text className="text-m text-white font-medium text-center">
        {'  '}
        See More
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.59,
    shadowRadius: 6.65,
    elevation: 7,
  },
});
