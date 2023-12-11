import Compositor from "./Compositor.js";
import Entity from "./Entity.js";
import { loadLevel } from "./loaders.js";
import { loadMarioSprite, loadBackgroundSprites } from "./sprites.js";
import { createBackgroundLayer } from "./layers.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

function createSpriteLayer(entity) {
  return function drawSpriteLayer(context) {
    entity.draw(context);
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

  const gravity = 0.5;

  const mario = new Entity();
  mario.position.set(64, 180);
  mario.velocity.set(2, -10);

  mario.draw = function drawMario(context) {
    marioSprite.draw("idle", context, this.position.x, this.position.y);
  };

  mario.update = function updateMario() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  };

  const spriteLayer = createSpriteLayer(mario);
  compositor.layers.push(spriteLayer);

  function update() {
    compositor.draw(context);
    mario.update();
    mario.velocity.y += gravity;
    requestAnimationFrame(update);
  }

  update();
});
