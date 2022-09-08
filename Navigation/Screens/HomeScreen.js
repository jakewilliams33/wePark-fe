import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons/faCar";

export default function HomeScreen({ navigation }) {
  const [text, onChangeText] = React.useState("Where do you want to park?");

  return (
    <View className="flex-1 items-center justify-evenly bg-white ">
      <View className="border-2" style={styles.titleSection}>
        <Text style={styles.titleText}>We Park</Text>
        <Text style={styles.titleTag}>But Mostly We Care</Text>
      </View>

      <View className="border-2" style={styles.middleSection}>
        <View style={styles.buttonWrapper}>
          <View style={styles.middleButton}>
            <TouchableOpacity className="border-2">
              <Text>Favourites</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.middleButton}>
            <TouchableOpacity className="border-2">
              <Text>Favourites</Text>
            </TouchableOpacity>
          </View>
        </View>

        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </SafeAreaView>

        <View style={styles.recentWrapper}>
          <FontAwesomeIcon icon={faCar} />
          <Text>This is a recent spot you viewed</Text>
        </View>
        <View style={styles.recentWrapper}>
          <FontAwesomeIcon icon={faCar} />
          <Text>This is a recent spot you viewed </Text>
        </View>
      </View>

      <View className="border-2">
        <View style={styles.recentWrapper}>
          <FontAwesomeIcon icon={faCar} />
          <Text>This is a Featured Place</Text>
        </View>
        <View style={styles.recentWrapper}>
          <FontAwesomeIcon icon={faCar} />
          <Text>This is a Featured Place</Text>
        </View>
        <View style={styles.recentWrapper}>
          <FontAwesomeIcon icon={faCar} />
          <Text>This is a Featured Place</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleSection: {},
  middleSection: {},
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",

    justifyContent: "center",
  },
  middleButton: { marginRight: 5, marginLeft: 5 },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  recentWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  bottomSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
