import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";
import axios from "axios";

export default LoginScreen = () => {
  const [screenToDisplay, setScreenToDisplay] = useState("Main");
  const [text1, onChangeText1] = React.useState("Username");
  const [text2, onChangeText2] = React.useState("Email Address");
  const [text3, onChangeText3] = React.useState("A few Words About Yourself");
  const [text4, onChangeText4] = React.useState("A link to a picture of you");

  const handleSignUpSubmit = () => {};
  const handlePress = (event) => {
    const dest = event.destination;
    setScreenToDisplay(dest);
  };

  switch (screenToDisplay) {
    case "Main":
      return (
        <>
          <View className="flex-1 items-center justify-center bg-white w-screen ">
            <View className=" flex-1 flex-col justify-end items-center basis-2/4 w-screen border-2 border-red-400">
              <Text className="text-xl text-slate-600 font-medium ">
                Login or Sign Up
              </Text>
            </View>

            <View className=" flex-1 flex-col justify-start items-center basis-3/4 w-screen border-2 border-red-400 pt-10">
              <View className="flex-row justify-center  w-screen">
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
                    <Text className="text-white text-l font-medium">
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </>
      );

      break;

    case "Login":
      return (
        <>
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
        </>
      );
      break;

    case "Sign Up":
      return (
        <>
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
              onChangeText={onChangeText1}
              value={text1}
            />
          </SafeAreaView>
          <SafeAreaView className="w-8/12 ">
            <TextInput
              className="rounded-md shadow-xl"
              style={styles.input}
              onChangeText={onChangeText2}
              value={text2}
            />
          </SafeAreaView>
          <SafeAreaView className="w-8/12 ">
            <TextInput
              className="rounded-md shadow-xl"
              style={styles.input}
              onChangeText={onChangeText3}
              value={text3}
            />
          </SafeAreaView>
          <SafeAreaView className="w-8/12 ">
            <TextInput
              className="rounded-md shadow-xl"
              style={styles.input}
              onChangeText={onChangeText4}
              value={text4}
            />
          </SafeAreaView>
          <View className="mx-5 ">
            <TouchableOpacity
              className=" p-2 rounded-md bg-slate-400 h-10 w-20 justify-center items-center"
              onPress={() => {
                handleSignUpSubmit();
              }}
            >
              <Text className="text-white text-l font-medium">Submit</Text>
            </TouchableOpacity>
          </View>
        </>
      );
      break;
  }
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    elevation: 2,
  },
});
