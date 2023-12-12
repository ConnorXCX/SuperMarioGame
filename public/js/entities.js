import Entity from "./Entity.js";
import Jump from "./traits/Jump.js";
import Go from "./traits/Go.js";
import { loadSpriteSheet } from "./loaders.js";

export function createMario() {
  return loadSpriteSheet("mario").then((sprites) => {
    const mario = new Entity();
    mario.size.set(14, 16);

    mario.addTrait(new Jump());
    mario.addTrait(new Go());

    function routeFrame(mario) {
      return "idle";
    }

    mario.draw = function drawMario(context) {
      sprites.draw("idle", context, 0, 0);
    };

    return mario;
  });
}
