import TiledImage from "@ftheriault/animatedsprite";
import Bullet from "./Bullet";

class ChatPlayer {
	constructor(parent, username, type) {
		this.parent = parent;
		this.node = document.createElement("div");

		this.bullets = [];

		//this.node.className = "player";
		this.type = type;
		this.username = username;
		this.height = 40;
		this.x = Math.random() * (screen.width - this.height);
		this.y = -150;
		this.speed = 10;
		this.gravity = 1;
		this.velocity = -0.25;
		this.alive = true;
		this.onGround = false;
		this.facingRight = true;
		this.bulletCoolDown = 250;

		this.controllable = true;

		this.coolDown = false;

		this.easterEgg = 1;

		this.node.addEventListener("click", this.clicked.bind(this));

		parent.append(this.node);

		if (this.type === "robot") {
			this.tiledImage = new TiledImage("img/robot/Flying_(32 x 32).png", 2, 1, 100, true, 2.0, this.node);
			this.tiledImage.changeMinMaxInterval(0, 8);
		}

		setTimeout(() => {
			this.showUsernameTag();
		}, 1000);
	}

	getUsername() {
		return this.username;
	}

	getType() {
		return this.type;
	}

	getParent() {
		return this.parent;
	}

	clicked() {
		this.easterEgg++;
		if (this.easterEgg === 10) {
			this.say("I'm a robot!");
			this.bulletCoolDown = 5;
		}
	}

	disableControls() {
		this.controllable = false;
	}

	jumpAnimation() {
		this.step = 10;
		this.jump = setInterval(() => {
			this.y -= this.step;
			this.step -= 1;
			if (this.step < -10) {
				clearInterval(this.jump);
			}
		}, 20);
	}

	showUsernameTag() {
		this.usernameTag = document.createElement("div");
		this.usernameTag.className = "username-tag";
		this.usernameTag.style =
			"top: -20px;left: -117px;position: absolute;font-weight: 800;width: 300px;text-align: center;text-shadow: rgb(0 0 0) 0px 0px 5px;color: white;}";
		this.usernameTag.innerHTML = this.username;
		this.node.append(this.usernameTag);
	}

	say(message) {
		const bubble = document.createElement("div");
		bubble.className = "bubble";
		bubble.innerHTML = message;
		bubble.style =
			"position: relative;bottom: 120px;left: 60px;background-color: white;padding: 1rem;width: 190px;border-radius: 1rem;";
		this.node.append(bubble);
		setTimeout(() => {
			bubble.remove();
		}, 10000);
	}

	shoot() {
		let bullet;
		if (this.facingRight) {
			bullet = new Bullet(this.parent, this.x, this.y, 2.5);
		} else {
			bullet = new Bullet(this.parent, this.x, this.y, -2.5);
		}
		this.bullets.push(bullet);
	}

	tick(keys) {
		if (this.y > -this.height) {
			this.onGround = true;
			this.gravity = 0;
			this.y = -this.height;
		} else {
			this.onGround = false;
		}

		//Woosh gravity
		if ((keys[37] || keys[65]) && this.controllable) {
			//console.log("left");
			this.facingRight = false;
			this.x -= this.speed;
		}
		if ((keys[38] || keys[87]) && this.controllable) {
			//console.log("jump");
			if (this.onGround) {
				this.jumpAnimation();
			}
		}
		if ((keys[39] || keys[68]) && this.controllable) {
			//console.log("right");
			this.facingRight = true;
			this.x += this.speed;
		}
		if ((keys[40] || keys[83]) && this.controllable) {
			//console.log("down");
			if (!this.onGround) {
				this.y += this.speed;
			}
		}
		if (keys[32] && this.controllable) {
			if (this.coolDown == false) {
				this.coolDown = true;
				this.shoot();
				setTimeout(() => {
					this.coolDown = false;
				}, this.bulletCoolDown);
			}
		}

		if (this.x < 0 - this.height) {
			this.x = screen.width + this.height;
		}

		if (this.x > screen.width + this.height) {
			this.x = 0 - this.height;
		}

		this.bullets.forEach(bullet => {
			if (!bullet.tick()) {
				this.bullets.splice(this.bullets.indexOf(bullet), 1);
			}
		});

		if (!this.onGround) {
			this.gravity -= this.velocity;
			this.y += this.gravity;
		}

		// Kill player if they fall off the screen
		if (this.y >= document.body.scrollHeight) {
			this.alive = false;
			this.bullets.forEach(bullet => {
				bullet.theDumpsterTruckIsHere();
				this.bullets = [];
			});
			this.node.remove();
		}

		this.tiledImage.tick(this.x, this.y);

		//console.log(this.x, this.y);

		return this.alive;
	}
}

export default ChatPlayer;
