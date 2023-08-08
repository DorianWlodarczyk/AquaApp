// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  getIdToken,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWv2sZP1PPfYljB8_sEWy5mYSOYoIOQOI",
  authDomain: "aquaapp-e6b4c.firebaseapp.com",
  projectId: "aquaapp-e6b4c",
  storageBucket: "aquaapp-e6b4c.appspot.com",
  messagingSenderId: "634843863412",
  appId: "1:634843863412:web:5f0384192321de024a3421",
  measurementId: "G-YVRMZB0KEM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    // localStorage.setItem("idToken", response)
    console.log(response);
  } catch (e) {}
};

export const getToken = async () => {
  const auth = getAuth();
  const { currentUser } = auth;
  console.log(
    "🚀 ~ file: firebase.ts:47 ~ getToken ~ currentUser:",
    currentUser
  );
  if (!currentUser) return "";
  const token = await getIdToken(currentUser!, true);

  return token;
};

export const firebaseAuth = () => {
  return getAuth();
};

export const signInWithMail = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (e) {
    return false;
  }
};

export const signUpWithMail = async (email: string, password: string) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const signOutAccount = async () => {
  const auth = getAuth();
  signOut(auth);
};
