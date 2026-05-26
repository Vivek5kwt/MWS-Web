import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDEsJGMyIx3B8Hvq8Sp1BDSSK6B3Wy8WN0",
  authDomain: "msw-fe-57aed.firebaseapp.com",
  projectId: "msw-fe-57aed",
  storageBucket: "msw-fe-57aed.firebasestorage.app",
  messagingSenderId: "291697197449",
  appId: "1:291697197449:web:e36722cc496bdccf15e158",
  measurementId: "G-J9SGL3H6S1"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
