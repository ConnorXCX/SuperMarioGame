import Timer from "./Timer.js";
import Camera from "./Camera.js";
import { loadLevel } from "./loaders/level.js";
import { loadMario } from "./entities/Mario.js";
import { loadGoomba } from "./entities/Goomba.js";
import { setupKeyboard } from "./input.js";
import { setupMouseControl } from "./debug.js";
import { createCameraLayer } from "./layers.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

Promise.all([loadMario(), loadGoomba(), loadLevel("1-1")]).then(
  ([createMario, createGoomba, level]) => {
    const camera = new Camera();
    // window.camera = camera;

    const mario = createMario();

    mario.pos.set(64, 64);

    const goomba = createGoomba();
    goomba.pos.x = 220;
    level.entities.add(goomba);

    // Debug camera border.
    level.comp.layers.push(createCameraLayer(camera));

    level.entities.add(mario);

    const input = setupKeyboard(mario);

    input.listenTo(window);

    // Debug mouse control.
    setupMouseControl(canvas, mario, camera);

    const timer = new Timer(1 / 60);
    timer.update = function update(deltaTime) {
      level.update(deltaTime);

      if (mario.pos.x > 100) {
        camera.pos.x = mario.pos.x - 100;
      }

      level.comp.draw(context, camera);
    };
    timer.start();
  }
);
