import Entity from "./Entity.js";
import { loadMarioSprite } from "./sprites.js";

// class Velocity extends Trait {
//   constructor() {
//     super("velocity");
//   }

//   update(entity, deltaTime) {
//     entity.position.x += entity.velocity.x * deltaTime;
//     entity.position.y += entity.velocity.y * deltaTime;
//   }
// }

export function createMario() {
  return loadMarioSprite().then((sprites) => {
    const mario = new Entity();

    // mario.addTrait(new Velocity());

    mario.draw = function drawMario(context) {
      sprites.draw("idle", context, this.position.x, this.position.y);
    };

    mario.update = function updateMario(deltaTime) {
      mario.position.x += mario.velocity.x * deltaTime;
      mario.position.y += mario.velocity.y * deltaTime;
    };

    return mario;
  });
}
