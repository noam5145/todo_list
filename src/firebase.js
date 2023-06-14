// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcfbLsX7KWua9GgbE0iPno2kwkBPf1eb0",
  authDomain: "tfc-soc-ae8cd.firebaseapp.com",
  projectId: "tfc-soc-ae8cd",
  storageBucket: "tfc-soc-ae8cd.appspot.com",
  messagingSenderId: "471100355939",
  appId: "1:471100355939:web:218bac114f0ad74d90cf56",
  measurementId: "G-BW1NDC5KRE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);