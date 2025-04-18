import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
  authDomain: "second-shot-1d28a.firebaseapp.com",
  projectId: "second-shot-1d28a",
  storageBucket: "second-shot-1d28a.firebasestorage.app",
  messagingSenderId: "754667042297",
  appId: "1:754667042297:web:dd3bde11f4a3c9c0ad7928",
  measurementId: "G-4TMJEYGQFX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
export const db = getFirestore(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

const messaging = getMessaging(app);

export { messaging };

export default app;
