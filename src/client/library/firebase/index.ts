import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID } from "@/config/env";
import { initializeApp, getApps } from "firebase/app";
import "firebase/auth";

const FirebaseCredentials = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID
}

if (!getApps().length) {
  initializeApp(FirebaseCredentials)
}