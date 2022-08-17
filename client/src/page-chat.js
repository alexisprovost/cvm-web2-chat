import { createApp } from "vue";
import App from "./App.vue";
import BackgroundLayer from "./sprites/BackgroundLayer.js";

const app = createApp(App);

let bgLayers;

window.addEventListener("load", () => {
	bgLayers = [];

	app.mount("#vue-container");

	bgLayers.push(new BackgroundLayer(document.body, "img/02/sky.png", 0));
	bgLayers.push(new BackgroundLayer(document.body, "img/02/clouds_1.png", 0.5));
	bgLayers.push(new BackgroundLayer(document.body, "img/02/rocks.png", 0));
	bgLayers.push(new BackgroundLayer(document.body, "img/02/ground.png", 0));
	bgLayers.push(new BackgroundLayer(document.body, "img/02/clouds_2.png", 1));

	tick();
});

const tick = () => {
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
