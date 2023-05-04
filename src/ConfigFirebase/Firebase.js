import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDVEuiY0NVvGg73Hr5nlUu0sV1EwFPCX8Q",
  authDomain: "comandas-restaurant-f1622.firebaseapp.com",
  projectId: "comandas-restaurant-f1622",
  storageBucket: "comandas-restaurant-f1622.appspot.com",
  messagingSenderId: "131412577329",
  appId: "1:131412577329:web:e148c353028c458d8cd910",
  measurementId: "G-3Q9Q9L6QQV"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

