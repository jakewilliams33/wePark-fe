import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default SpotsComponent = ({ spotsObj, handleBack }) => {
  return (
    <View className="h-4/5 w-screen justify-evenly  ">
      {spotsObj.spots.map((spot) => {
        return (
          <View
            className="flex-1  bg-slate-400 border-slate-400 flex-col items-center justify-evenlys border-2  mt-3 ml-5 mr-5 rounded-md"
            key={spot.id}
          >
            <Text className="text-xl text-white font-medium mt-1">
              Name: {spot.spotName}
            </Text>
            <Text className="text-xl text-white font-medium mt-1">
              latitude: {spot.latitude}
            </Text>
            <Text className="text-xl text-white font-medium mt-1">
              longitude: {spot.longitude}
            </Text>
          </View>
        );
      })}
      <View className="w-screen items-center justify-evenly  h-2/5">
        <TouchableOpacity
          title={"Spots"}
          className=" p-2 rounded-md bg-slate-400 h-12 w-24 justify-center items-center"
          activeOpacity={0.7}
          onPress={handleBack}
        >
          <Text className="text-xl text-white font-medium ">Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
