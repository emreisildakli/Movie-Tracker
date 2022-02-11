import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD91XMkToWZk1QIR7R3EmlDbZ12ZxJrHOw",
    authDomain: "movietracker-28c81.firebaseapp.com",
    projectId: "movietracker-28c81",
    storageBucket: "movietracker-28c81.appspot.com",
    messagingSenderId: "893854971964",
    appId: "1:893854971964:web:b0d079fcdbfe8bbfa72b39"
  };

firebase.initializeApp(firebaseConfig)

// init services

const projectFirestore = firebase.firestore()
const projectAuth= firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp}