import Phaser from 'phaser';
import GameScene from './scenes/GameScene.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 512,
  height: 512,
  backgroundColor: '#fffff',
  scene: [GameScene]
};

window.game = new Phaser.Game(config);
