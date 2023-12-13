import Keyboard from "./KeyboardState.js";

export function setupKeyboard(entity) {
  const input = new Keyboard();

  // Change to KeyP
  input.addMapping("Space", (keyState) => {
    if (keyState) {
      entity.jump.start();
    } else {
      entity.jump.cancel();
    }
  });

  // Change to KeyD
  input.addMapping("ArrowRight", (keyState) => {
    entity.go.dir += keyState ? 1 : -1;
  });

  // Change to KeyA
  input.addMapping("ArrowLeft", (keyState) => {
    entity.go.dir += -keyState ? -1 : 1;
  });

  return input;
}
