// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCOyAqU-Iyl8BQ4TXYOVOQJuwL9YZ0KKVU",
  authDomain: "csv-proejct.firebaseapp.com",
  projectId: "csv-proejct",
  storageBucket: "csv-proejct.appspot.com",
  messagingSenderId: "254827264424",
  appId: "1:254827264424:web:2bd8f4ebfe69e5b5ddc59d",
  measurementId: "G-BB9QSYDCR4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);