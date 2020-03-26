/* eslint-disable prettier/prettier */

import React, {useEffect} from 'react';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { Platform, PushNotificationIOS } from 'react-native';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';


const App = () => {
    const showNotification = (notification: FirebaseMessagingTypes.Notification) => {
    console.log('showin notification');
    console.log(JSON.stringify(PushNotification));
    PushNotification.localNotification({
      title: notification.title,
      message: notification.body!,
    });
  };
  useEffect(() => {
    firebase
      .messaging()
      .getToken(firebase.app().options.messagingSenderId)
      .then(x => console.log(x))
      .catch(e => console.log(e));
    firebase.messaging().onMessage(response => {
      console.log(JSON.stringify(response));
      if (Platform.OS === 'ios') {
        PushNotificationIOS.requestPermissions().then(showNotification(response.notification!));
      } else {
        showNotification(response.notification!);
      }
    });
  }, []);
  return <></>;
};

export default App;
