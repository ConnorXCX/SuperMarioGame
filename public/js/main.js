import Compositor from "./Compositor.js";
import Timer from "./Timer.js";
import Keyboard from "./KeyboardState.js";
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

    const gravity = 2000;
    mario.position.set(64, 180);
    mario.velocity.set(200, -600);

    const SPACE = 32;
    const input = new Keyboard();
    input.addMapping(32, (keyState) => {
      // if (keyState) {
      //   mario.jump.start();
      // } else {
      //   mario.jump.cancel();
      // }
    });
    input.listenTo(window);

    const spriteLayer = createSpriteLayer(mario);
    compositor.layers.push(spriteLayer);

    const timer = new Timer(1 / 60);
    timer.update = function update(deltaTime) {
      mario.update(deltaTime);
      compositor.draw(context);
      mario.velocity.y += gravity * deltaTime;
    };
    timer.start();
  }
);
