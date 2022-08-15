import { signin } from "./chat-api";
import Player from "./sprites/Player";
let players, keys;

window.addEventListener("load", () => {
	players = [];
	keys = [];

	const playground = document.getElementById("playground");

	const player = new Player(playground);

	players.push(player);

	document.querySelector("form").onsubmit = function () {
		return signin(this);
	};

	window.addEventListener(
		"keydown",
		(event) => {
			keys[event.keyCode] = true;
		},
		false
	);
	window.addEventListener(
		"keyup",
		(event) => {
			keys[event.keyCode] = false;
		},
		false
	);

	tick();
});

const tick = function () {
	players.forEach(player => {
		player.tick(keys);
	});

	window.requestAnimationFrame(tick);
};
