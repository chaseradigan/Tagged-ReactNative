import * as firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyACzooCbf2_x44TdIk-6HLhoaosfDfsiks",
  authDomain: "expoboilerplate.firebaseapp.com",
  databaseURL: "https://expoboilerplate.firebaseio.com",
  projectId: "expoboilerplate",
  storageBucket: "expoboilerplate.appspot.com",
  messagingSenderId: "923879261827",
  appId: "1:923879261827:web:c9803db4532d018a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
