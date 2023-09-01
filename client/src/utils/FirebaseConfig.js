import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyD1Hw0p17HcdukXaZWtJ8qCbjYixln61ZQ",
    authDomain: "whatsapp-ef2dd.firebaseapp.com",
    projectId: "whatsapp-ef2dd",
    storageBucket: "whatsapp-ef2dd.appspot.com",
    messagingSenderId: "630205701564",
    appId: "1:630205701564:web:43881c5baa38d6ede55fb9",
    measurementId: "G-NQSPJQF6K8"
  };

  const app = initializeApp(firebaseConfig);
  export const firebaseAuth= getAuth(app);