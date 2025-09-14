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
const unlockPopup = document.getElementById("unlock-popup");
const animalNameEl = document.getElementById("animal-name");
const animalLinkEl = document.getElementById("animal-link");
const closeUnlockBtn = document.getElementById("close-unlock");
// Function to show popup when an animal is unlocked

function showUnlockPopup(animal) {
  // animal is an object like { name: "Vaquita", link: "https://example.com/vaquita" }

  animalNameEl.textContent = animal.name;
  animalLinkEl.href = animal.link;

  unlockPopup.style.display = "block";
}

// Close popup
closeUnlockBtn.addEventListener("click", () => {
  unlockPopup.style.display = "none";
});

// Optional: close if you click the backdrop
window.addEventListener("click", (e) => {
  if (e.target === unlockPopup) {
    unlockPopup.style.display = "none";
  }
});
closeUnlockBtn.addEventListener("click", () => {
  unlockPopup.style.display = "none";

});

// Optional: close if you click the backdrop
window.addEventListener("click", (e) => {
  if (e.target === unlockPopup) {
    unlockPopup.style.display = "none";
  }
});

const animals = {
  "yangtze-finless-porpoise": {
    name: "Yangtze Finless Porpoise",
    link: "https://wwf.panda.org/discover/knowledge_hub/endangered_species/yangtze_finless_porpoise/"
  },
  "western-lowland-gorilla": {
    name: "Western Lowland Gorilla",
    link: "https://wwf.panda.org/discover/knowledge_hub/endangered_species/great_apes/gorillas/"
  },
  "vaquita": {
    name: "Vaquita",
    link: "https://wwf.panda.org/discover/knowledge_hub/endangered_species/vaquita/"
  },
  "sunda-tiger": {
    name: "Sunda Tiger",
    link: "https://wwf.panda.org/discover/knowledge_hub/endangered_species/tiger/"
  },
  "sumatran-rhino": {
    name: "Sumatran Rhino",
    link: "https://wwf.panda.org/discover/knowledge_hub/endangered_species/rhinos/"
  },
  "sumatran-orangutan": {
    name: "Sumatran Orangutan",
    link: "https://wwf.panda.org/discover/knowledge_hub/endangered_species/great_apes/orangutans/"
  },
  "sumatran-elephant": {
    name: "Sumatran Elephant",
    link: "https://wwf.panda.org/discover/knowledge_hub/endangered_species/elephants/asian_elephants/"
  },
  "saola": {
    name: "Saola",
    link: "https://wwf.panda.org/discover/knowledge_hub/endangered_species/saola/"
  },
  "orangutan": {
    name: "Orangutan",
    link: "https://wwf.panda.org/discover/knowledge_hub/endangered_species/great_apes/orangutans/"
  },
  "javan-rhino": {
    name: "Javan Rhino",
    link: "https://wwf.panda.org/discover/knowledge_hub/endangered_species/rhinos/javan_rhino/"
  },
  "hawksbill-turtle": {
    name: "Hawksbill Turtle",
    link: "https://wwf.panda.org/discover/knowledge_hub/endangered_species/marine_turtles/hawksbill_turtle/"
  },
  "eastern-lowland-gorilla": {
    name: "Eastern Lowland Gorilla",
    link: "https://wwf.panda.org/discover/knowledge_hub/endangered_species/great_apes/gorillas/"
  },
  "cross-river-gorilla": {
    name: "Cross River Gorilla",
    link: "https://wwf.panda.org/discover/knowledge_hub/endangered_species/great_apes/gorillas/"
  },
  "bornean-orangutan": {
    name: "Bornean Orangutan",
    link: "https://wwf.panda.org/discover/knowledge_hub/endangered_species/great_apes/orangutans/"
  },
  "black-rhino": {
    name: "Black Rhino",
    link: "https://wwf.panda.org/discover/knowledge_hub/endangered_species/rhinos/"
  },
  "amur-leopard": {
    name: "Amur Leopard",
    link: "https://wwf.panda.org/discover/knowledge_hub/endangered_species/amur_leopard/"
  },
  "african-forest-elephant": {
    name: "African Forest Elephant",
    link: "https://wwf.panda.org/discover/knowledge_hub/endangered_species/elephants/african_elephants/"
  }
};

// Player just unlocked the vaquita

showUnlockPopup(animals["vaquita"]);

