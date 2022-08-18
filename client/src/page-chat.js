import { createApp } from "vue";
import App from "./App.vue";
import BackgroundLayer from "./sprites/BackgroundLayer.js";
import ChatPlayer from "./sprites/ChatPlayer.js";

const app = createApp(App);

let bgLayers, chatPlayers, keys;

window.addEventListener("load", () => {
	bgLayers = [];
	chatPlayers = [];
	keys = [];

	let root = app.mount("#vue-container");

	const playground = document.querySelector(".input-holder");

	const player = new ChatPlayer(playground, localStorage["username"], "robot");

	chatPlayers.push(player);

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

	bgLayers.push(new BackgroundLayer(document.body, "img/02/sky.png", 0));
	bgLayers.push(new BackgroundLayer(document.body, "img/02/clouds_1.png", 0.5));
	bgLayers.push(new BackgroundLayer(document.body, "img/02/rocks.png", 0));
	bgLayers.push(new BackgroundLayer(document.body, "img/02/ground.png", 0));
	bgLayers.push(new BackgroundLayer(document.body, "img/02/clouds_2.png", 1));

	tick();
});

const tick = () => {
	for (let i = 0; i < chatPlayers.length; i++) {
		const element = chatPlayers[i];

		if (!element.tick(keys)) {
			setTimeout(() => {
				const player = new ChatPlayer(element.getParent(), element.getUsername(), element.getType());

				chatPlayers.push(player);

				setTimeout(() => {
					chatPlayers.splice(i, 1);
					i--;
				}, 1000);
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
	requestAnimationFrame(tick);
};
