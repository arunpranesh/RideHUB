import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import { icons } from 'react-native-elements';
import RootNavigator from './src/navigations/RootNavigator';
import HomeScreen from './src/screens/HomeScreen';
import { AppRegistry } from 'react-native';
import { OriginContextProvider, DestinationContextProvider } from './src/contexts/contexts';
import { name as appName } from './app.json';
import * as firebase from 'firebase/app';
import 'firebase/database'; // Import additional Firebase modules if needed.
 // Import the Firebase Realtime Database module if you're using the

const firebaseConfig = {
  apiKey: "AIzaSyBCIpNqc2TJl6rcmBYaErabSX-CNuz5_vE",
  authDomain: "ridehub-64a08.firebaseapp.com",
  projectId: "ridehub-64a08",
  storageBucket: "ridehub-64a08.appspot.com",
  messagingSenderId: "794607040777",
  appId: "1:794607040777:web:a184f956edc0fd88613bd8",
  databaseURL: 'https://ridehub-64a08-default-rtdb.firebaseio.com/', // Optional if you don't need it
};

firebase.initializeApp(firebaseConfig); // Initialize Firebase with your config

const App = () => {
  return (
 
      <DestinationContextProvider>
        <OriginContextProvider>
          <RootNavigator />
        </OriginContextProvider>
      </DestinationContextProvider>
    
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('main', () => MainApp);
