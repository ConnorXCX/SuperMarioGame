import Keyboard from "./KeyboardState.js";

export function setupKeyboard(mario) {
  const input = new Keyboard();

  // Change to KeyP
  input.addMapping("Space", (keyState) => {
    if (keyState) {
      mario.jump.start();
    } else {
      mario.jump.cancel();
    }
  });

  // Change to KeyD
  input.addMapping("ArrowRight", (keyState) => {
    mario.go.dir += keyState ? 1 : -1;
  });

  // Change to KeyA
  input.addMapping("ArrowLeft", (keyState) => {
    mario.go.dir += keyState ? -1 : 1;
  });

  // Change to KeyO
  input.addMapping("ArrowDown", (keyState) => {
    mario.turbo(keyState);
  });

  return input;
}
