import { initializeApp } from "firebase/app";
import { onOthStateChanged, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "./firebaseInit.js";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign up
window.signup = async function() {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Account created!");
  } catch (err) {
    alert(err.message);
  }
};

// Log in
window.login = async function() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Logged in!");
  } catch (err) {
    alert(err.message);
  }
};

// Log out
window.logout = async function() {
  await signOut(auth);
};

// Track login state
onAuthStateChanged(auth, user => {
  const info = document.getElementById("user-info");
  const emailEl = document.getElementById("user-email");
  if (user) {
    info.style.display = "block";
    emailEl.textContent = "Logged in as: " + user.email;
  } else {
    info.style.display = "none";
  }
});