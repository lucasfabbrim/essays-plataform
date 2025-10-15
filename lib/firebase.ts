import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCDpA1NPHVdmjiEHPT8mqujLV6gMLewCmo",
  authDomain: "noteplanning-187c1.firebaseapp.com",
  projectId: "noteplanning-187c1",
  storageBucket: "noteplanning-187c1.firebasestorage.app",
  messagingSenderId: "863850009434",
  appId: "1:863850009434:web:5e1cbd5793ba722e601963",
}

// Initialize Firebase (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

export default app
