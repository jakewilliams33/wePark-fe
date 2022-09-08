import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import SelectDropdown from "react-native-select-dropdown";

export default function MapScreen({ navigation, route }) {
  const [userLocation, setUserLocation] = useState();
  const [mapRegion, setmapRegion] = useState({
    latitude: 55.3781,
    longitude: -3.436,
    latitudeDelta: 1,
    longitudeDelta: 1,
  });
  const [status, setStatus] = useState();
  const [markers, setMarkers] = useState([
    {
      coordinate: {
        latitude: 53.820851393806905,
        longitude: -1.5859020128846169,
      },
      key: 2,
    },
    {
      coordinate: {
        latitude: 53.81018980502543,
        longitude: -1.569543890655041,
      },
      key: 1,
    },
  ]);
  const [markerAllowed, setMarkerAllowed] = useState(false);
  const [newMarker, setNewMarker] = useState([]);

  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [showAddButton, setShowAddButton] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  //function to handle click on floating Action Button
  const clickHandler = () => {
    showMessage({
      message: "Tap on the map to add a parking space",
      type: "info",
    });
    setMarkerAllowed(true);
    setShowAddButton(false);
  };

  //get location permission
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setStatus("Permission to access location was denied");
        return;
      } else {
        console.log("Access granted!");
        setStatus(status);
      }
    })();
  }, []);

  //get user location
  useEffect(() => {
    (async () => {
      const location = await Location.getCurrentPositionAsync();
      setUserLocation(location);
      setmapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  //confirm marker
  const confirmMarkerPosition = () => {
    const finalChoice = newMarker[0].coordinate;
    setMarkers([
      ...markers,
      {
        coordinate: {
          latitude: finalChoice.latitude,
          longitude: finalChoice.longitude,
        },
        key: Date.now(),
      },
    ]);
    setNewMarker([]);
  };

  if (userLocation && mapRegion.latitude === userLocation.coords.latitude) {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          visible={showModal}
          onRequestClose={() => {
            setShowModal(false);
          }}
        >
          <Formik
            initialValues={{
              name: "",
              description: "",
              parking_type: "",
              opening_time: "No specified times",
              closing_time: "No specified times",
              time_limit: "",
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {(props) => (
              <View>
                <TextInput
                  style={{
                    backgroundColor: "#f4f8ff",
                    marginTop: 200,
                    margin: 20,
                    padding: 10,
                    borderColor: "grey",
                    borderWidth: 0.1,
                    borderRadius: 50,
                  }}
                  placeholder="Name"
                  onChangeText={props.handleChange("name")}
                  value={props.values.name}
                />
                <TextInput
                  multiline
                  style={{
                    backgroundColor: "#f4f8ff",
                    marginTop: 50,
                    margin: 20,
                    padding: 10,
                    borderColor: "grey",
                    borderWidth: 0.1,
                    borderRadius: 50,
                  }}
                  placeholder="Description"
                  onChangeText={props.handleChange("description")}
                  value={props.values.description}
                />
                <View style={{ alignItems: "center" }}>
                  <SelectDropdown
                    data={["street", "car park"]}
                    onSelect={props.handleChange("parking_type")}
                    defaultButtonText={"Select parking type"}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  />
                  <SelectDropdown
                    data={times}
                    onSelect={props.handleChange("opening_time")}
                    defaultButtonText={"Opening time"}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  />
                  <SelectDropdown
                    data={times}
                    onSelect={props.handleChange("closing_time")}
                    defaultButtonText={"Closing time"}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  />
                  <SelectDropdown
                    data={limit}
                    onSelect={props.handleChange("time_limit")}
                    defaultButtonText={"Time limit (hours)"}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  />
                </View>

                <Button
                  title="Pick an image from camera roll"
                  onPress={pickImage}
                />
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200 }}
                  />
                )}

                <Button title="submit" onPress={props.handleSubmit} />
              </View>
            )}
          </Formik>
        </Modal>

        <MapView
          style={{ flex: 1 }}
          initialRegion={mapRegion}
          showsUserLocation={true}
          followsUserLocation={true}
          //adding the marker on touch
          onPress={(event) => {
            if (markerAllowed) {
              showMessage({
                message: "Hold down on the marker to drag",
                type: "info",
              });

              let newPlace = event.nativeEvent.coordinate;
              setShowConfirmButton(true);

              setNewMarker([
                {
                  coordinate: {
                    latitude: newPlace.latitude,
                    longitude: newPlace.longitude,
                  },
                  key: "temp",
                },
              ]);
            }
            setMarkerAllowed(false);
          }}
        >
          {newMarker.map((marker) => {
            return (
              <Marker
                draggable
                {...marker}
                onDragEnd={(e) => {
                  setNewMarker([
                    {
                      coordinate: {
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitude: e.nativeEvent.coordinate.longitude,
                      },
                      key: "temp",
                    },
                  ]);
                }}
              />
            );
          })}

          {markers.map((marker) => {
            return <Marker draggable {...marker} />;
          })}
        </MapView>
        {showConfirmButton && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              position: "absolute",
              bottom: 50,
              alignSelf: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                marginRight: 2,
              }}
              onPress={() => {
                setShowAddButton(true),
                  setShowConfirmButton(false),
                  confirmMarkerPosition();
                hideMessage();
                setShowModal(true);
              }}
            >
              <Text>Confirm?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "white",
                padding: 20,
                paddingRight: 27,
                paddingLeft: 26.5,
                borderRadius: 10,
                marginLeft: 2,
              }}
              onPress={() => {
                setShowAddButton(true),
                  setShowConfirmButton(false),
                  setNewMarker([]);
                hideMessage();
              }}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
        {
          //add button
          showAddButton && (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                position: "absolute",
                bottom: 10,
                alignSelf: "center",
              }}
              //add button
              activeOpacity={0.7}
              onPress={() => {
                clickHandler();
              }}
            >
              <Image
                style={{ resizeMode: "contain", width: 65, height: 65 }}
                source={{
                  uri: "https://www.freeiconspng.com/uploads/parking-icon-png-12.png",
                }}
              />
            </TouchableOpacity>
          )
        }
        <FlashMessage
          position={"center"}
          style={{ marginBottom: 600 }}
          autoHide={false}
        />
      </View>
    );
  } else
    return (
      <View>
        <Text>Sorry! No User location data!</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#f4f8ff",
    marginTop: 20,
    margin: 20,
    padding: 10,
    borderColor: "grey",
    borderWidth: 0.1,
    borderRadius: 50,
  },

  dropdown1BtnStyle: {
    width: "80%",
    height: 50,
    backgroundColor: "#f4f8ff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f4f8ff",
    marginTop: 10,
    justifyContent: "center",
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown1DropdownStyle: {
    backgroundColor: "#EFEFEF",
    justifyContent: "center",
  },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
});

const times = [
  "No specified times",
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

const limit = [
  "No limit",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
];
