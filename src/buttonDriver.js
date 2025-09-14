const button = document.getElementById('fillButton');
const fill = button.querySelector('.fill');
let progress = 0;
let full = false;

button.addEventListener('click', () => {
  if (progress >= 100) {
    progress = 0;
    fill.style.width = '0%';
    addFromButton()
    return;
  }else{
  progress += 10;
  fill.style.width = progress + '%';
  }
});

setInterval(() => {
  if (progress <= 100) {
    progress += 1;
    fill.style.width = progress + '%';
  }
  else{
    progress = 0;
    fill.style.width = '0%';
    addFromButton()
  }
}, 50);


function addFromButton(){
    const data = window.saveGame();
    console.log("data is " + JSON.stringify(data.board));

    const rowColPairs = data.board.map(item => [item.row, item.col]);

    if(data.board.length<24){
        full = false;
        button.style.backgroundColor = "transparent";
        const emptyCells = [];
        for (let r = 0; r < 6; r++) {
            for (let c = 0; c < 4; c++) {
                if (rowColPairs.every(([row, col]) => row !== r || col !== c)) {
                    window.spawnSprite(1, r, c);
                    console.log("spawned at " + r + "," + c);
                    return;
                }
            }
        }  
    }
    else{
        full = true;
        button.style.backgroundColor = "#0173B9";
    }
    
}