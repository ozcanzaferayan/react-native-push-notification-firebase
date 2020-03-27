import React from 'react';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

const App = () => {
  const getToken = () => {
    firebase
      .messaging()
      .getToken(firebase.app().options.messagingSenderId)
      .then(x => console.log(x))
      .catch(e => console.log(e));
  };

  const registerForRemoteMessages = () => {
    firebase
      .messaging()
      .registerDeviceForRemoteMessages()
      .then(() => {
        console.log('Registered');
        requestPermissions();
      })
      .catch(e => console.log(e));
  };

  const requestPermissions = () => {
    firebase
      .messaging()
      .requestPermission()
      .then((status: FirebaseMessagingTypes.IOSAuthorizationStatus) => {
        if (
          status === FirebaseMessagingTypes.IOSAuthorizationStatus.AUTHORIZED
        ) {
          console.log('Authorized');
          onMessage();
        } else {
          console.log('Not authorized');
        }
      })
      .catch(e => console.log(e));
  };

  const onMessage = () => {
    firebase.messaging().onMessage(response => {
      showNotification(response.notification!);
    });
  };

  const showNotification = (
    notification: FirebaseMessagingTypes.Notification,
  ) => {
    console.log('Showing notification');
    console.log(JSON.stringify(PushNotification));
    PushNotification.localNotification({
      title: notification.title,
      message: notification.body!,
    });
  };

  getToken();
  if (Platform.OS === 'ios') {
    registerForRemoteMessages();
  } else {
    onMessage();
  }
  return <></>;
};

export default App;
