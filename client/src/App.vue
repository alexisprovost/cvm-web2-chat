<template>
	<div>
		<li v-for="(item, index) in this.connectedUsers" :key="index">
			{{ item }}
		</li>
		<div class="input-holder">
			<div>
				<textarea @keyup="handleSendMessage" placeholder="Chat" cols="30" rows="10"></textarea>
			</div>

			<a href="javascript:void(0)" @click="logout" id="sign-out-btn">Déconnexion</a>
		</div>
	</div>
</template>

<script>
import BackgroundLayer from "./sprites/BackgroundLayer";
import { registerCallbacks, sendMessage, signout, chatMessageLoop } from "./chat-api";

export default {
	name: "App",
	components: {
		BackgroundLayer,
	},
	data() {
		return {
			bgLayers: [],
			connectedUsers: [],
		};
	},
	methods: {
		handleSendMessage: evt => {
			sendMessage(evt, evt.target);
		},
		newMessage: function (fromUser, message, isPrivate) {
			console.log(fromUser, message, isPrivate);
		},
		memberListUpdate: function (members) {
			this.connectedUsers = members;
			console.log(this.connectedUsers);
		},
		logout: function () {
			signout();
		},
	},
	mounted() {
		registerCallbacks(this.newMessage, this.memberListUpdate);
		chatMessageLoop();

		this.bgLayers.push(new BackgroundLayer(document.body, "img/02/sky.png", 0));
		this.bgLayers.push(new BackgroundLayer(document.body, "img/02/rocks.png", 0));
		this.bgLayers.push(new BackgroundLayer(document.body, "img/02/ground.png", 0));
	},
};
</script>

<style scoped>
.input-holder {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	align-items: center;
	justify-content: center;
	display: flex;
	flex-direction: row;
	background-color: rgb(255 255 255 / 40%);
	padding: 1rem 0;
}

.input-holder > div {
	width: 75%;
	display: inline-flex;
}

.input-holder textarea {
	resize: none;
	height: 40px;
	width: 100%;
	margin: 1rem;
	background-color: rgb(255 255 255 / 60%);
	border: none;
	border-radius: 1rem;
	padding: 1rem;
}

.input-holder textarea:focus-visible {
	outline: none;
}

.input-holder a {
	widows: 25%;
}
</style>
