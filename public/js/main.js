import Compositor from "./Compositor.js";
import { loadLevel } from "./loaders.js";
import { loadMarioSprite, loadBackgroundSprites } from "./sprites.js";
import { createBackgroundLayer } from "./layers.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

function createSpriteLayer(sprite, pos) {
  return function drawSpriteLayer(context) {
    for (let i = 0; i < 20; ++i) {
      sprite.draw("idle", context, pos.x + i * 16, pos.y);
    }
  };
}

Promise.all([
  loadMarioSprite(),
  loadBackgroundSprites(),
  loadLevel("1-1"),
]).then(([marioSprite, backgroundSprites, level]) => {
  const compositor = new Compositor();

  const backgroundLayer = createBackgroundLayer(
    level.backgrounds,
    backgroundSprites
  );
  compositor.layers.push(backgroundLayer);

  const position = {
    x: 0,
    y: 0,
  };

  const spriteLayer = createSpriteLayer(marioSprite, position);
  compositor.layers.push(spriteLayer);

  function update() {
    compositor.draw(context);
    position.x += 2;
    position.y += 2;
    requestAnimationFrame(update);
  }

  update();
});
