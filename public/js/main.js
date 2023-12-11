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
    compositor.layers.push(backgroundLayer);

    const gravity = 0.5;

    const spriteLayer = createSpriteLayer(mario);
    compositor.layers.push(spriteLayer);

    function update() {
      compositor.draw(context);
      mario.update();
      mario.velocity.y += gravity;
      requestAnimationFrame(update);
    }

    update();
  }
);
