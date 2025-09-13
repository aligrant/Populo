export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

    preload() {
        this.load.image('sprite-1', 'assets/placeholder1.png');
        this.load.image('sprite-2', 'assets/placeholder2.png');
        this.load.image('sprite-3', 'assets/placeholder3.png');
    }

    create() {
        const ROWS = 8, COLS = 5, CELL = 128;
        this.CELL = CELL;

        const size = Math.floor(CELL * 0.8);

        const g = this.add.graphics();
        // g.fillStyle(0xffcc66, 1);
        g.fillRoundedRect(0, 0, size, size, 12);
        g.generateTexture('sprite-text', size, size);
        g.destroy();

        this.board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
        const cellCenter = (r, c) => ({ x: c * CELL + CELL / 2, y: r * CELL + CELL / 2 });

        this.spawnSprite(1, 0, 0);
        this.spawnSprite(1, 1, 0);
        this.spawnSprite(2, 2, 1);

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', (pointer, gameObject) => {
      const col = Phaser.Math.Clamp(Math.floor(gameObject.x / CELL), 0, COLS - 1);
      const row = Phaser.Math.Clamp(Math.floor(gameObject.y / CELL), 0, ROWS - 1);
      const target = this.board[row][col];
      const old = gameObject.getData('cell');

      // Case A: empty target cell -> move
      if (!target) {
        if (old) this.board[old.r][old.c] = null;
        this.board[row][col] = gameObject;
        gameObject.setData('cell', { r: row, c: col });
        const { x, y } = cellCenter(row, col);
        this.tweens.add({ targets: gameObject, x, y, duration: 150, ease: 'Power2' });
        return;
      }

      // Case B: same level -> merge
    if (target !== gameObject && target.getData('level') === gameObject.getData('level')) {
    const newLevel = gameObject.getData('level') + 1;

    // remove the target (merge it)
    this.board[row][col] = null;
    target.destroy();
    if (old) this.board[old.r][old.c] = null;

    gameObject.setData('level', newLevel);

    // update label
    const txt = gameObject.getByName('levelText');
    if (txt) txt.setText(String(newLevel));

    // update texture
    const sprite = gameObject.list.find(child => child.type === 'Image');
    if (sprite) {
        const key = this.textures.exists(`sprite-${newLevel}`)
        ? `sprite-${newLevel}`
        : `sprite-1`;
        sprite.setTexture(key);
    }

    this.board[row][col] = gameObject;
    gameObject.setData('cell', { r: row, c: col });
    const { x, y } = cellCenter(row, col);

    // small animation to show merge
    this.tweens.add({
        targets: gameObject,
        x,
        y,
        scaleX: 1.2,
        scaleY: 1.2,
        yoyo: true,
        duration: 180,
        ease: 'Power2'
    });

    return;
    }


      // Case C: blocked / invalid -> snap back to original cell or nearest empty
      if (old) {
        const { x, y } = cellCenter(old.r, old.c);
        this.tweens.add({ targets: gameObject, x, y, duration: 150, ease: 'Power2' });
      } else {
        // try to put in first empty cell
        let placed = false;
        for (let r = 0; r < ROWS && !placed; r++) {
          for (let c = 0; c < COLS && !placed; c++) {
            if (!this.board[r][c]) {
              this.board[r][c] = gameObject;
              gameObject.setData('cell', { r, c });
              const { x, y } = cellCenter(r, c);
              this.tweens.add({ targets: gameObject, x, y, duration: 150, ease: 'Power2' });
              placed = true;
            }
          }
        }
        if (!placed) {
          // board full: send to center
          this.tweens.add({ targets: gameObject, x: this.cameras.main.centerX, y: this.cameras.main.centerY, duration: 150 });
        }
      }
    });


    }



    spawnSprite(level, row, col) {
    const CELL = this.CELL;
    const size = Math.floor(CELL * 0.8);
    const x = col * CELL + CELL / 2;
    const y = row * CELL + CELL / 2;

    const key = this.textures.exists(`sprite-${level}`) ? `sprite-${level}` : 'sprite-1';
    const sprite = this.add.image(0, 0, key).setDisplaySize(size, size);

    
    const levelText = this.add.text(0, 0, String(level), { fontSize: '24px', color: '#000' }).setOrigin(0.5);
    levelText.setName('levelText');

    const container = this.add.container(x, y, [sprite, levelText]);

    const w = size, h = size;
    container.setSize(w, h);

    // make the container interactive by giving it a rectangular hit area
    container.setInteractive(new Phaser.Geom.Rectangle(-w / 2, -h / 2, w, h), Phaser.Geom.Rectangle.Contains);

    this.input.setDraggable(container);

    container.setData('level', level);
    container.setData('cell', { r: row, c: col });

    this.board[row][col] = container;
  }
}

