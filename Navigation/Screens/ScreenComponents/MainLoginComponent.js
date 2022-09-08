import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default MainLoginComponent = ({ handlePress }) => {
  return (
    <>
      <View className="flex-1 items-center justify-center bg-white w-screen ">
        <View className=" flex-1 flex-col justify-end items-center basis-2/4 w-screen">
          <Text className="text-xl text-slate-600 font-medium ">
            Login or Sign Up
          </Text>
        </View>

        <View className=" flex-1 flex-col justify-start items-center basis-3/4 w-screen pt-10">
          <View className="flex-row justify-center w-screen">
            <View className="mx-5 ">
              <TouchableOpacity
                className=" p-2 rounded-md bg-slate-400 h-10 w-20 justify-center items-center"
                onPress={(event) => {
                  event.destination = "Login";
                  handlePress(event);
                }}
              >
                <Text className="text-white text-l font-medium">Login</Text>
              </TouchableOpacity>
            </View>

            <View className="mx-5 ">
              <TouchableOpacity
                className=" p-2 rounded-md bg-slate-400 h-10 w-20 justify-center items-center"
                onPress={(event) => {
                  event.destination = "Sign Up";
                  handlePress(event);
                }}
              >
                <Text className="text-white text-l font-medium">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
