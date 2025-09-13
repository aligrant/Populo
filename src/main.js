import Phaser from 'phaser';
import GameScene from './scenes/GameScene.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 512,
  height: 589,
  backgroundColor: '#cbd5e1',
  scene: [GameScene],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 512,
    height: 589,
  },
};

window.game = new Phaser.Game(config);
const infoBtn = document.getElementById("infoToggleBtn");
const infoBox = document.getElementById("infoBox");

// Toggle the info box visibility
infoBtn.addEventListener("click", () => {
  if (infoBox.style.display === "block") {
    infoBox.style.display = "none";
  } else {
    infoBox.style.display = "block";
  }
});