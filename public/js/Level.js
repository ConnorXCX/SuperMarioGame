import Compositor from "./Compositor.js";
import TileCollider from "./TileCollider.js";
import { Matrix } from "./math.js";

export default class Level {
  constructor() {
    this.comp = new Compositor();
    this.entities = new Set();
    this.tiles = new Matrix();
    this.tileCollider = new TileCollider(this.tiles);
    this.gravity = 1500;
    this.totalTime = 0;
  }

  update(deltaTime) {
    this.entities.forEach((entity) => {
      entity.update(deltaTime);

      entity.pos.x += entity.vel.x * deltaTime;
      this.tileCollider.checkX(entity);

      entity.pos.y += entity.vel.y * deltaTime;
      this.tileCollider.checkY(entity);

      this.tileCollider.test(entity);

      entity.vel.y += this.gravity * deltaTime;
    });

    this.totalTime += deltaTime;
  }
}
