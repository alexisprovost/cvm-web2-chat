<template>
	<div>
		<div class="connected-users-holder">
			<h3>Utilisateurs connectés</h3>
			<li v-for="(item, index) in this.connectedUsers" :key="index">
				{{ item }}
			</li>
		</div>
		<div class="chat-holder" id="chat-holder" @click="scrollToElement">
			<h3>Chat</h3>
			<ul>
				<li v-for="(item, index) in this.chat" :key="index">
					<b>{{ item.fromUser }}</b> :
					<span v-if="item.tagged">
						<span class="tagged">{{ item.message }}</span>
					</span>
					<span v-else>{{ item.message }}</span>
				</li>
			</ul>
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
			chat: [],
		};
	},
	methods: {
		handleSendMessage: evt => {
			console.log(evt.target);
			sendMessage(evt, evt.target);
		},
		newMessage: function (fromUser, message, isPrivate) {
			if (isPrivate) {
				console.log("Private message from " + fromUser + ": " + message);
			} else {
				let msgParts = message.split(" ");
				let tagged = false;

				msgParts.forEach(e => {
					if (e.startsWith("@")) {
						let taggedUser = e.substring(1);

						if (taggedUser == localStorage["username"]) {
							tagged = true;
						}
					}
				});

				if (msgParts[0] == "/help") {
					this.chat.push({
						fromUser: "Console",
						message: "Bonjour voici les commandes: \n @username pour tag quelqu'un",
						tagged: false,
					});
				} else {
					this.chat.push({
						fromUser: fromUser,
						message: message,
						tagged: tagged,
					});
				}
			}
		},
		/* src https://thewebdev.info/2022/03/12/how-to-scroll-to-bottom-of-the-div-with-vue-js/*/
		scrollToElement: function () {
			const el = this.$refs["chat-holder"];
			console.log(el);
			if (el) {
				el.scrollIntoView({ behavior: "smooth" });
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
	padding: 0.5rem;
	border-radius: 1rem;
	width: fit-content;
	background-color: rgb(255 255 255 / 60%);
	position: absolute;
	font-size: 14px;
}

.connected-users-holder > * {
	margin: 0.5rem;
	font-weight: 800;
}

.chat-holder {
	background-color: rgb(255 255 255 / 60%);
	margin: 1rem;
	padding: 1rem;
	border-radius: 1rem;
	max-width: 500px;
	min-width: 500px;
	max-height: 360px;
	overflow-y: scroll;
	overflow-x: hidden;
	float: right;
	-ms-overflow-style: none;
	scrollbar-width: none;
}

.chat-holder li {
	margin: 0.5rem 0;
}

.chat-holder::-webkit-scrollbar {
	display: none;
}

.chat-holder ul {
	list-style: none;
}

.tagged {
	background-color: gold;
	padding: 0.2rem;
	border-radius: 0.5rem;
}

@media only screen and (max-width: 800px) {
	.connected-users-holder {
		position: relative;
		width: calc(100% - 3rem);
	}

	.chat-holder {
		float: none;
		max-width: 100%;
		min-width: auto;
	}
}
</style>
