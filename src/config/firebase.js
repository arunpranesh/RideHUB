import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCIpNqc2TJl6rcmBYaErabSX-CNuz5_vE",
    authDomain: "ridehub-64a08.firebaseapp.com",
    projectId: "ridehub-64a08",
    storageBucket: "ridehub-64a08.appspot.com",
    messagingSenderId: "794607040777",
    appId: "1:794607040777:web:a184f956edc0fd88613bd8",
    databaseURL: 'https://ridehub-64a08-default-rtdb.firebaseio.com/',
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Use getAuth from @react-native-firebase/auth
export const database = getFirestore(app);
