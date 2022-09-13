import React, { useState, useEffect, useContext } from 'react';
import * as Location from 'expo-location';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  TouchableOpacity,
  Modal,
  TextInput,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import CommentsComponent from '../Screens/ScreenComponents/CommentsComponent';
import MapView, { Marker, Callout } from 'react-native-maps';
import { showMessage, hideMessage } from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import SelectDropdown from 'react-native-select-dropdown';
import * as Yup from 'yup';
import { UserContext } from '../AppContext';
import FavButton from '../Buttons/FavButton';

import { getSpots, postSpot, getSingleSpot, deleteSpot } from '../../api';

export default function MapScreen({ navigation, route }) {
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
  const [optimisticMarkers, setOptimisticmarkers] = useState([]);

  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [showAddButton, setShowAddButton] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [showMarkerModal, setShowMarkerModal] = useState(false);
  const [selectedSpotInfo, setSelectedSpotInfo] = useState();
  const [selectedSpotID, setSelectedSpotID] = useState();
  const { user, setUser } = useContext(UserContext);
  const [reRender, setReRender] = useState(0);

  //form validation
  const SpaceSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name must be over 2 characters')
      .max(50, 'Name must be between 2 and 50 characters')
      .required('Required'),
    description: Yup.string()
      .min(11, 'Description must be over 10 characters')
      .max(500, 'Too Long!')
      .required('Required'),
    parking_type: Yup.string().required('Required'),
  });

  // get spots from db
  useEffect(
    (markers) => {
      getSpots(markers).then(({ spots }) => {
        const spotsCopy = [...spots];
        setMarkers(spotsCopy);
      });
    },
    [JSON.stringify(markers), reRender]
  );

  console.log(markers.length);

  // get image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  //take picture
  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // Get single spot information
  const handleSpotPopup = (spot_id) => {
    setShowMarkerModal(true);
    getSingleSpot(spot_id).then(({ spot }) => {
      setSelectedSpotInfo(spot);
    });
  };

  //function to handle click on floating Action Button
  const clickHandler = () => {
    if (user) {
      showMessage({
        message: 'Tap on the map to add a parking space',
        type: 'info',
      });
      setMarkerAllowed(true);
      setShowAddButton(false);
    } else
      ToastAndroid.show(
        'Please sign up or log in to add a parking spot',
        ToastAndroid.SHORT
      );
  };

  //get location permission
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setStatus('Permission to access location was denied');
        return;
      } else {
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
    const optimisticCopy = [...optimisticMarkers];
    setOptimisticmarkers([
      ...optimisticCopy,
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

  //delete
  const handleDelete = () => {
    deleteSpot(selectedSpotID);
    const filtered = markers.filter((spot) => {
      return spot.spot_id !== selectedSpotID;
    });
    setMarkers(filtered);
    setShowMarkerModal(false);
  };

  if (userLocation && mapRegion.latitude === userLocation.coords.latitude) {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          visible={showModal}
          onRequestClose={() => {
            setShowModal(false);
            setNewMarker([]);
          }}
        >
          <Formik
            initialValues={{
              name: '',
              description: '',
              parking_type: '',
              opening_time: 'No specified times',
              closing_time: 'No specified times',
              time_limit: null,
            }}
            validationSchema={SpaceSchema}
            onSubmit={(values) => {
              confirmMarkerPosition();
              setShowModal(false);
              let finalChoice = newMarker[0].coordinate;
              postSpot(finalChoice, values, user, image);
              getSpots().then(({ spots }) => {
                const spotsCopy = [...spots];
                setMarkers(spotsCopy);
              });

              setOptimisticmarkers([]);
            }}
          >
            {(props) => (
              <View>
                <TextInput
                  style={{
                    backgroundColor: '#f4f8ff',
                    marginTop: 50,
                    margin: 20,
                    padding: 10,
                    borderColor: 'grey',
                    borderWidth: 0.1,
                    borderRadius: 50,
                  }}
                  placeholder="Name"
                  onChangeText={props.handleChange('name')}
                  value={props.values.name}
                />
                {props.errors.name && (
                  <Text
                    style={{ fontSize: 10, color: 'red', alignItems: 'center' }}
                  >
                    {props.errors.name}
                  </Text>
                )}
                <TextInput
                  multiline
                  style={{
                    backgroundColor: '#f4f8ff',
                    marginTop: 20,
                    margin: 20,
                    padding: 10,
                    borderColor: 'grey',
                    borderWidth: 0.1,
                    borderRadius: 50,
                  }}
                  placeholder="Description"
                  onChangeText={props.handleChange('description')}
                  value={props.values.description}
                />
                {props.errors.description && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {props.errors.description}
                  </Text>
                )}
                <View style={{ alignItems: 'center' }}>
                  <SelectDropdown
                    data={['street', 'car park']}
                    onSelect={props.handleChange('parking_type')}
                    defaultButtonText={'Select parking type'}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  />

                  {props.errors.parking_type && (
                    <Text style={{ fontSize: 10, color: 'red' }}>
                      {props.errors.parking_type}
                    </Text>
                  )}

                  <SelectDropdown
                    data={times}
                    onSelect={props.handleChange('opening_time')}
                    defaultButtonText={'Opening time'}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  />
                  <SelectDropdown
                    data={times}
                    onSelect={props.handleChange('closing_time')}
                    defaultButtonText={'Closing time'}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  />
                  <SelectDropdown
                    data={limit}
                    onSelect={props.handleChange('time_limit')}
                    defaultButtonText={'Time limit (hours)'}
                    buttonStyle={{
                      width: '80%',
                      height: 50,
                      backgroundColor: '#f4f8ff',
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#f4f8ff',
                      marginTop: 10,
                      justifyContent: 'center',
                      marginBottom: 40,
                    }}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  />
                </View>

                <Button
                  title="Pick an image from camera roll"
                  onPress={pickImage}
                />

                <Button
                  title="Take a photo with camera"
                  onPress={openCamera}
                ></Button>

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
        {/* SPOT INFO MODAL HERE -------------------------------------------------------------------------------------------- */}
        <Modal
          visible={showMarkerModal}
          style={{ flex: 1 }}
          animationType="slide"
          onRequestClose={() => {
            setShowMarkerModal(false);
          }}
        >
          <View>
            <ScrollView>
              {selectedSpotInfo && (
                <>
                  <Text>{selectedSpotInfo.name}</Text>
                  <Text>
                    Added By: {selectedSpotInfo.creator} On:
                    {new Date(selectedSpotInfo.created_at).toUTCString()}
                  </Text>
                  <Text>Type: {selectedSpotInfo.parking_type}</Text>

                  <Text>Description: {selectedSpotInfo.description}</Text>
                  <Text>Opening time: {selectedSpotInfo.opening_time}</Text>
                  <Text>Closing time: {selectedSpotInfo.closing_time}</Text>

                  <Text>
                    Time Limit:
                    {selectedSpotInfo.time_limit === null
                      ? ' no limit'
                      : selectedSpotInfo.time_limit}
                  </Text>

                  <Image
                    style={{ width: 200, height: 200 }}
                    source={{ uri: selectedSpotInfo.images }}
                  ></Image>
                </>
              )}
              {selectedSpotID && <FavButton spot_id={selectedSpotID} />}
              {selectedSpotID && (
                <Button title="delete button" onPress={handleDelete}>
                  Delete
                </Button>
              )}

              <CommentsComponent
                selectedSpotID={selectedSpotID}
              ></CommentsComponent>
            </ScrollView>
          </View>
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
                message: 'Hold down on the marker to drag',
                type: 'info',
              });

              let newPlace = event.nativeEvent.coordinate;
              setShowConfirmButton(true);

              setNewMarker([
                {
                  coordinate: {
                    latitude: newPlace.latitude,
                    longitude: newPlace.longitude,
                  },
                  key: 'temp',
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
                      key: 'temp',
                    },
                  ]);
                }}
              />
            );
          })}
          {optimisticMarkers.map((marker) => {
            return <Marker {...marker} />;
          })}

          {markers.map((marker) => {
            const spotDetails = {
              coordinate: {
                latitude: marker.latitude,
                longitude: marker.longitude,
              },
              key: marker.spot_id ? marker.spot_id : Date.now,
              opening_time: marker.opening_time,
              closing_time: marker.closing_time,
              time_limit: marker.time_limit,
              parking_type: marker.parking_type,
              votes: marker.votes,
            };

            if (markers.length > 0)
              return (
                <Marker {...spotDetails}>
                  <Callout
                    onPress={() => {
                      handleSpotPopup(marker.spot_id);
                      setSelectedSpotID(marker.spot_id);
                    }}
                  >
                    <Text style={{ fontWeight: 'bold' }}>{marker.name}</Text>
                    <Text>Sample Description</Text>
                  </Callout>
                </Marker>
              );
          })}
        </MapView>
        {showConfirmButton && (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              position: 'absolute',
              bottom: 50,
              alignSelf: 'center',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
                marginRight: 2,
              }}
              onPress={() => {
                setShowAddButton(true),
                  setShowConfirmButton(false),
                  hideMessage();
                setShowModal(true);
              }}
            >
              <Text>Confirm?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: 'white',
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
                flexDirection: 'row',
                position: 'absolute',
                bottom: 10,
                alignSelf: 'center',
              }}
              //add button
              activeOpacity={0.7}
              onPress={() => {
                clickHandler();
              }}
            >
              <Image
                style={{ resizeMode: 'contain', width: 65, height: 65 }}
                source={{
                  uri: 'https://www.freeiconspng.com/uploads/parking-icon-png-12.png',
                }}
              />
            </TouchableOpacity>
          )
        }
        <FlashMessage
          position={'center'}
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
    backgroundColor: '#f4f8ff',
    marginTop: 20,
    margin: 20,
    padding: 10,
    borderColor: 'grey',
    borderWidth: 0.1,
    borderRadius: 50,
  },

  dropdown1BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#f4f8ff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f4f8ff',
    marginTop: 10,
    justifyContent: 'center',
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyle: {
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
  },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
});

const times = [
  'No specified times',
  '00:00',
  '00:30',
  '01:00',
  '01:30',
  '02:00',
  '02:30',
  '03:00',
  '03:30',
  '04:00',
  '04:30',
  '05:00',
  '05:30',
  '06:00',
  '06:30',
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30',
];

const limit = [
  'no limit',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
];
