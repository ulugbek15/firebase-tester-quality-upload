import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCVsrwui7u43CZ7WkxMynl1PvC3YPSnZVo",
  authDomain: "totalquality-bf7cb.firebaseapp.com",
  projectId: "totalquality-bf7cb",
  storageBucket: "totalquality-bf7cb.appspot.com",
  messagingSenderId: "502881214394",
  appId: "1:502881214394:web:d53fa6075df4c9ef71c783",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
