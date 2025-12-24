// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqjJyb_OWw4NmvwF9YtVRXTJlKoNG9wYA",
  authDomain: "portfolio-website-hugo.firebaseapp.com",
  projectId: "portfolio-website-hugo",
  storageBucket: "portfolio-website-hugo.firebasestorage.app",
  messagingSenderId: "214519703618",
  appId: "1:214519703618:web:c09817cd161fc62be0e5db",
  measurementId: "G-31CC8NZQKT"
};

// Initialize Firebase (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Analytics is only available in the browser
let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };
