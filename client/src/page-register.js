import { register } from "./chat-api";
import Player from "./sprites/Player";
import BackgroundLayer from "./sprites/BackgroundLayer";
let players, bgLayers, keys;

const setupBackground = () => {
	bgLayers.push(new BackgroundLayer(document.body, "img/01/sky.png", 0));
	bgLayers.push(new BackgroundLayer(document.body, "img/01/clouds_1.png", 0.25, true));
	bgLayers.push(new BackgroundLayer(document.body, "img/01/clouds_2.png", 0.5, true));
	bgLayers.push(new BackgroundLayer(document.body, "img/01/rocks_1.png", 0));
	bgLayers.push(new BackgroundLayer(document.body, "img/01/rocks_2.png", 0));
	bgLayers.push(new BackgroundLayer(document.body, "img/01/clouds_3.png", 0.75, true));
	bgLayers.push(new BackgroundLayer(document.body, "img/01/clouds_4.png", 1, true));
};

window.addEventListener("load", () => {
	players = [];
	keys = [];
	bgLayers = [];

	setupBackground();

	const playground = document.getElementById("playground");

	const player = new Player(playground, "robot");

	players.push(player);

	document.querySelector("form").onsubmit = function () {
		return register(this);
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

	document.querySelector("input[name='no']").addEventListener('focus', () => {
		player.say('01000010 01101001 01100101 01101110 01110110 01100101 01101110 01110101 01100101');
	});

	tick();
});

const tick = function () {
	for (let i = 0; i < players.length; i++) {
		const element = players[i];

		if (!element.tick(keys)) {
			players.splice(i, 1);
			i--;

			setTimeout(() => {
				const player = new Player(playground, "robot");

				players.push(player);
			}, 1000);
		}
	}

	for (let i = 0; i < bgLayers.length; i++) {
		const element = bgLayers[i];

		if (!element.tick()) {
			bgLayers.push(new BackgroundLayer(document.body, element.getImg(), element.getSpeed(), true));

			bgLayers.splice(i, 1);
			i--;
		}
	}

	window.requestAnimationFrame(tick);
};
