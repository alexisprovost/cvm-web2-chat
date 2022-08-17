<template>
	<div>
		<div class="connected-users-holder">
			<h3>Utilisateurs connectés</h3>
			<li v-for="(item, index) in this.connectedUsers" :key="index">
				{{ item }}
			</li>
		</div>
		<div class="input-holder">
			<div>
				<textarea @keyup="handleSendMessage" placeholder="Chat" cols="30" rows="10"></textarea>
			</div>
			<div class="link-holder">
				<a href="javascript:void(0)" @click="logout" id="sign-out-btn">Déconnexion</a>
				<a href="https://apps-de-cours.com/web-chat/server/watch-eye.php" target="_blank">Watch-Eye</a>
			</div>
		</div>
	</div>
</template>

<script>
import { registerCallbacks, sendMessage, signout, chatMessageLoop } from "./chat-api";

export default {
	name: "App",
	components: {},
	data() {
		return {
			connectedUsers: ["Chargement..."],
		};
	},
	methods: {
		handleSendMessage: evt => {
			sendMessage(evt, evt.target);
		},
		newMessage: function (fromUser, message, isPrivate) {
			if (isPrivate) {
				console.log("Private message from " + fromUser + ": " + message);
			} else {
				console.log("Message from " + fromUser + ": " + message);
			}
		},
		memberListUpdate: function (members) {
			this.connectedUsers = members;
		},
		logout: function () {
			signout();
		},
	},
	mounted() {
		registerCallbacks(this.newMessage, this.memberListUpdate);
		chatMessageLoop();
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
	width: calc(100% - 10rem);
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

.input-holder .link-holder {
	width: 8rem;
	display: inline-flex;
	flex-direction: column;
}

.input-holder .link-holder a {
	width: 100%;
}

.connected-users-holder {
	list-style: none;
	margin: 1rem;
	padding: 1rem;
	border-radius: 1rem;
	width: fit-content;
	background-color: rgb(255 255 255 / 60%);
}

.connected-users-holder > * {
	margin: 1rem;
	font-weight: 800;
}
</style>
