import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCIRH0ysTOc4GSIa-4FYDeawhmZETMYrPo",
  authDomain: "whatsapp-web-clone-2a57a.firebaseapp.com",
  projectId: "whatsapp-web-clone-2a57a",
  storageBucket: "whatsapp-web-clone-2a57a.appspot.com",
  messagingSenderId: "741153320862",
  appId: "1:741153320862:web:dbcc3cb6b2fea4da5a708f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {auth, db, provider};