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
import CarouselCards from './ScreenComponents/CarouselCards';

const featuredSpots = [121, 2];

const noUserObject = {
  username: 'No User',
  avatar:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkjktNk_waKZ6A064JikKQRYLxoKPNIUR_g&usqp=CAU',
  about: 'Some random user bio',
  kudos: 0,
};

export default function HomeScreen({ navigation }) {
  const [text, onChangeText] = useState('Where do you want to park?');
  const [featuredSpot, setFeaturedSpot] = useState();
  // static contextType = UserContext
  const { history, setHistory } = useContext(HistoryContext);
  const { user } = useContext(UserContext);
  const [visits, incVisits] = useState(0);
  // const navigation = useNavigation();
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    const forceUpdate = navigation.addListener('focus', () => {
      incVisits(visits + 1);
      forceUpdate();
    });
  }, []);

  useEffect(() => {
    const featuredIndex = Math.floor(Math.random() * featuredSpots.length);
    console.log('featuredIndex', featuredIndex);
    axios
      .get(
        `https://wepark-be.herokuapp.com/api/spots/${featuredSpots[featuredIndex]}`
      )
      .then(({ data }) => {
        return data;
      })
      .then(({ spot }) => {
        console.log('spot in homescreen', spot);
        setFeaturedSpot(spot);
      })
      .then(() => {
        console.log('.then.then.then', [featuredSpot.images]);
        const newCarouselData = [featuredSpot.images].map((image) => {
          return {
            title: 'image',
            body: 'unneeded',
            imgUrl: image,
          };
        });

        setCarouselData(newCarouselData);

        console.log(
          "here's the carousel of festured spot images",
          carouselData
        );
      })
      .catch(function (error) {
        console.log(
          'ERROR IN HomeScreen FeaturedPlace, Spot: err:',

          error
        );
      });
  }, []);

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
      className="flex-1 items-center justify-evenly bg-white w-screen"
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
            className=" flex-1 flex-col justify-evenly items-center basis-2/4 w-screen bg-white shadow-md"
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
                <View
                  className="w-9/12 p-2 px-6 rounded-lg rounded-md bg-white shadow-md"
                  style={styles.shadow}
                >
                  <Text className="text-m text-[#2D8CFF] font-medium text-center">
                    No Logged In User
                  </Text>
                  <TouchableOpacity
                    className="mt-2 rounded-md bg-white h-8 w-30  flex-row justify-center items-center"
                    style={styles.shadow}
                    onPress={handleNavLogin}
                  >
                    <Text className="text-m text-[#2D8CFF] font-medium text-center">
                      Login or Sign-Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            <SafeAreaView
              className="w-8/12 pb-2 bg-white rounded-3xl border-0"
              style={styles.input}
            >
              <TextInput
                className=" border-0 rounded-3xl font-medium text-l text-slate-600 text-center shadow-xl"
                onChangeText={onChangeText}
                value={text}
                style={styles.inner_input}
              />
            </SafeAreaView>
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
            <View className=" basis-1/4 flex-1 flex-col justify-evenly  p-2 rounded-lg px-14 rounded-md bg-white px-2 w-screen">
              <View className="justify-center items-center  mx-8 px-2">
                {/* <Ionicons name={'golf-outline'} size={20} color={'darkBlue'} /> */}
                <Text className="text-[#2D8CFF] text-l font-medium ml-2">
                  Featured Spot: {featuredSpot.name}
                </Text>
                <Text className="text-[#2D8CFF] text-l font-medium ml-2">
                  {featuredSpot.description}
                </Text>
              </View>
              <CarouselCards data={carouselData} />
            </View>
          )}
        </>
      )}
      {history.length > 0 && (
        <>
          <View className=" basis-1/6 w-screen items-center justify-evenly bg-white">
            <Text className="text-7xl text-slate-600 font-bold">We Park</Text>
            <Text className="text-xl text-slate-600 font-medium">
              But Mostly We Care
            </Text>
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

            <SafeAreaView
              className="border-0 w-8/12 bg-white rounded-3xl"
              style={styles.input}
            >
              <TextInput
                className=" border-0 rounded-3xl font-medium text-l text-slate-600 text-center shadow-xl"
                style={styles.inner_input}
                onChangeText={onChangeText}
                value={text}
              />
            </SafeAreaView>
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
            <View className=" basis-3/5 flex-1 flex-col justify-end items-center p-2  px-14  bg-[#2D8CFF] px-2 w-screen">
              <View className="justify-center items-center  mx-8 px-2">
                <Ionicons name={'golf-outline'} size={20} color={'white'} />
                <Text className="text-white text-l font-medium ml-2">
                  Featured Spot: {featuredSpot.name}
                </Text>
                <Text className="text-white text-l font-medium ml-2">
                  {featuredSpot.description}
                </Text>
              </View>
              <CarouselCards className="mr-2" data={carouselData} />
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
