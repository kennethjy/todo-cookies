import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAtJHtSpl5gsDmZf8XE2U0797ndIDXg7qU",
    authDomain: "vite-test-projectt.firebaseapp.com",
    projectId: "vite-test-projectt",
    storageBucket: "vite-test-projectt.appspot.com",
    messagingSenderId: "730310663151",
    appId: "1:730310663151:web:d146930488431b9381f41a",
    measurementId: "G-QFVDF4MB23"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function App() {return app;}
export function Auth() {return auth;}

