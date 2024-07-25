import Timer from "./Timer.js";
import Camera from "./Camera.js";
import { loadLevel } from "./loaders/level.js";
import { loadMario } from "./entities/Mario.js";
import { setupKeyboard } from "./input.js";
import { setupMouseControl } from "./debug.js";
import { createCameraLayer } from "./layers.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

Promise.all([loadMario(), loadLevel("1-1")]).then(([createMario, level]) => {
  const camera = new Camera();
  // window.camera = camera;

  const mario = createMario();

  mario.pos.set(64, 64);

  // mario.addTrait({
  //   NAME: "hacktrait",
  //   spawnTimeout: 0,
  //   obstruct() {},
  //   update(mario, deltaTime) {
  //     if (this.spawnTimeout > 0.1 && mario.vel.y < 0) {
  //       const spawn = createMario();
  //       spawn.pos.x = mario.pos.x;
  //       spawn.pos.y = mario.pos.y;
  //       spawn.vel.y = mario.vel.y - 200;
  //       level.entities.add(spawn);
  //       this.spawnTimeout = 0;
  //     }
  //     this.spawnTimeout += deltaTime;
  //   },
  // });

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
});
