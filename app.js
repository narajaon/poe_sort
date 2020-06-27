const { Button, jestMatchers, mouse, straightTo, centerOf, randomPointIn, Region, right, down, left, up , keyboard, Key, clipboard } = require("@nut-tree/nut-js");
const { getPixelColor } = require('robotjs');
const ORIGIN_X = 1936;
const ORIGIN_Y = 612;
const MAX_COL = 12;
const MAX_ROW = 5;
const WIDTH = 645;
const HEIGHT = 276;
const paddingRow = Math.floor(HEIGHT / MAX_ROW);
const paddingCol = Math.floor(WIDTH / MAX_COL);

function hex2bin(hex){
	return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

function hexToRgb(hex) {
	const bigint = parseInt(hex, 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;
	return { r, g, b };
}

async function wait(ms) {
	return new Promise(res => {
		setTimeout(res, ms);
	})
}

function moveMouseProv(x, y) {
	return mouse.move([{x, y}]);
}

(async () => {
	console.log('============ NEW INSTANCE ===========');
	let currentY = ORIGIN_Y;
	await keyboard.pressKey(Key.LeftAlt, Key.Tab);
	await keyboard.pressKey(Key.Enter);
	await clipboard.copy('');
	await keyboard.pressKey(Key.LeftControl);
	for (let i = 0; i < 1; i++) {
		let currentX = ORIGIN_X;
		for (let j = 0; j < MAX_COL; j++) {
			await moveMouseProv(currentX, currentY);
			const col = await getPixelColor(currentX, currentY);
			const { r, g, b } = hexToRgb(col);
			if (r > 8 || g > 8 || b > 8) {
				await keyboard.type(Key.C);
				const text = await clipboard.paste();
				if (text.includes('Rarity: Currency')) {
					console.log(text);
				}
			}
			currentX += paddingCol;
		}
		currentY += paddingRow;
	}

	await keyboard.releaseKey(Key.LeftControl, Key.C);
	console.log('done');
})()
