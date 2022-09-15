import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons/faCar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HistoryContext } from '../AppContext';
import { UserContext } from '../AppContext';
import axios from 'axios';
import NavSpotButton from '../Buttons/NavSpotButton';
import { SliderBox } from 'react-native-image-slider-box';

// const featuredSpots = [121, 2];

const featuredSpot = {
  spot_id: 96,
  name: 'Reddish Vale Car-park',
  latitude: 53.422578863189585,
  longitude: -2.1534053948998673,
  description:
    'A lovely place to park your car near Stockport with bucolic environs',
  opening_time: null,
  closing_time: null,
  time_limit: null,
  upvotes: 2,
  downvotes: 0,
  parking_type: 'carpark',
  creator: 'Alexi',
  created_at: '2022-09-13T08:51:53.286Z',
  isbusy: false,
  lastchanged: '2022-09-13T08:51:53.286Z',
  images: [
    'https://2022-6-sem1-proj5.s3.amazonaws.com/images_1663059113298_reddishvale1.jpg',
    'https://2022-6-sem1-proj5.s3.amazonaws.com/images_1663059113477_Nickies_Pool_-_geograph.org.uk_-_1360217.jpg',
    'https://2022-6-sem1-proj5.s3.amazonaws.com/images_1663059113372_300px-River_Tame_Reddish_Vale.jpg',
  ],
  image_count: 3,
};

const noUserObject = {
  username: 'No User',
  avatar:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkjktNk_waKZ6A064JikKQRYLxoKPNIUR_g&usqp=CAU',
  about: 'Some random user bio',
  kudos: 0,
};

export default function HomeScreen({ navigation }) {
  const [text, onChangeText] = useState('Where do you want to park?');
  // const [featuredSpot, setFeaturedSpot] = useState();
  // static contextType = UserContext
  const { history, setHistory } = useContext(HistoryContext);
  const { user } = useContext(UserContext);
  const [visits, incVisits] = useState(0);
  // const navigation = useNavigation();

  useEffect(() => {
    const forceUpdate = navigation.addListener('focus', () => {
      incVisits(visits + 1);
      forceUpdate();
    });
  }, []);

  // useEffect(() => {
  //   const featuredIndex = Math.floor(Math.random() * featuredSpots.length);
  //   console.log('featuredIndex', featuredIndex);
  //   axios
  //     .get(
  //       `https://wepark-be.herokuapp.com/api/spots/${featuredSpots[featuredIndex]}`
  //     )
  //     .then(({ data }) => {
  //       return data;
  //     })
  //     .then(({ spot }) => {
  //       console.log('spot in homescreen', spot);
  //       setFeaturedSpot(spot);
  //     })
  //     .then(() => {
  //       console.log('.then.then.then', [featuredSpot.images]);
  //       const newCarouselData = [featuredSpot.images].map((image) => {
  //         return {
  //           title: 'image',
  //           body: 'unneeded',
  //           imgUrl: image,
  //         };
  //       });

  //       console.log(
  //         "here's the carousel of festured spot images",
  //         carouselData
  //       );
  //     })
  //     .catch(function (error) {
  //       console.log(
  //         'ERROR IN HomeScreen FeaturedPlace, Spot: err:',

  //         error
  //       );
  //     });
  // }, []);

  const handleNavLogin = () => {
    navigation.navigate('User');
  };

  console.log(
    'top of homescreen, checking anything happens when tab back. and heres the history',
    history
  );
  return (
    <View
      visits={visits}
      className="flex-1 items-center justify-evenly bg-white h-screen w-screen mb-20"
      style={{ elevation: 1 }}
    >
      {history.length === 0 && (
        <>
          <View>
            <Image
              style={{
                width: 300,
                height: 120,
                resizeMode: 'contain',
                marginTop: 10,
              }}
              source={require('../../assets/wePark.png')}
            />
          </View>

          <View
            className=" flex-1 flex-col justify-center items-center basis-2/4 w-screen bg-white shadow-md"
            // style={styles.shadow}
          >
            {/* <View className="flex-row justify-center">
              <View className="mx-5">
                <TouchableOpacity className=" p-2 rounded-md bg-white">
                  <Text className="text-[#2D8CFF] text-l font-medium">
                    Favourites
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="mx-5">
                <TouchableOpacity className=" p-2 rounded-md bg-white">
                  <Text className="text-[#2D8CFF] text-l font-medium">
                    Favourites
                  </Text>
                </TouchableOpacity>
              </View>
            </View> */}
            {user ? (
              <>
                <View
                  className="w-9/12 p-2 px-6 rounded-lg flex-row justify-around items-center rounded-md bg-white shadow-md mb-10"
                  style={styles.shadow}
                >
                  <Image
                    className="w-16 h-16 rounded-full "
                    source={{
                      uri: user.avatar_url || noUserObject.avatar,
                    }}
                  />
                  <View className="flex-col">
                    <Text className="text-l text-[#2D8CFF] font-medium mt-1">
                      Username: {user.username}
                    </Text>
                    <Text className="text-l text-[#2D8CFF] font-bold mt-1">
                      bio: {user.about}
                    </Text>
                    <Text className="text-l text-[#2D8CFF] font-bold mt-1">
                      Kudos: {user.kudos}
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              <>
                <View
                  className="w-9/12 p-2 px-6 rounded-lg rounded-md mb-10 bg-white shadow-md"
                  style={styles.shadow}
                >
                  <Text className="text-m text-[#2D8CFF] font-medium text-center">
                    No Logged In User
                  </Text>
                  <TouchableOpacity
                    className="mt-2 rounded-md bg-[#2D8CFF] h-8 w-30  flex-row justify-center items-center"
                    style={styles.shadow}
                    onPress={handleNavLogin}
                  >
                    <Text className="text-m text-white font-medium text-center">
                      Login or Sign-Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            <View
              className=" p-2 px-6 rounded-lg rounded-md w-9/12 justify-center items-center bg-white shadow-md"
              style={styles.shadow}
            >
              <Text className="text-l text-[#2D8CFF] font-medium mt-2">
                No Recent History
              </Text>
            </View>
          </View>
          {featuredSpot && (
            <View className=" basis-1/4 flex-1 flex-col justify-evenly  p-2 rounded-lg px-2 rounded-md bg-white mt-20 w-screen">
              <View className="justify-center items-center  mx-8 px-2">
                {/* <Ionicons name={'golf-outline'} size={20} color={'darkBlue'} /> */}
                <Text className="text-[#2D8CFF] text-xl font-bold ml-2">
                  Featured Spot: {featuredSpot.name}
                </Text>
                <Text className="text-[#2D8CFF] text-l font-medium ml-2 mb-2">
                  {featuredSpot.description}
                </Text>
                <SliderBox
                  images={featuredSpot.images}
                  ImageLoader={'ActivityIndicator'}
                  autoplay={true}
                  autoplayInterval={4000}
                  circleLoop={true}
                />
              </View>
            </View>
          )}
        </>
      )}
      {history.length > 0 && (
        <>
          <View>
            <Image
              style={{
                width: 300,
                height: 120,
                resizeMode: 'contain',
                marginTop: 10,
              }}
              source={require('../../assets/wePark.png')}
            />
          </View>

          <View className=" flex-1 flex-col justify-evenly items-center basis-2/4 bg-white w-screen">
            {/* <View className="flex-row justify-center">
              <View className="mx-5">
                <TouchableOpacity className=" p-2 rounded-md bg-white">
                  <Text className="text-[#2D8CFF] text-l font-medium">
                    Favourites
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="mx-5">
                <TouchableOpacity className=" p-2 rounded-md bg-white">
                  <Text className="text-[#2D8CFF] text-l font-medium">
                    Favourites
                  </Text>
                </TouchableOpacity>
              </View>
            </View> */}

            {user ? (
              <>
                <View
                  className="w-9/12 p-2 px-6 rounded-lg flex-row justify-around items-center rounded-md bg-white shadow-md"
                  style={styles.shadow}
                >
                  <Image
                    className="w-16 h-16 rounded-full "
                    source={{
                      uri: user.avatar || noUserObject.avatar,
                    }}
                  />
                  <Text className="text-l text-[#2D8CFF] font-medium mt-2">
                    Username: {user.username}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View className="w-9/12 p-2 px-6 rounded-lg rounded-md bg-white">
                  <Text className="text-l text-[#2D8CFF] font-medium mt-2">
                    No Logged In User
                  </Text>
                  <TouchableOpacity
                    className="  mt-2 rounded-md bg-white h-8 w-30 px-2 flex-row justify-center items-center"
                    onPress={handleNavLogin}
                  >
                    <Text className="text-m text-[#2D8CFF] font-medium text-center">
                      Login or Sign-Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            <View className=" p-2 px-6 rounded-lg w-9/12 justify-evenly rounded-md bg-white">
              <>
                {history.map((spot, index) => {
                  console.log('in homescreen map of recent history', spot);
                  if (index < 2)
                    return (
                      <View
                        key={'history' + index}
                        className="m-1 flex-col justify-center items-center"
                      >
                        <View className="flex-row justify-evenly">
                          <FontAwesomeIcon icon={faCar} color="white" />
                          <Text className="text-[#2D8CFF] text-l font-medium ml-2">
                            Name: {spot.name}
                          </Text>
                        </View>
                        <NavSpotButton spot={spot} />
                      </View>
                    );
                })}
              </>
            </View>
          </View>

          {featuredSpot && (
            <View className=" basis-1/4 flex-1 flex-col justify-evenly  p-2 rounded-lg px-2 rounded-md bg-white mt-20 w-screen">
              <View className="justify-center items-center  mx-8 px-2">
                {/* <Ionicons name={'golf-outline'} size={20} color={'darkBlue'} /> */}
                <Text className="text-[#2D8CFF] text-xl font-bold ml-2">
                  Featured Spot: {featuredSpot.name}
                </Text>
                <Text className="text-[#2D8CFF] text-l font-medium ml-2 mb-2">
                  {featuredSpot.description}
                </Text>
                <SliderBox
                  images={featuredSpot.images}
                  ImageLoader={'ActivityIndicator'}
                  autoplay={true}
                  autoplayInterval={4000}
                  circleLoop={true}
                />
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
}

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
      height: -2.5,
    },
    shadowOpacity: 0.69,
    shadowRadius: 2.65,
    elevation: 4,
  },
});
