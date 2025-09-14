// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// // Sign up
// async function signup(email, password) {
//   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//   console.log("New user:", userCredential.user);
// }

// // Log in
// async function login(email, password) {
//   const userCredential = await signInWithEmailAndPassword(auth, email, password);
//   console.log("Logged in:", userCredential.user);
// }

// save and load player data
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from "firebase/auth";

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
const db = getFirestore(app);

// --- Save & Load Functions ---
async function savePlayerData(userId, data) {
  await setDoc(doc(db, "players", userId), data, { merge: true });
}

async function loadPlayerData(userId) {
  const docSnap = await getDoc(doc(db, "players", userId));
  return docSnap.exists() ? docSnap.data() : null;
}

// --- UI Stuff ---
const loginPopup = document.getElementById("login-signup");
const loginBtn = document.getElementById("loginBtn");
const closeBtn = document.getElementById("closeBtn");

loginBtn.addEventListener("click", () => {
  loginPopup.style.display = loginPopup.style.display === "block" ? "none" : "block";
});

closeBtn.addEventListener("click", () => {
  loginPopup.style.display = "none";
});

document.getElementById("save").addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) {
    return alert("You must be logged in to save your game.");
  }

  try {
    const gameData = window.saveGame();  
    await savePlayerData(user.uid, { gameData });
    alert("Game saved!");
  } catch (err) {
    console.error(err);
    alert("Error saving game: " + err.message);
  }
});


document.getElementById("load").addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) {
    return alert("You must be logged in to load your game.");
  }

  try {
    const data = await loadPlayerData(user.uid);
    if (data) {
      console.log("data is" + JSON.stringify(data));
      window.loadGame(data.gameData);
      alert("Game loaded!");
    } else {
      alert("No saved game data found.");
    }
  } catch (err) {
    console.error(err);
    alert("Error loading game: " + err.message);
  }
});



