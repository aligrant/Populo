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

//save and load player data
// import { doc, setDoc, getDoc } from "firebase/firestore";

// async function savePlayerData(userId, data) {
//   await setDoc(doc(db, "players", userId), data, { merge: true });
// }

// async function loadPlayerData(userId) {
//   const docSnap = await getDoc(doc(db, "players", userId));
//   if (docSnap.exists()) {
//     return docSnap.data();
//   } else {
//     return null;
//   }
// }
const loginPopup = document.getElementById("login-signup");
const loginBtn = document.getElementById("loginBtn");
const closeBtn = document.getElementById("closeBtn");

// Show the popup when "Login/Sign Up" is clicked
loginBtn.addEventListener("click", () => {
  loginPopup.style.display = "block";
});

// Hide the popup when "X" is clicked
closeBtn.addEventListener("click", () => {
  loginPopup.style.display = "none";
});