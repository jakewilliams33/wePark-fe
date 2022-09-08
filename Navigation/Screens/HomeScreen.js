import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons/faCar";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HomeScreen({ navigation }) {
  const [text, onChangeText] = React.useState("Where do you want to park?");

  return (
    <View className="flex-1 items-center justify-evenly bg-white w-screen">
      <View className=" basis-1/6 w-screen items-center justify-evenly">
        <Text className="text-7xl text-slate-600 font-medium">We Park</Text>
        <Text className="text-xl text-slate-600 font-medium">
          But Mostly We Care
        </Text>
      </View>

      <View className=" flex-1 flex-col justify-evenly items-center basis-2/4 w-screen">
        <View className="flex-row justify-center">
          <View className="mx-5">
            <TouchableOpacity className=" p-2 rounded-md bg-slate-400">
              <Text className="text-white text-l font-medium">Favourites</Text>
            </TouchableOpacity>
          </View>
          <View className="mx-5">
            <TouchableOpacity className=" p-2 rounded-md bg-slate-400">
              <Text className="text-white text-l font-medium">Favourites</Text>
            </TouchableOpacity>
          </View>
        </View>

        <SafeAreaView className="w-8/12 ">
          <TextInput
            className="rounded-md shadow-xl"
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </SafeAreaView>

        <View className=" p-2 px-6 rounded-lg rounded-md bg-slate-400">
          <View className="m-2 flex-row justify-center">
            <FontAwesomeIcon icon={faCar} />
            <Text className="text-white text-l font-medium ml-2">
              This is a recent spot you viewed
            </Text>
          </View>
          <View className="m-2 flex-row justify-center">
            <FontAwesomeIcon icon={faCar} />
            <Text className="text-white text-l font-medium ml-2">
              This is a recent spot you viewed{" "}
            </Text>
          </View>

          <View className="m-2 flex-row justify-center">
            <FontAwesomeIcon icon={faCar} />
            <Text className="text-white text-l font-medium ml-2">
              This is a recent spot you viewed{" "}
            </Text>
          </View>
        </View>
      </View>

      <View className=" basis-1/4 flex-1 flex-col justify-evenly  p-2 mb-4 rounded-lg px-14 rounded-md bg-slate-400">
        <View className="flex-row justify-center">
          <Ionicons name={"golf-outline"} size={20} color={"darkBlue"} />
          <Text className="text-white text-l font-medium ml-2">
            This is a Featured Place
          </Text>
        </View>
        <View className="flex-row justify-center">
          <Ionicons name={"golf-outline"} size={20} color={"darkBlue"} />
          <Text className="text-white text-l font-medium ml-2">
            This is a Featured Place
          </Text>
        </View>
        <View className="flex-row justify-center">
          <Ionicons name={"golf-outline"} size={20} color={"darkBlue"} />
          <Text className="text-white text-l font-medium ml-2">
            This is a Featured Place
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    elevation: 2,
  },
});
