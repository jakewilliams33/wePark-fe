import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from 'react-native';

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
        <TouchableOpacity
          className=" p-2 shadow-md rounded-md bg-[#2D8CFF] h-10 w-20 justify-center items-center"
          style={styles.shadow}
          onPress={(event) => {
            event.destination = 'Main';
            handlePress(event);
          }}
        >
          <Text className="text-white text-l font-medium">Back</Text>
        </TouchableOpacity>

        <SafeAreaView
          className="border-0 w-8/12 bg-white rounded-3xl"
          style={styles.input}
        >
          <TextInput
            className=" border-0 rounded-3xl font-medium text-l text-slate-600 text-center shadow-xl"
            style={styles.inner_input}
            onChangeText={onChangeText6}
            onFocus={onChangeText6}
            value={text6}
          />
        </SafeAreaView>
        <SafeAreaView
          className="border-0 w-8/12 bg-white rounded-3xl"
          style={styles.input}
        >
          <TextInput
            className=" border-0 rounded-3xl font-medium text-l text-slate-600 text-center shadow-xl"
            style={styles.inner_input}
            onChangeText={onChangeText7}
            onFocus={onChangeText7}
            value={text7}
          />
        </SafeAreaView>

        <TouchableOpacity
          className=" p-2 rounded-md bg-[#2D8CFF] shadow-md h-10 w-20 justify-center items-center"
          style={styles.shadow}
          onPress={() => {
            handleLoginSubmit();
          }}
        >
          <Text className="text-white text-l font-medium">Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0.5,
      height: -4.5,
    },
    shadowOpacity: 0.29,
    shadowRadius: 8.65,
    elevation: 4,
    border: 0,
  },

  inner_input: {
    height: 30,
    borderRadius: 50,
    border: 0,
  },

  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0.5,
      height: 2.5,
    },
    shadowOpacity: 0.69,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
