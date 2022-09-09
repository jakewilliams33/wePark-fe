import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";

export default LoginComponent = ({
  handlePress,
  text6,
  text7,
  onChangeText6,
  onChangeText7,
  handleLoginSubmit,
}) => {
  return (
    <>
      <View className="flex-1 items-center justify-center bg-white w-screen ">
        <View className="mx-5 ">
          <TouchableOpacity
            className=" p-2 rounded-md bg-slate-400 h-10 w-20 justify-center items-center"
            onPress={(event) => {
              event.destination = "Main";
              handlePress(event);
            }}
          >
            <Text className="text-white text-l font-medium">Back</Text>
          </TouchableOpacity>
        </View>

        <SafeAreaView className="w-8/12 rounded-md border-2 border-slate-400 mt-10">
          <TextInput
            className="rounded-md"
            onChangeText={onChangeText6}
            value={text6}
          />
          <Text className="border-t-2 border-slate-400 bg-slate-400 text-white text-l font-medium py-1 text-center">
            Username
          </Text>
        </SafeAreaView>
        <SafeAreaView className="w-8/12 rounded-md border-2 border-slate-400 mt-2 mb-10">
          <TextInput
            className="rounded-md shadow-xl"
            onChangeText={onChangeText7}
            value={text7}
          />
          <Text className="border-t-2 border-slate-400 bg-slate-400 text-white text-l font-medium py-1 text-center">
            Password
          </Text>
        </SafeAreaView>
        <View className="mx-5 ">
          <TouchableOpacity
            className=" p-2 rounded-md bg-slate-400 h-10 w-20 justify-center items-center"
            onPress={() => {
              handleLoginSubmit();
            }}
          >
            <Text className="text-white text-l font-medium">Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
