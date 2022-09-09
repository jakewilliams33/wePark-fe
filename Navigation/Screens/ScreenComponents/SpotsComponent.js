import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

const SpotsItem = ({ spot }) => (
  <View
    className="bg-slate-400 border-slate-400 flex-col items-start justify-evenly border-2  pl-2 mt-3 ml-5 mr-5 rounded-md"
    key={spot.item.id}
  >
    <View className=" bg-slate-400 border-slate-400 flex-col items-start justify-evenly">
      <Text className="text-m text-white font-medium mt-1">
        Name: {spot.item.name}
        {",  "}
      </Text>
      <Text className="text-m text-white font-medium mt-1">
        latitude: {spot.item.latitude}
        {",  "}
      </Text>
      <Text className="text-m text-white font-medium mt-1">
        longitude: {spot.item.longitude}
        {",  "}
      </Text>
      <View className="flex-row justify-between">
        <Text className="text-m text-white font-medium mt-1">
          Type: {spot.item.parking_type}
          {",  "}
        </Text>
        <Text className="text-m text-white font-medium mt-1">
          Votes: {spot.item.vote_count}
          {",  "}
        </Text>
      </View>
    </View>
  </View>
);

export default SpotsComponent = ({ spotsObj }) => {
  const renderItem = (spot) => {
    console.log(spot);
    return <SpotsItem spot={spot} />;
  };

  return (
    <View className="flex-col border-slate-400 border-y-2 items-center h-3/5 mb-2">
      <SafeAreaView className="w-11/12  ">
        <FlatList
          data={spotsObj.spots}
          renderItem={renderItem}
          keyExtractor={(spot) => spot.id}
        />
      </SafeAreaView>
    </View>
  );
};
