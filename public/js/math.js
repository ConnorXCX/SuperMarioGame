// const matrix = new Matrix();

// matrix.set(5, 4, { name: "ground" });

// const tile = matrix.get(mario.pos.x * TILE_SIZE, mario.pos.y * TILE_SIZE);

export class Matrix {
  constructor() {
    this.grid = {};
  }

  get(x, y) {
    const col = this.grid[x];
    if (col) {
      return col[y];
    }
    return undefined;
  }

  set(x, y, value) {
    if (!this.grid[x]) {
      this.grid[x] = [];
    }
    this.grid[x][y] = value;
  }
}

export class Vector {
  constructor(x, y) {
    this.set(x, y);
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }
}
