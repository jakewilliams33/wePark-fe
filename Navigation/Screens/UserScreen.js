import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
  SafeAreaView,
} from 'react-native';
import SpotsComponent from './ScreenComponents/SpotsComponent';
import BottomComponent from './ScreenComponents/BottomComponent';
import LoginScreen from './LoginScreen';
import { Formik } from 'formik';
import axios from 'axios';
import { UserContext } from '../AppContext';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';

const noUserObject = {
  username: 'No User',
  avatar:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkjktNk_waKZ6A064JikKQRYLxoKPNIUR_g&usqp=CAU',
  about: 'Some random user bio',
  kudos: 0,
};

export default function UserScreen({ navigation }) {
  const [isInfoScreen, setIsInfoScreen] = useState(true);
  const [isFavScreen, setIsFavScreen] = useState();
  const { user, setUser } = useContext(UserContext);
  const [spots, setSpots] = useState();
  const [favs, setFavs] = useState([]);
  const [IDtoFav, setIDToFav] = useState();
  const [addToFavs, toggleAddToFavs] = useState(false);
  const [IDtoUnFav, setIDtoUnFav] = useState();
  const [unFav, toggleUnFav] = useState(false);
  const [IDtoDelete, setIDtoDelete] = useState();
  const [shouldDelete, toggleShouldDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);

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

  const handleClick = (bool) => {
    setIsFavScreen(bool);
    setIsInfoScreen(false);
  };

  const handleBack = () => {
    setIsInfoScreen(true);
  };

  const handleDelete = (event) => {
    const spot_id = event.spot_id;
    setIDtoDelete(spot_id);
    toggleShouldDelete(true);
  };

  const handleFavPress = (event) => {
    console.log('in handleFavPress');
    const spot_id = event.spot_id;
    setIDToFav(spot_id);

    toggleAddToFavs(true);
  };

  const handleUnFavPress = (event) => {
    console.log("handleUnFavPress hits, here's spot_id: ", event.spot_id);
    const spot_id = event.spot_id;
    setIDtoUnFav(spot_id);
    toggleUnFav(true);
  };

  const handleSubmitPost = (values) => {
    setImage([]);
    confirmMarkerPosition();
    setShowModal(false);
    let finalChoice = newMarker[0].coordinate;
    postSpot(finalChoice, values, user, image);
  };

  //-----------------------------------------------------------------------------
  // POST USER FAV
  useEffect(() => {
    if (addToFavs) {
      console.log('here are the favs', favs);

      if (favs.filter((fav) => fav.spot_id === IDtoFav).length > 0) {
        console.log('NAUGHTY, aready fav');
        return;
      } else {
        const FAVSPOT = IDtoFav;
        console.log('Beginning POST fav request, spot_id-->>', FAVSPOT);
        toggleAddToFavs(false);
        setIDToFav(null);
        const newUser = user;
        newUser.favourites.push(FAVSPOT);
        setUser(newUser);
        axios
          .post(
            `https://wepark-be.herokuapp.com/api/users/${user.username}/favourites`,
            {
              spot_id: FAVSPOT,
            }
          )
          .then((response) => {
            return response.data;
          })
          .then((spot) => {
            console.log("FAV WORKED, here's the response -->>", spot);
            console.log('and here are the current favs: ', favs);
            const newFavs = favs.spots || [];

            newFavs.push(spot.spot);
            const newUser = user;
            newUser.favourites.push(FAVSPOT);
            setUser(newUser);
            return setFavs(newFavs);
          })
          .catch((err) => {
            console.log('Error in UserScreen, in post Favs useEffect', err);
            const newUser = user;
            newUser.favourites = user.favourites.filter(
              (fav) => fav !== FAVSPOT
            );
            setUser(newUser);
          });
      }
    }
  }, [addToFavs]);

  //--------------------------------------------------------------------------
  // DELETE USER FAV

  useEffect(() => {
    if (unFav && IDtoUnFav) {
      console.log('entering delete favourite');
      const unfavourableSpot = IDtoUnFav;
      setIDtoUnFav(null);
      toggleUnFav(false);
      const newUser = user;
      newUser.favourites = user.favourites.filter(
        (fav) => fav !== unfavourableSpot
      );
      setUser(newUser);
      axios
        .delete(
          `https://wepark-be.herokuapp.com/api/users/${user.username}/favourites/${unfavourableSpot}`
        )
        .then(() => {
          const newFavs = favs.filter(
            (fav) => fav.spot_id !== unfavourableSpot
          );
          setFavs(newFavs);
        })
        .catch((err) => {
          console.log('Error in UserScreen, in Delete Favs useEffect', err);
          const newUser = user;
          newUser.favourites = user.favourites.push(unfavourableSpot);
          setUser(newUser);
        });
    }
  }, [unFav]);

  //----------------------------------------------------------------------------
  // GET USER SPOTS
  useEffect(() => {
    if (!isInfoScreen && !isFavScreen) {
      axios
        .get('https://wepark-be.herokuapp.com/api/spots', {
          params: { creator: user.username, radius: 1000000000 },
        })
        .then((response) => {
          return response.data;
        })
        .then((spots) => {
          return setSpots(spots);
        })
        .catch((err) => {
          console.log('Error in UserScreen, in getSpo<>ts useEffect', err);
        });
    }
  }, [isFavScreen, isInfoScreen]);

  //--------------------------------------------------------------------------
  // GET USER FAVS
  useEffect(() => {
    if (!isInfoScreen && isFavScreen) {
      axios
        .get(
          `https://wepark-be.herokuapp.com/api/users/${user.username}/favourites`
        )
        .then((response) => {
          return response.data;
        })
        .then((favs) => {
          return setFavs(favs.spots);
        })
        .catch((err) => {
          console.log(
            'Error in UserScreen, in getfavourites useEffect',
            err.config
          );
        });
    }
  }, [isFavScreen, isInfoScreen, shouldDelete]);

  //---------------------------------------------------------------------------
  // DELETE USER SPOT
  useEffect(() => {
    if (shouldDelete) {
      const spot = IDtoDelete;
      setIDtoDelete(null);
      toggleShouldDelete(false);
      axios
        .delete(`https://wepark-be.herokuapp.com/api/spots/${IDtoDelete}`)
        .then(() => {
          const newSpots = spots.spots.filter(
            (spot) => !spot.spot_id === IDtoDelete
          );

          console.log('HERE ARE YOUR NEW SPOTS', spots);
          return setSpots(newSpots);
        })
        .catch((err) => {
          console.log('Error in UserScreen, in delete spot useEffect', err);
        });
    }
  }, [shouldDelete]);
  //------------------------------------------------------------------------------

  const Card = ({ isFavScreen, isInfoScreen, spots, favs }) => {
    let content;

    if (!isInfoScreen) {
      if (isFavScreen) {
        const favsObj = { spots: favs };
        content = (
          <View className="flex-col">
            <Text className="text-xl text-center font-bold color-slate-600 mb-4">
              Favourites
            </Text>
            <SpotsComponent
              className=" w-screen"
              spotsObj={favsObj}
              handleFavPress={handleFavPress}
              handleUnFavPress={handleUnFavPress}
              handleDelete={handleDelete}
            />

            <View className="w-screen items-center justify-start ">
              <TouchableOpacity
                title={'Spots'}
                className=" rounded-md bg-white h-12 w-24 justify-center items-center"
                activeOpacity={0.7}
                onPress={handleBack}
              >
                <Text className="text-xl text-[#2D8CFF] font-medium ">
                  Back
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      } else {
        content = (
          <>
            <Text className="text-xl text-center font-bold color-slate-600 mb-4">
              Your Spots
            </Text>
            <SpotsComponent
              className="  w-screen"
              spotsObj={spots}
              handleFavPress={handleFavPress}
              handleUnFavPress={handleUnFavPress}
              handleDelete={handleDelete}
            />

            <View className="w-screen items-center bg-white justify-center ">
              <TouchableOpacity
                title={'Spots'}
                className=" p-2 rounded-md shadow-md bg-white h-10 w-20 justify-center items-center"
                style={styles.shadow}
                activeOpacity={0.7}
                onPress={handleBack}
              >
                <Text className="text-xl text-[#2D8CFF] font-medium ">
                  Back
                </Text>
              </TouchableOpacity>
            </View>
          </>
        );
      }
    } else {
      content = (
        <BottomComponent
          userObj={user || noUserObject}
          handleClick={handleClick}
        />
      );
    }

    return <View>{content}</View>;
  };

  const WhichScreen = ({ isFavScreen, isInfoScreen, user }) => {
    if (user) {
      return (
        <View className="flex-column items-center justify-evenly h-screen  bg-white">
          <View
            className=" flex-row items-center justify-evenly w-screen mb-4 rounded-lg bg-white py-3 w-10/12 shadow-md"
            style={styles.shadow}
          >
            <Image
              className="w-32 h-32 rounded-full "
              source={{
                uri: user.avatar_url || noUserObject.avatar,
              }}
            />
            <View>
              <Text className="text-l text-[#2D8CFF] font-bold mt-2">
                Username: {user.username}
              </Text>
              <Text className="text-l text-[#2D8CFF] font-bold mt-2">
                bio: {user.about}
              </Text>
              <Text className="text-l text-[#2D8CFF] font-bold mt-2">
                Kudos: {user.kudos}
              </Text>
              <TouchableOpacity
                title={'patchUser'}
                className=" p-2 rounded-md shadow-md bg-[#2D8CFF] h-10 w-30 mt-3 justify-center items-center"
                style={styles.shadow}
                activeOpacity={0.7}
                onPress={() => setShowModal(true)}
              >
                <Text className="text-md text-white font-medium ">
                  Change Details
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Card
            className=""
            isFavScreen={isFavScreen}
            isInfoScreen={isInfoScreen}
            handleDelete={handleDelete}
            handleFavPress={handleFavPress}
            spots={spots}
            favs={favs}
          />
        </View>
      );
    } else return <LoginScreen />;
  };

  return (
    <>
      <WhichScreen
        isFavScreen={isFavScreen}
        isInfoScreen={isInfoScreen}
        user={user}
      />
      {showModal ? (
        <Modal
          animationType="slide"
          className="flex-col bg-white justify-center items-center"
          visible={showModal}
          onRequestClose={() => {
            setShowModal(false);
          }}
        >
          <View className="mt-10 ">
            <TouchableOpacity
              className=" p-2 self-center mb-10 rounded-md shadow-md bg-white h-10 w-20 justify-center items-center"
              style={styles.shadow}
              onPress={() => setShowModal(false)}
            >
              <Text className="text-[#2D8CFF] text-l font-medium">Back</Text>
            </TouchableOpacity>
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
              className="flex-col bg-white justify-center items-center"
              onSubmit={(values) => {
                handleSubmitPost(values);
              }}
            >
              {(props) => (
                <View className="flex-col bg-white justify-center items-center">
                  <SafeAreaView
                    className="border-0 w-8/12 bg-white rounded-3xl"
                    style={styles.input}
                  >
                    <TextInput
                      className=" border-0 rounded-3xl font-medium text-l text-slate-600 text-center shadow-xl"
                      style={styles.inner_input}
                      placeholder="Name"
                      onChangeText={props.handleChange('name')}
                      value={props.values.name}
                    />
                  </SafeAreaView>
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
                  <SafeAreaView
                    className="border-0 w-8/12 bg-white rounded-3xl"
                    style={styles.input}
                  >
                    <TextInput
                      className=" border-0 rounded-3xl font-medium text-l text-slate-600 text-center shadow-xl"
                      style={styles.inner_input}
                      placeholder="Description"
                      onChangeText={props.handleChange('description')}
                      value={props.values.description}
                    />
                  </SafeAreaView>
                  {props.errors.description && (
                    <Text style={{ fontSize: 10, color: 'red' }}>
                      {props.errors.description}
                    </Text>
                  )}
                  <View style={{ alignItems: 'center' }}></View>
                  <View className="flex-1 items-center flex-col justify-center mt-10 items-center bg-white w-screen ">
                    <View className="flex-1 items-center flex-row justify-center bg-white w-screen ">
                      <TouchableOpacity
                        className=" p-2 rounded-md shadow-md bg-white h-10 w-2/5 mx-1 justify-center items-center"
                        style={styles.shadow}
                        title="Pick an image from camera roll"
                        onPress={pickImage}
                      >
                        <Text className="text-[#2D8CFF] text-l font-medium">
                          Image From Gallery
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        className=" p-2 rounded-md shadow-md bg-white h-10 w-2/5 mx-1 justify-center items-center"
                        style={styles.shadow}
                        title="Take a photo with camera"
                        onPress={openCamera}
                      >
                        <Text className="text-[#2D8CFF] text-l font-medium">
                          Take Photo
                        </Text>
                      </TouchableOpacity>

                      {image && (
                        <Image
                          source={{ uri: image }}
                          style={{ width: 200, height: 200 }}
                        />
                      )}
                    </View>

                    <TouchableOpacity
                      className=" p-2 rounded-md shadow-md bg-white mt-6 h-14 w-4/5 justify-center items-center"
                      style={styles.shadow}
                      title="submit"
                      onPress={props.handleSubmit}
                    >
                      <Text className="text-[#2D8CFF] text-xl font-bold">
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    elevation: 2,
    border: 0,
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
