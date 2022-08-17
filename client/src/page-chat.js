import { registerCallbacks, sendMessage, signout, chatMessageLoop } from "./chat-api";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

window.addEventListener("load", () => {
	app.mount("#vue-container");

	document.querySelector("textarea").onkeyup = function (evt) {
		sendMessage(evt, this);
	};
	document.querySelector("#sign-out-btn").onclick = signout;
	registerCallbacks(newMessage, memberListUpdate);
	chatMessageLoop();
});

// Lorsqu'un nouveau message doit être affiché à l'écran, cette fonction est appelée
const newMessage = (fromUser, message, isPrivate) => {
	console.log(fromUser, message, isPrivate);
};

// À chaque 2-3 secondes, cette fonction est appelée. Il faudra donc mettre à jour la liste des membres
// connectés dans votre interface.
const memberListUpdate = members => {
	console.log(members);
};
