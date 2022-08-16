import { signin } from "./chat-api";
import Player from "./sprites/Player";
import BackgroundLayer from "./sprites/BackgroundLayer";
let players, bgLayers, keys;

const setupBackground = () => {
	bgLayers.push(new BackgroundLayer(document.body,"img/01/sky.png", 0.25));
	bgLayers.push(new BackgroundLayer(document.body,"img/01/clouds_1.png", -0.25, true));
	bgLayers.push(new BackgroundLayer(document.body,"img/01/clouds_2.png", -0.5, true));
	bgLayers.push(new BackgroundLayer(document.body,"img/01/rocks_1.png", 0));
	bgLayers.push(new BackgroundLayer(document.body,"img/01/rocks_2.png", 0));
	bgLayers.push(new BackgroundLayer(document.body,"img/01/clouds_3.png", -0.75, true));
	bgLayers.push(new BackgroundLayer(document.body,"img/01/clouds_4.png", -1, true));
}

window.addEventListener("load", () => {
	players = [];
	keys = [];
	bgLayers = [];

	setupBackground();

	const playground = document.getElementById("playground");

	const player = new Player(playground);

	players.push(player);

	document.querySelector("form").onsubmit = function () {
		return signin(this);
	};

	window.addEventListener(
		"keydown",
		event => {
			keys[event.keyCode] = true;
		},
		false
	);
	window.addEventListener(
		"keyup",
		event => {
			keys[event.keyCode] = false;
		},
		false
	);

	tick();
});

const tick = function () {
	for (let i = 0; i < players.length; i++) {
		const element = players[i];

		let alive = element.tick(keys);

		if (!alive) {
			players.splice(i, 1);
			i--;

			setTimeout(() => {
				const player = new Player(playground);

				players.push(player);
			}, 1000);
		}
	}

	for (let i = 0; i < bgLayers.length; i++) {
		const element = bgLayers[i];

		if(!element.tick()) {

			bgLayers.push(new BackgroundLayer(document.body, element.getImg(), element.getSpeed()));

			bgLayers.splice(i, 1);
			i--;
		}
	}

	window.requestAnimationFrame(tick);
};
