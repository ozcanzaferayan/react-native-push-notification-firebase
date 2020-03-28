import React, {useEffect} from 'react';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

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
      .then((status: FirebaseMessagingTypes.AuthorizationStatus) => {
        if (status === 1) {
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
      showNotification(response.data!.notification);
    });
  };

  const showNotification = (notification: any) => {
    console.log('Showing notification');
    console.log(JSON.stringify(notification));
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

  // PushNotification.localNotification({
  //   title: 'ads',
  //   message: 'asd',
  // });

  // useEffect(
  //   () =>
  //     PushNotificationIOS.presentLocalNotification({
  //       alertTitle: 'title',
  //       alertBody: 'body',
  //     }),
  //   [],
  // );
  return <></>;
};

export default App;
