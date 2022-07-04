import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore'
import 'firebase/storage';
import 'firebase/auth'
const config = {
  apiKey: "AIzaSyBS68Zeu6dKQhKMGarupUHWYroFcBGg_xM",
  authDomain: "bhagya-infotech.firebaseapp.com",
  databaseURL: "https://bhagya-infotech-default-rtdb.firebaseio.com",
  projectId: "bhagya-infotech",
  storageBucket: "bhagya-infotech.appspot.com",
  messagingSenderId: "795782647245",
  appId: "1:795782647245:web:8861e31370c3b34b0c0884"
};

firebase.initializeApp(config);
export default firebase