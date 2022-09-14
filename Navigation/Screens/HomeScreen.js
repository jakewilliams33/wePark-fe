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

import NavSpotButton from '../Buttons/NavSpotButton';

const noUserObject = {
  username: 'No User',
  avatar:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkjktNk_waKZ6A064JikKQRYLxoKPNIUR_g&usqp=CAU',
  about: 'Some random user bio',
  kudos: 0,
};

export default function HomeScreen({ navigation }) {
  const [text, onChangeText] = useState('Where do you want to park?');

  // static contextType = UserContext
  const { history, setHistory } = useContext(HistoryContext);
  const { user } = useContext(UserContext);
  const [visits, incVisits] = useState(0);
  // const navigation = useNavigation();

  useEffect(() => {
    const forceUpdate = navigation.addListener('focus', () => {
      incVisits(visits + 1);
    });
  });

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
    >
      {history.length === 0 && (
        <>
          <View className=" basis-1/6 w-screen items-center justify-evenly">
            <Text className="text-7xl text-slate-600 font-bold">We Park</Text>
            <Text className="text-xl text-slate-600 font-medium">
              But Mostly We Care
            </Text>
          </View>

          <View className=" flex-1 flex-col justify-evenly items-center basis-2/4 w-screen">
            {/* <View className="flex-row justify-center">
              <View className="mx-5">
                <TouchableOpacity className=" p-2 rounded-md bg-slate-400">
                  <Text className="text-white text-l font-medium">
                    Favourites
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="mx-5">
                <TouchableOpacity className=" p-2 rounded-md bg-slate-400">
                  <Text className="text-white text-l font-medium">
                    Favourites
                  </Text>
                </TouchableOpacity>
              </View>
            </View> */}
            {user ? (
              <>
                <View className="w-9/12 p-2 px-6 rounded-lg flex-row justify-around items-center rounded-md bg-slate-400">
                  <Image
                    className="w-16 h-16 rounded-full "
                    source={{
                      uri: user.avatar || noUserObject.avatar,
                    }}
                  />
                  <Text className="text-l text-white font-medium mt-2">
                    Username: {user.username}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View className="w-9/12 p-2 px-6 rounded-lg rounded-md bg-slate-400">
                  <Text className="text-m text-white font-medium text-center">
                    No Logged In User
                  </Text>
                  <TouchableOpacity
                    className="mt-2 rounded-md bg-slate-600 h-8 w-30 px-2 flex-row justify-center items-center"
                    onPress={handleNavLogin}
                  >
                    <Text className="text-m text-white font-medium text-center">
                      Login or Sign-Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            <SafeAreaView className="w-8/12 ">
              <TextInput
                className="rounded-md shadow-xl"
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
              />
            </SafeAreaView>
            <View className=" p-2 px-6 rounded-lg rounded-md bg-slate-400">
              <Text className="text-l text-white font-medium mt-2">
                No Recent History
              </Text>
            </View>
          </View>

          <View className=" basis-1/4 flex-1 flex-col justify-evenly  p-2 mb-4 rounded-lg px-14 rounded-md bg-slate-400">
            <View className="flex-row justify-center">
              <Ionicons name={'golf-outline'} size={20} color={'darkBlue'} />
              <Text className="text-white text-l font-medium ml-2">
                This is a Featured Place
              </Text>
            </View>
            <View className="flex-row justify-center">
              <Ionicons name={'golf-outline'} size={20} color={'darkBlue'} />
              <Text className="text-white text-l font-medium ml-2">
                This is a Featured Place
              </Text>
            </View>
            <View className="flex-row justify-center">
              <Ionicons name={'golf-outline'} size={20} color={'darkBlue'} />
              <Text className="text-white text-l font-medium ml-2">
                This is a Featured Place
              </Text>
            </View>
          </View>
        </>
      )}
      {history.length > 0 && (
        <>
          <View className=" basis-1/6 w-screen items-center justify-evenly">
            <Text className="text-7xl text-slate-600 font-bold">We Park</Text>
            <Text className="text-xl text-slate-600 font-medium">
              But Mostly We Care
            </Text>
          </View>

          <View className=" flex-1 flex-col justify-evenly items-center basis-2/4 w-screen">
            {/* <View className="flex-row justify-center">
              <View className="mx-5">
                <TouchableOpacity className=" p-2 rounded-md bg-slate-400">
                  <Text className="text-white text-l font-medium">
                    Favourites
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="mx-5">
                <TouchableOpacity className=" p-2 rounded-md bg-slate-400">
                  <Text className="text-white text-l font-medium">
                    Favourites
                  </Text>
                </TouchableOpacity>
              </View>
            </View> */}

            {user ? (
              <>
                <View className="w-9/12 p-2 px-6 rounded-lg flex-row justify-around items-center rounded-md bg-slate-400">
                  <Image
                    className="w-16 h-16 rounded-full "
                    source={{
                      uri: user.avatar || noUserObject.avatar,
                    }}
                  />
                  <Text className="text-l text-white font-medium mt-2">
                    Username: {user.username}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View className="w-9/12 p-2 px-6 rounded-lg rounded-md bg-slate-400">
                  <Text className="text-l text-white font-medium mt-2">
                    No Logged In User
                  </Text>
                  <TouchableOpacity
                    className="  mt-2 rounded-md bg-slate-600 h-8 w-30 px-2 flex-row justify-center items-center"
                    onPress={handleNavLogin}
                  >
                    <Text className="text-m text-white font-medium text-center">
                      Login or Sign-Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            <SafeAreaView className="w-8/12 ">
              <TextInput
                className="rounded-md shadow-xl"
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
              />
            </SafeAreaView>
            <View className=" p-2 px-6 rounded-lg rounded-md bg-slate-400">
              <>
                {history.map((spot, index) => {
                  console.log('in homescreen map of recent history', spot);
                  if (index < 3)
                    return (
                      <View className="m-1 flex-col justify-center items-center">
                        <View className="flex-row justify-evenly">
                          <FontAwesomeIcon icon={faCar} />
                          <Text className="text-white text-l font-medium ml-2">
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

          <View className=" basis-1/4 flex-1 flex-col justify-evenly  p-2 mb-4 rounded-lg px-14 rounded-md bg-slate-400">
            <View className="flex-row justify-center">
              <Ionicons name={'golf-outline'} size={20} color={'darkBlue'} />
              <Text className="text-white text-l font-medium ml-2">
                This is a Featured Place
              </Text>
            </View>
            <View className="flex-row justify-center">
              <Ionicons name={'golf-outline'} size={20} color={'darkBlue'} />
              <Text className="text-white text-l font-medium ml-2">
                This is a Featured Place
              </Text>
            </View>
            <View className="flex-row justify-center">
              <Ionicons name={'golf-outline'} size={20} color={'darkBlue'} />
              <Text className="text-white text-l font-medium ml-2">
                This is a Featured Place
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    elevation: 2,
  },
});
