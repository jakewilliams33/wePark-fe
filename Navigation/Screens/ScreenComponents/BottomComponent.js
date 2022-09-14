import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { UserContext } from '../../AppContext';

export default BottomComponent = ({ userObj, handleClick }) => {
  const { setUser } = useContext(UserContext);

  return (
    <View className="w-screen flex-col justify-between items-center h-2/4">
      <TouchableOpacity
        title={'Sign Out'}
        className=" p-2  rounded-md shadow-md bg-slate-600 h-10 w-40 justify-center items-center"
        style={styles.shadow}
        activeOpacity={0.7}
        onPress={() => {
          setUser(null);
        }}
      >
        <Text className="text-white text-l font-medium">Sign Out</Text>
      </TouchableOpacity>

      <TouchableOpacity
        title={'Favourites'}
        className=" p-2 rounded-md shadow-md bg-slate-600 h-10 w-40 justify-center items-center"
        style={styles.shadow}
        activeOpacity={0.7}
        onPress={() => handleClick(true)}
      >
        <Text className="text-white text-l font-medium">My Favourites</Text>
      </TouchableOpacity>
      <TouchableOpacity
        title={'Spots'}
        className=" p-2 rounded-md shadow-md bg-slate-600 h-10 w-40 justify-center items-center"
        style={styles.shadow}
        activeOpacity={0.7}
        onPress={() => {
          handleClick(false);
        }}
      >
        <Text className="text-white text-l font-medium">My Spots</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0.5,
      height: -4.5,
    },
    shadowOpacity: 0.29,
    shadowRadius: 8.65,
    elevation: 4,
    border: 0,
  },

  inner_input: {
    height: 30,
    borderRadius: 50,
    border: 0,
  },
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
