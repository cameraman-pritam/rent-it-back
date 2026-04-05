import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

if (process.env.NODE_ENV === "development") {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

// 3. Initialize App Check
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LebR6QsAAAAAGE5ZoAQCpwJMrN_IWh3v4dNN6WV"),

  // Optional but recommended: automatically refreshes the security token
  isTokenAutoRefreshEnabled: true,
});

export const auth = getAuth(app);
export const db = getFirestore(app);
