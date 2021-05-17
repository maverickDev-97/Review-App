import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCVjmzEDUHl8v249PG5DH2F52VTivUOp4U",
    authDomain: "car-rev.firebaseapp.com",
    projectId: "car-rev",
    storageBucket: "car-rev.appspot.com",
    messagingSenderId: "381340381518",
    appId: "1:381340381518:web:89316b019fc5a23fd92e1f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };