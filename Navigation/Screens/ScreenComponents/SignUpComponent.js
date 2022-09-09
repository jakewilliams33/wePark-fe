import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";

export default SignUpComponent = ({
  text1,
  text2,
  text3,
  text4,
  text5,
  handlePress,
  handleSignUpSubmit,
  onChangeText1,
  onChangeText2,
  onChangeText3,
  onChangeText4,
  onChangeText5,
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
            className="rounded-md shadow-xl"
            onChangeText={onChangeText1}
            value={text1}
          />
          <Text className="border-t-2 border-slate-400 bg-slate-400 text-white text-l font-medium py-1 text-center">
            Username
          </Text>
        </SafeAreaView>
        <SafeAreaView className="w-8/12 rounded-md border-2 border-slate-400 mt-10">
          <TextInput
            className="rounded-md shadow-xl"
            onChangeText={onChangeText5}
            value={text5}
          />
          <Text className="border-t-2 border-slate-400 bg-slate-400 text-white text-l font-medium py-1 text-center">
            Password
          </Text>
        </SafeAreaView>
        <SafeAreaView className="w-8/12 rounded-md border-2 border-slate-400 mt-10">
          <TextInput
            className="rounded-md shadow-xl"
            onChangeText={onChangeText2}
            value={text2}
          />
          <Text className="border-t-2 border-slate-400 bg-slate-400 text-white text-l font-medium py-1 text-center">
            Email Address
          </Text>
        </SafeAreaView>
        <SafeAreaView className="w-8/12 rounded-md border-2 border-slate-400 mt-10">
          <TextInput
            className="rounded-md shadow-xl"
            onChangeText={onChangeText3}
            value={text3}
          />
          <Text className="border-t-2 border-slate-400 bg-slate-400 text-white text-l font-medium py-1 text-center">
            A Few Words About Yourself
          </Text>
        </SafeAreaView>
        <SafeAreaView className="w-8/12 rounded-md border-2 border-slate-400 mt-10 mb-10">
          <TextInput
            className="rounded-md shadow-xl"
            onChangeText={onChangeText4}
            value={text4}
          />
          <Text className="border-t-2 border-slate-400 bg-slate-400 text-white text-l font-medium py-1 text-center">
            A Picture of You
          </Text>
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
      </View>
    </>
  );
};
