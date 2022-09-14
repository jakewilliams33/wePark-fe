import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from 'react-native';

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
        <TouchableOpacity
          className=" p-2 rounded-md shadow-md bg-slate-600 h-10 w-20 justify-center items-center"
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
            onChangeText={onChangeText1}
            value={text1}
          />
        </SafeAreaView>
        <SafeAreaView
          className="border-0 w-8/12 bg-white rounded-3xl"
          style={styles.input}
        >
          <TextInput
            className=" border-0 rounded-3xl font-medium text-l text-slate-600 text-center shadow-xl"
            style={styles.inner_input}
            onChangeText={onChangeText5}
            value={text5}
          />
        </SafeAreaView>
        <SafeAreaView
          className="border-0 w-8/12 bg-white rounded-3xl"
          style={styles.input}
        >
          <TextInput
            className=" border-0 rounded-3xl font-medium text-l text-slate-600 text-center shadow-xl"
            style={styles.inner_input}
            onChangeText={onChangeText2}
            value={text2}
          />
        </SafeAreaView>
        <SafeAreaView
          className="border-0 w-8/12 bg-white rounded-3xl"
          style={styles.input}
        >
          <TextInput
            className=" border-0 rounded-3xl font-medium text-l text-slate-600 text-center shadow-xl"
            style={styles.inner_input}
            onChangeText={onChangeText3}
            value={text3}
          />
        </SafeAreaView>
        <SafeAreaView
          className="border-0 w-8/12 bg-white rounded-3xl"
          style={styles.input}
        >
          <TextInput
            className=" border-0 rounded-3xl font-medium text-l text-slate-600 text-center shadow-xl"
            style={styles.inner_input}
            onChangeText={onChangeText4}
            value={text4}
          />
        </SafeAreaView>

        <TouchableOpacity
          className=" p-2 rounded-md shadow-md bg-slate-600 h-10 w-20 justify-center items-center"
          style={styles.shadow}
          onPress={() => {
            handleSignUpSubmit();
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
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.59,
    shadowRadius: 6.65,
    elevation: 7,
  },
});
