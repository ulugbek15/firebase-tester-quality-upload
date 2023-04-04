import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB7pZpe9Y20kgzXyssCt1a-xE7LP1a3jsI",
  authDomain: "total-quality-express.firebaseapp.com",
  projectId: "total-quality-express",
  storageBucket: "total-quality-express.appspot.com",
  messagingSenderId: "369030460010",
  appId: "1:369030460010:web:a70367ba6f03645d771013",
  measurementId: "G-FTGPESPFHH",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
