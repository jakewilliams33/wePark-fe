import React, { useEffect, useState, useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { UserContext } from '../AppContext';
import LoginComponent from './ScreenComponents/LoginComponent.js';
import SignUpComponent from './ScreenComponents/SignUpComponent.js';
import MainLoginComponent from './ScreenComponents/MainLoginComponent.js';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    elevation: 2,
  },
});

export default LoginScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const [screenToDisplay, setScreenToDisplay] = useState('Main');
  const [text1, onChangeText1] = useState('');
  const [text2, onChangeText2] = useState('');
  const [text3, onChangeText3] = useState('');
  const [text4, onChangeText4] = useState('');
  const [text5, onChangeText5] = useState('');
  const [text6, onChangeText6] = useState('');
  const [text7, onChangeText7] = useState('');
  const [loginAttempted, toggleLoginAttempted] = useState(false);
  const [signUpAttempted, toggleSignUpAttempted] = useState(false);

  const [isError, toggleIsError] = useState(false);

  const handleSignUpSubmit = () => {
    if (text1) {
      toggleSignUpAttempted(true);
    } else {
      onChangeText1('');
      onChangeText2('');
      onChangeText3('');
      onChangeText4('');
      onChangeText5('');
      return;
    }
  };

  const handleLoginSubmit = () => {
    if (text6) {
      toggleLoginAttempted(true);
    } else {
      onChangeText6('');
      onChangeText7('');
      return;
    }
  };
  const handlePress = (event) => {
    const dest = event.destination;
    toggleIsError(false);
    setScreenToDisplay(dest);
  };

  useEffect(() => {
    if (loginAttempted) {
      axios
        .get(`https://wepark-be.herokuapp.com/api/users/${text6}`)
        .then((response) => {
          toggleLoginAttempted(false);
          return response.data;
        })
        .then((user) => {
          setUser(user.user);
        })
        .catch((err) => {
          if (err) {
            toggleIsError(true);
          }
        });
    }
  }, [loginAttempted]);

  useEffect(() => {
    if (signUpAttempted) {
      axios
        .post('https://wepark-be.herokuapp.com/api/users', {
          username: text1,
          about: text3,
          email: text2,
          avatar: text4,
        })
        .then((response) => {
          toggleSignUpAttempted(false);
          return response.data;
        })
        .then((user) => {
          setUser(user.username);
        })
        .catch((err) => {
          if (err) {
            toggleIsError(true);
          }
        });
    }
  }, [signUpAttempted]);

  useEffect(() => {
    if (user) {
    }
  }, [user]);

  switch (screenToDisplay) {
    case 'Main':
      return <MainLoginComponent handlePress={handlePress} />;
      break;

    case 'Login':
      return (
        <>
          <LoginComponent
            styles={styles}
            handlePress={handlePress}
            text6={text6}
            text7={text7}
            onChangeText6={onChangeText6}
            onChangeText7={onChangeText7}
            handleLoginSubmit={handleLoginSubmit}
          />
          {isError ? <Text>Something Went Wrong</Text> : null}
        </>
      );
      break;

    case 'Sign Up':
      return (
        <>
          <SignUpComponent
            styles={styles}
            text1={text1}
            text2={text2}
            text3={text3}
            text4={text4}
            text5={text5}
            handlePress={handlePress}
            handleSignUpSubmit={handleSignUpSubmit}
            onChangeText1={onChangeText1}
            onChangeText2={onChangeText2}
            onChangeText3={onChangeText3}
            onChangeText4={onChangeText4}
            onChangeText5={onChangeText5}
          />
          {isError ? <Text>Something Went Wrong</Text> : null}
        </>
      );
      break;
  }
};
