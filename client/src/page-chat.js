import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

window.addEventListener("load", () => {
	app.mount("#vue-container");
});
