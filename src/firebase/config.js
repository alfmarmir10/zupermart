// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmUU5XInM1tucAbTOhZNW82uxajZME_4I",
  authDomain: "zupermart-2ee72.firebaseapp.com",
  projectId: "zupermart-2ee72",
  storageBucket: "zupermart-2ee72.appspot.com",
  messagingSenderId: "67365332747",
  appId: "1:67365332747:web:150ef4edf08bda958d640e",
  measurementId: "G-ZMGF86ME4T"
};
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  'login_hint': 'user@example.com'
});

const auth = getAuth();
signInWithPopup(auth, googleAuthProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const analytics = getAnalytics(app);