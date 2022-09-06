import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Button,
  ToastAndroid,
} from "react-native";
import {} from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";

const App = () => {
  const [userLocation, setUserLocation] = useState();
  const [mapRegion, setmapRegion] = useState({
    latitude: 55.3781,
    longitude: -3.436,
    latitudeDelta: 1,
    longitudeDelta: 1,
  });
  const [status, setStatus] = useState();
  const [markers, setMarkers] = useState([]);
  const [markerAllowed, setMarkerAllowed] = useState(false);
  const [newMarker, setNewMarker] = useState([]);

  console.log(newMarker);

  //function to handle click on floating Action Button
  const clickHandler = () => {
    ToastAndroid.show("Tap on map to add parking space", ToastAndroid.LONG);

    setMarkerAllowed(true);
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

  //only render map if location is obtained - needed for initial region
  if (userLocation) {
    return (
      <View style={styles.container}>
        <View>
          <Text>Header</Text>
        </View>
        <View>
          <MapView
            style={{ alignSelf: "stretch", height: "100%" }}
            initialRegion={mapRegion}
            showsUserLocation={true}
            followsUserLocation={true}
            //adding the marker on touch
            onPress={(event) => {
              if (markerAllowed) {
                let newPlace = event.nativeEvent.coordinate;
                console.log(newPlace);
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

          <View>
            <Button
              //add button
              title={"Add Marker"}
              activeOpacity={0.7}
              onPress={clickHandler}
              containerStyle={styles.touchableOpacityStyle}
              style={styles.touchableOpacityStyle}
            >
              <Image
                source={{
                  uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png",
                }}
                //You can use you project image Example below
                //source={require('./images/float-add-icon.png')}
                style={styles.floatingButtonStyle}
              />
            </Button>
          </View>
        </View>
        <View>
          <Text>Footer</Text>
        </View>
      </View>
    );
  }
};

export default App;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 150,
    marginBottom: 150,
  },
  touchableOpacityStyle: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 800,
    marginLeft: 179,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50,
  },
});
