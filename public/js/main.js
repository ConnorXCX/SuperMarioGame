import Compositor from "./Compositor.js";
import { loadLevel } from "./loaders.js";
import { createMario } from "./entities.js";
import { loadBackgroundSprites } from "./sprites.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

Promise.all([createMario(), loadBackgroundSprites(), loadLevel("1-1")]).then(
  ([mario, backgroundSprites, level]) => {
    const compositor = new Compositor();

    const backgroundLayer = createBackgroundLayer(
      level.backgrounds,
      backgroundSprites
    );
    // compositor.layers.push(backgroundLayer);

    const gravity = 30;
    mario.position.set(64, 180);
    mario.velocity.set(200, -600);

    const spriteLayer = createSpriteLayer(mario);
    compositor.layers.push(spriteLayer);

    let deltaTime = 0;
    let lastTime = 0;

    function update(time) {
      deltaTime = (time - lastTime) / 1000;
      compositor.draw(context);
      mario.update(deltaTime);
      console.log(mario.position);
      mario.velocity.y += gravity;
      requestAnimationFrame(update);
      // setTimeout(update, 1000 / 10);

      lastTime = time;
    }

    update(0);
  }
);
