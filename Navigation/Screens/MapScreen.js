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
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import CommentsComponent from '../Screens/ScreenComponents/CommentsComponent';
import MapView, { Marker, Callout } from 'react-native-maps';
import { showMessage, hideMessage } from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import SelectDropdown from 'react-native-select-dropdown';
import * as Yup from 'yup';
import { UserContext, SpotContext } from '../AppContext';
import FavButton from '../Buttons/FavButton';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { HistoryContext } from '../AppContext';
import { getSpots, postSpot, getSingleSpot, deleteSpot } from '../../api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SpotVotesComponent from './ScreenComponents/SpotVotesComponent';
import { SliderBox } from 'react-native-image-slider-box';
import BusyButton from '../Buttons/BusyButton';
import SearchPlacesComponent from './ScreenComponents/SearchPlacesComponent';

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
  const [image, setImage] = useState([]);
  const [showMarkerModal, setShowMarkerModal] = useState(false);
  const [selectedSpotInfo, setSelectedSpotInfo] = useState();
  const [selectedSpotID, setSelectedSpotID] = useState();
  const { user, setUser } = useContext(UserContext);
  const [spotImages, setSpotImages] = useState([]);
  const { contextSpot, setContextSpot } = useContext(SpotContext);
  const { history, setHistory } = useContext(HistoryContext);
  const [regionChange, setRegionChange] = useState();
  const [searchLocation, setSearchLocation] = useState();
  const [searchRegion, setSearchRegion] = useState();
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [customSearch, setCustomSearch] = useState();

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
  useEffect(() => {
    getSpots(searchRegion).then(({ spots }) => {
      const spotsCopy = [...spots];
      setMarkers(spotsCopy);
      console.log('hello');
    });
  }, [JSON.stringify(markers), JSON.stringify(searchRegion)]);

  // get image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      image,
      allowsMultipleSelection: true,
    });
    if (!result.cancelled && result.selected) {
      setImage(
        result.selected.map((image) => {
          return image.uri;
        })
      );
    } else {
      setImage([result.uri]);
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
      setImage([result.uri]);
    }
  };

  // Get single spot information
  const handleSpotPopup = (spot_id) => {
    setShowMarkerModal(true);
    getSingleSpot(spot_id).then(({ spot }) => {
      if (history.length > 0) {
        let pushToHistory = true;

        for (const thisSpot of history) {
          if (thisSpot.spot_id === spot.spot_id) {
            pushToHistory = false;
          }
        }
        if (pushToHistory) {
          setHistory((curr) => [...curr, spot]);
        }
      } else setHistory([spot]);

      setSelectedSpotInfo(spot);
      if (spot.images) {
        setSpotImages(spot.images.split(','));
      }
    });
  };

  //function to handle click on floating Action Button
  const clickHandler = () => {
    if (user) {
      showMessage({
        message: 'Tap on the map to add a parking space',
        type: 'info',
        backgroundColor: '[#2D8CFF]',
        color: 'white',
      });
      setMarkerAllowed(true);
      setShowAddButton(false);
    } else
      Toast.show('Please sign up or log in to add a parking spot', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });
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
      setSearchRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setmapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, [contextSpot]);

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

  const handleSubmitPost = (values) => {
    setImage([]);
    confirmMarkerPosition();
    setShowModal(false);
    let finalChoice = newMarker[0].coordinate;
    postSpot(finalChoice, values, user, image);
  };

  const postSpot = (coordinate, values, user, uriArr) => {
    const parkingSpot = new FormData();
    parkingSpot.append('name', values.name);
    parkingSpot.append('description', values.description);
    parkingSpot.append('longitude', coordinate.longitude);
    parkingSpot.append('latitude', coordinate.latitude);
    parkingSpot.append('opening_time', values.opening_time);
    parkingSpot.append('closing_time', values.closing_time);
    parkingSpot.append('time_limit', values.time_limit);
    parkingSpot.append('parking_type', values.parking_type);
    parkingSpot.append('creator', user.username);

    console.log('posting spot');

    if (uriArr) {
      uriArr.forEach((uri) => {
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        parkingSpot.append('images', {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      });
    }
    axios
      .post('https://wepark-be.herokuapp.com/api/spots', parkingSpot, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        getSpots().then(({ spots }) => {
          const spotsCopy = [...spots];
          setMarkers(spotsCopy);
          setOptimisticmarkers([]);
        });

        console.log('the post request was a success');

        return JSON.stringify(response.data);
      })
      .then((spots) => {
        console.log('spots post request in api.js', spots);
      })
      .catch(function (error) {
        console.log('error in MapScreen post spots request, line ~310', error);
      });
  };

  //handle region change
  const handleRegionChange = (Region) => {
    let zoom = Region.latitudeDelta.toFixed(1);
    if (zoom < 0.5) {
      setShowSearchButton(true);
      setCustomSearch(Region);
    } else {
      setShowSearchButton(false);
    }
    setRegionChange(Region);
    setSearchLocation(Region);
  };

  // search area click
  function handleCustomSearch(customSearch) {
    setShowSearchButton(false);
    setSearchRegion(customSearch);
  }

  useEffect(() => {
    if (contextSpot) {
      console.log('heres the context spot in mapscreen: ', contextSpot);
      setShowMarkerModal(true);
      setSelectedSpotInfo(contextSpot);
      setSelectedSpotID(contextSpot.spot_id);
      setContextSpot(null);
    }
  }, [contextSpot]);

  if (userLocation && mapRegion.latitude === userLocation.coords.latitude) {
    return (
      <View style={{ flex: 1 }} className="bg-white">
        <SearchPlacesComponent
          userLocation={userLocation}
          setSearchLocation={setSearchLocation}
          setSearchRegion={setSearchRegion}
          style={styles.shadow}
        />

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
              handleSubmitPost(values);
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
                    style={{
                      fontSize: 10,
                      color: 'red',
                      alignItems: 'center',
                    }}
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

                <SliderBox images={image} ImageLoader={'ActivityIndicator'} />

                <Button title="submit" onPress={props.handleSubmit} />
              </View>
            )}
          </Formik>
        </Modal>
        {}
        {/* SPOT INFO MODAL HERE -------------------------------------------------------------------------------------------- */}

        <Modal
          visible={showMarkerModal}
          style={{ flex: 1 }}
          animationType="slide"
          onRequestClose={() => {
            setShowMarkerModal(false);
            setSpotImages([]);
          }}
        >
          <SafeAreaView>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
              <View style={{ marginHorizontal: 10 }}>
                {selectedSpotInfo && (
                  <>
                    <Text className="text-xl font-bold  my-4">
                      {selectedSpotInfo.name}
                    </Text>
                    <View className="flex-1 flex-row ">
                      <Text className="font-bold capitalize  flex-1">
                        {selectedSpotInfo.parking_type}
                      </Text>
                      <View style={{ flex: 1 }}>
                        <Text
                          className="text-xs font-bold"
                          style={{ textAlign: 'right' }}
                        >
                          {selectedSpotInfo.creator}
                        </Text>
                        <Text
                          className="text-xs font-bold"
                          style={{ textAlign: 'right' }}
                        >
                          {new Date(selectedSpotInfo.created_at).toUTCString()}
                        </Text>
                      </View>
                    </View>

                    <Text className="text-lg my-2">
                      {selectedSpotInfo.description}
                    </Text>
                    {selectedSpotInfo.opening_time ? (
                      <Text>Opening time: {selectedSpotInfo.opening_time}</Text>
                    ) : (
                      <></>
                    )}
                    {selectedSpotInfo.closing_time ? (
                      <Text>Closing time: {selectedSpotInfo.closing_time}</Text>
                    ) : (
                      <></>
                    )}

                    <Text>
                      Time Limit:
                      {selectedSpotInfo.time_limit === null
                        ? ' No Limit'
                        : selectedSpotInfo.time_limit}
                    </Text>
                    {selectedSpotInfo.images &&
                      selectedSpotInfo.images.split(',').map((image) => {})}

                    <View
                      className="my-5"
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        width: '100%',
                        alignContent: 'space-around',
                        justifyContent: 'space-around',
                      }}
                    >
                      <SliderBox
                        images={spotImages}
                        ImageLoader={'ActivityIndicator'}
                      />
                    </View>
                  </>
                )}
                <SpotVotesComponent
                  selectedSpotID={selectedSpotID}
                  selectedSpotInfo={selectedSpotInfo}
                ></SpotVotesComponent>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}
                >
                  {user &&
                    selectedSpotInfo &&
                    user.username === selectedSpotInfo.creator && (
                      <TouchableOpacity
                        className=" rounded-md bg-white h-14 w-14 justify-center items-center"
                        onPress={() => {
                          handleDelete();
                        }}
                      >
                        <Ionicons size={20} name="trash-bin" color={'white'} />
                        <Text className="text-m text-[#2D8CFF] font-medium text-center">
                          Delete
                        </Text>
                      </TouchableOpacity>
                    )}
                  {selectedSpotID && <FavButton spot_id={selectedSpotID} />}
                  <TouchableOpacity
                    className=" rounded-md bg-white h-14 w-14 justify-center items-center"
                    onPress={() => {
                      setShowMarkerModal(false);
                    }}
                  >
                    <Ionicons size={20} name="arrow-back" color={'white'} />
                    <Text className="text-m text-[#2D8CFF] font-medium text-center">
                      Back
                    </Text>
                  </TouchableOpacity>
                  {selectedSpotInfo && (
                    <BusyButton
                      selectedSpotInfo={selectedSpotInfo}
                      setSelectedSpotInfo={setSelectedSpotInfo}
                    />
                  )}
                </View>

                <CommentsComponent
                  selectedSpotID={selectedSpotID}
                ></CommentsComponent>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>
        <View style={{ flex: 1 }}>
          <MapView
            provider={MapView.PROVIDER_GOOGLE}
            style={{ flex: 1, marginTop: '-78%', zIndex: -20 }}
            initialRegion={mapRegion}
            showsUserLocation={true}
            region={searchLocation ? searchLocation : regionChange}
            onRegionChangeComplete={(Region) => {
              handleRegionChange(Region);
            }}
            //adding the marker on touch
            onPress={(event) => {
              if (markerAllowed) {
                showMessage({
                  message: 'Hold down on the marker to drag',
                  type: 'info',
                  backgroundColor: '[#2D8CFF]',
                  color: 'white',
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
              return <Marker title="Loading..." {...marker}></Marker>;
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
                    <Image
                      source={require('../../assets/markerIcon.png')}
                      style={{ height: 38 }}
                      resizeMode={'contain'}
                    />
                    <Callout
                      onPress={() => {
                        handleSpotPopup(marker.spot_id);
                        setSelectedSpotID(marker.spot_id);
                      }}
                    >
                      <Text style={{ fontWeight: 'bold' }}>{marker.name}</Text>
                      <Text style={{ color: 'lightgrey' }}>
                        {marker.parking_type}
                      </Text>
                      <Text>{marker.description}</Text>
                    </Callout>
                  </Marker>
                );
            })}
          </MapView>
        </View>

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
        {showSearchButton && (
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              position: 'absolute',
              bottom: 550,
              alignSelf: 'center',
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 50,
              opacity: 0.9,
            }}
            activeOpacity={0.5}
            onPress={() => {
              handleCustomSearch(customSearch);
            }}
          >
            <Text>Search this area</Text>
          </TouchableOpacity>
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
                source={require('../../assets/addButton.png')}
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
      <View
        style={{
          marginTop: '40%',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <ActivityIndicator size="large" color="[#2D8CFF]" />
        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Getting user location data!
        </Text>
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
  modalStyle: {
    margin: '10%',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0.5,
      height: -2.5,
    },
    shadowOpacity: 0.69,
    shadowRadius: 2.65,
    elevation: 4,
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
