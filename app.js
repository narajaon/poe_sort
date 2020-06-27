const { Button, jestMatchers, mouse, straightTo, centerOf, randomPointIn, Region, right, down, left, up , keyboard, Key, clipboard } = require("@nut-tree/nut-js");
const { getPixelColor } = require('robotjs');
const { data: validCurrs } = require('./valid.json');

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
	return mouse.setPosition({ x, y });
}

(async () => {
	console.log('============ NEW INSTANCE ===========');
	let currentY = ORIGIN_Y;
	console.log(validCurrs);
	//return;
	await keyboard.type(Key.LeftAlt, Key.Tab);
	await clipboard.copy('');
	await keyboard.pressKey(Key.LeftControl);
	for (let i = 0; i < MAX_ROW; i++) {
		let currentX = ORIGIN_X;
		for (let j = 0; j < MAX_COL; j++) {
			await moveMouseProv(currentX, currentY);
			const col = await getPixelColor(currentX, currentY);
			const { r, g, b } = hexToRgb(col);

			if (r > 9 || g > 9 || b > 9) {
				await keyboard.type(Key.C);
				const text = await clipboard.paste();
				const [rarity, curName] = text.trim().split(/\r?\n/);
				//console.log(`|${rarity}|`, `|${curName}|`);
				if (rarity === 'Rarity: Currency' && validCurrs.some(({ name }) => name === curName)) {
					await mouse.leftClick();
					console.log(curName);
				}
			}

			currentX += paddingCol;
		}
		currentY += paddingRow;
	}

	await keyboard.releaseKey(Key.LeftControl, Key.C);
	//fs.writeFile('valid.json', JSON.stringify(validCurrencies), console.log)
	console.log('done');
})()
