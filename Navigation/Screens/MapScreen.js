import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

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

  console.log(newMarker);
  console.log(markers);

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

  if (userLocation) {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={mapRegion}
          showsUserLocation={true}
          followsUserLocation={true}
          //adding the marker on touch
          onPress={(event) => {
            if (markerAllowed) {
              hideMessage();
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   touchableOpacityStyle: {
//     position: "absolute",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 800,
//     marginLeft: 179,
//   },
//   floatingButtonStyle: {
//     resizeMode: "contain",
//     width: 50,
//     height: 50,
//   },
//   buttonText: {
//     fontSize: 20,
//     color: "black",
//   },
//   button: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 5,
//     position: "absolute",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 700,
//     marginLeft: 142,
//   },
// });
