import firebase from 'firebase';

 var config = {
    apiKey: "AIzaSyDdsOjQrAk6pgo9JlSHzozaqCjEv80jy70",
    authDomain: "car-pooling-c285f.firebaseapp.com",
    databaseURL: "https://car-pooling-c285f.firebaseio.com",
    projectId: "car-pooling-c285f",
    storageBucket: "car-pooling-c285f.appspot.com",
    messagingSenderId: "660489018999"
  };

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
