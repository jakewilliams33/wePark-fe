import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const askNotification = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (Device.isDevice && status === 'granted')
    console.log('Notification permissions granted.');
};

export default BusyButton = ({ selectedSpotInfo }) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  let time;

  selectedSpotInfo.time_limit === null
    ? (time = null)
    : (time = (selectedSpotInfo.time_limit - 5) * 60);

  console.log(time);

  useEffect(() => {
    askNotification();
    const listener = Notifications.addNotificationReceivedListener();
    return () => listener.remove();
  }, []);

  const handlePress = (time) => {
    const schedulingOptions = {
      content: {
        title: 'wePark',
        body: 'You have 5 minutes left in your spot!',
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        color: 'red',
      },
      trigger: {
        seconds: time,
      },
    };

    Notifications.scheduleNotificationAsync(schedulingOptions);

    setButtonClicked(true);
  };

  return (
    <View>
      <TouchableOpacity
        className={
          buttonClicked
            ? 'rounded-md bg-green-600 h-14 w-14 justify-center items-center'
            : 'rounded-md bg-white h-14 w-14 justify-center items-center'
        }
        onPress={() => {
          handlePress(time);
        }}
        disabled={time === null ? true : false}
      >
        <Ionicons size={20} name={'alarm-outline'} color={'white'} />
        <Text className="text-m text-[#2D8CFF] font-medium text-center">
          Timer
        </Text>
      </TouchableOpacity>
    </View>
  );
};
