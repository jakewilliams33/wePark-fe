import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default MainLoginComponent = ({ handlePress }) => {
  return (
    <>
      <View className="flex-1 items-center justify-center bg-white w-screen ">
        <View className=" flex-1 flex-col justify-end  bg-white items-center basis-2/4 w-screen">
          <Text className="text-xl text-slate-600 font-medium ">
            Login or Sign Up
          </Text>
        </View>

        <View className=" flex-1 flex-col bg-white justify-start items-center basis-3/4 w-screen pt-10">
          <View className="flex-row justify-center bg-white w-screen">
            <TouchableOpacity
              className=" p-2 mx-4 shadow-md rounded-md bg-white h-10 w-20 justify-center items-center"
              style={styles.shadow}
              onPress={(event) => {
                event.destination = 'Login';
                handlePress(event);
              }}
            >
              <Text className="text-[#2D8CFF] text-l font-medium">Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className=" p-2 mx-4 rounded-md shadow-md bg-white h-10 w-20 justify-center items-center"
              style={styles.shadow}
              onPress={(event) => {
                event.destination = 'Sign Up';
                handlePress(event);
              }}
            >
              <Text className="text-[#2D8CFF] text-l font-medium">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
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
