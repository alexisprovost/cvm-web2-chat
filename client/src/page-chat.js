import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

window.addEventListener("load", () => {
	let root = app.mount("#vue-container");

	root.addMessage(message.value);
});
