import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyCVqsVxTt6Vf7zL5LK2eAIdw3tWBu48Qxg",
  authDomain: "docsync-91b21.firebaseapp.com",
  projectId: "docsync-91b21",
  storageBucket: "docsync-91b21.firebasestorage.app",
  messagingSenderId: "775170836045",
  appId: "1:775170836045:web:5e08edc9687b0f5ccafe04"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);