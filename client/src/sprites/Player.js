import TiledImage from "@ftheriault/animatedsprite";
import Bullet from "./Bullet";

class Player {
	constructor(parent, type) {
		this.parent = parent;
		this.node = document.createElement("div");

		this.bullets = [];

		//this.node.className = "player";
		this.type = type;
		this.height = 70;
		this.x = 0;
		this.y = -150;
		this.speed = 10;
		this.gravity = 1;
		this.velocity = -0.25;
		this.alive = true;
		this.onGround = false;
		this.facingRight = true;

		this.coolDown = false;

		this.node.addEventListener("click", function () {
			this.style.backgroundColor =
				"rgb(" + Math.random() * 255 + ", " + Math.random() * 255 + ", " + Math.random() * 255 + ")";
		});

		parent.append(this.node);

		if (this.type === "robot") {
			this.tiledImage = new TiledImage("img/robot/Flying_(32 x 32).png", 2, 1, 100, true, 2.0, this.node);
		}

		this.tiledImage.changeMinMaxInterval(0, 8);
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

	say(message) {
		const bubble = document.createElement("div");
		bubble.className = "bubble";
		bubble.innerHTML = message;
		this.node.append(bubble);
		setTimeout(() => {
			bubble.remove();
		}, 2000);
	}

	shoot() {
		let bullet;
		if (this.facingRight) {
			bullet = new Bullet(this.parent, this.x, this.y, 1);
		} else {
			bullet = new Bullet(this.parent, this.x, this.y, -1);
		}
		this.bullets.push(bullet);
	}

	tick(keys) {
		if (this.y > -this.height && this.x > -30 - 25 && this.x < 430) {
			this.onGround = true;
			this.gravity = 0;
			this.y = -this.height;
		} else {
			this.onGround = false;
		}

		//Woosh gravity
		if (keys[37] || keys[65]) {
			//console.log("left");
			this.facingRight = false;
			this.node.style.transform = "scaleX(-1)";
			this.x -= this.speed;
		}
		if (keys[38] || keys[87]) {
			//console.log("jump");
			if (this.onGround) {
				this.jumpAnimation();
			}
		}
		if (keys[39] || keys[68]) {
			//console.log("right");
			this.facingRight = true;
			this.node.style.transform = "scaleX(1)";
			this.x += this.speed;
		}
		if (keys[40] || keys[83]) {
			//console.log("down");
			if (!this.onGround) {
				this.y += this.speed;
			}
		}
		if (keys[32]) {
			if (this.coolDown == false) {
				this.coolDown = true;
				this.shoot();
				setTimeout(() => {
					this.coolDown = false;
				}, 500);
			}
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
			this.node.remove();
		}

		this.tiledImage.tick(this.x, this.y);

		//console.log(this.x, this.y);

		return this.alive;
	}
}

export default Player;
