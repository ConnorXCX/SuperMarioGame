import Timer from "./Timer.js";
import Camera from "./Camera.js";
import { loadLevel } from "./loaders.js";
import { createMario } from "./entities.js";
import { setupKeyboard } from "./input.js";
import { setupMouseControl } from "./debug.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

Promise.all([createMario(), loadLevel("1-1")]).then(([mario, level]) => {
  const camera = new Camera();

  mario.pos.set(64, 64);

  level.entities.add(mario);

  const input = setupKeyboard(mario);

  input.listenTo(window);

  // Debug mouse control.
  setupMouseControl(canvas, mario, camera);

  const timer = new Timer(1 / 60);
  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    level.comp.draw(context, camera);
  };
  timer.start();
});
