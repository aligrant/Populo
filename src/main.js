import Phaser from 'phaser';
import GameScene from './scenes/GameScene.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: '100%',
  height: '100%',
  backgroundColor: '#a3a3a3',
  scene: [GameScene]
};

window.game = new Phaser.Game(config);

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