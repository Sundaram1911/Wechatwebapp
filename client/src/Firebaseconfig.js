import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

 
const firebaseConfig = {
  apiKey: "AIzaSyDBbApkRMJkn4dY63xryn1ySYvwtKlCLYQ",
  authDomain: "wechat-de0c7.firebaseapp.com",
  projectId: "wechat-de0c7",
  storageBucket: "wechat-de0c7.appspot.com",
  messagingSenderId: "58836727563",
  appId: "1:58836727563:web:32b1fed58f501d9c70540e"
};
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
export const auth = getAuth(app);