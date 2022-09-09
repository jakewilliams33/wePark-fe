import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";

export default LoginComponent = ({
  styles,
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

        <SafeAreaView className="w-8/12 ">
          <TextInput
            className="rounded-md shadow-xl"
            style={styles.input}
            onChangeText={onChangeText6}
            value={text6}
          />
          <Text>Username</Text>
        </SafeAreaView>
        <SafeAreaView className="w-8/12 ">
          <TextInput
            className="rounded-md shadow-xl"
            style={styles.input}
            onChangeText={onChangeText7}
            value={text7}
          />
          <Text>Password</Text>
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
