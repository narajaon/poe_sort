const { Button, jestMatchers, mouse, straightTo, centerOf, randomPointIn, Region, right, down, left, up } = require("@nut-tree/nut-js");
const ORIGIN_X = 1936;
const ORIGIN_Y = 612;
const MAX_COL = 12;
const MAX_ROW = 5;
const WIDTH = 645;
const HEIGHT = 276;
const paddingRow = Math.floor(HEIGHT / MAX_ROW);
const paddingCol = Math.floor(WIDTH / MAX_COL);

async function wait(ms) {
  return new Promise(res => {
    setTimeout(res, ms);
  })
}

(async () => {
  for (let i = 0; i < MAX_ROW; i++) {
    await mouse.move([{ x: ORIGIN_X, y: ORIGIN_Y + paddingRow * i }]);
    for (let j = 0; j < MAX_COL; j++) {
      await mouse.move(right(paddingCol));
    }
  }
})()
