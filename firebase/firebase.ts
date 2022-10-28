
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCMwL5E8s99jkVOqDC1_x54D147vkdsKDI",
  authDomain: "todo-list-vue-firebase-b920e.firebaseapp.com",
  projectId: "todo-list-vue-firebase-b920e",
  storageBucket: "todo-list-vue-firebase-b920e.appspot.com",
  messagingSenderId: "587850425491",
  appId: "1:587850425491:web:ae76c3c9e3ba850cf39966",
  measurementId: "G-EBFR3FFLQ8"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db:any = getFirestore(app)
