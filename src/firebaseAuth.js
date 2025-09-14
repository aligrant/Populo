import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { get } from "jquery";
import { loadPlayerData, savePlayerData } from "./authenticate";

var maxLevel = 1;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("signup-button").addEventListener("click", signup);
document.getElementById("login-button").addEventListener("click", login);
document.getElementById("logout-button").addEventListener("click", logout);

// Sign up
async function signup() {
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
async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    maxLevel = (await loadPlayerData()).maxLevel;
    alert("Logged in!");
  } catch (err) {
    alert(err.message);
  }
};

// Log out
async function logout() {
  savePlayerData(auth.currentUser.uid, { maxLevel });
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

 export function getMaxLevel() {
  return maxLevel;
 }
 getMaxLevel();


  export function setMaxLevel(level) {
    if (level > maxLevel) {
      maxLevel = level;
      if (auth.currentUser) {
        savePlayerData(auth.currentUser.uid, { maxLevel });
      }
    }
  }
  export function reloadMaxLevel() {
    if (auth.currentUser) {
      loadPlayerData(auth.currentUser.uid).then(data => {
        if (data && data.maxLevel !== undefined) {
          maxLevel = data.maxLevel;
        }
      });
    }
  }




