import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { UserContext } from "../../AppContext";

export default BottomComponent = ({ userObj, handleClick }) => {
  const { setUser } = useContext(UserContext);

  return (
    <View className="w-screen flex-col justify-between items-center h-2/4">
      <TouchableOpacity
        title={"Sign Out"}
        className=" justify-center items-center p-3 rounded-md bg-slate-600 w-4/12 "
        activeOpacity={0.7}
        onPress={() => {
          setUser(null);
        }}
      >
        <Text className="text-white text-l font-medium">Sign Out</Text>
      </TouchableOpacity>

      <TouchableOpacity
        title={"Favourites"}
        className=" justify-center items-center p-3 rounded-md bg-slate-600 w-4/12 "
        activeOpacity={0.7}
        onPress={() => handleClick(true)}
      >
        <Text className="text-white text-l font-medium">My Favourites</Text>
      </TouchableOpacity>
      <TouchableOpacity
        title={"Spots"}
        className=" justify-center items-center p-3 rounded-md bg-slate-600 w-4/12 "
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
