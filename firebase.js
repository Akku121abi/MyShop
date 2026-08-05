// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {

  apiKey: "AIzaSyBwU2YXNbJqBc2s9ck2CoNMFupXLf7DJPs",

  authDomain: "myshop-508c1.firebaseapp.com",

  projectId: "myshop-508c1",

  storageBucket: "myshop-508c1.firebasestorage.app",

  messagingSenderId: "357256395224",

  appId: "1:357256395224:web:d2c6e4523e8ab5540a9aad"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export
export { auth, db, storage };
