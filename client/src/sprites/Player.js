import TiledImage from "@ftheriault/animatedsprite";

class Player {
	constructor(parent, type) {
		this.parent = parent;
		this.node = document.createElement("div");

		//this.node.className = "player";
		this.type = type;
		this.height = this.node.offsetHeight;
		this.x = 0;
		this.y = -150;
		this.speed = 10;
		this.gravity = 1;
		this.velocity = -0.25;
		this.alive = true;
		this.onGround = false;

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

	tick(keys) {

		console.log(this.height);

		if (this.y > -57 && this.x > -30 - 25 && this.x < 430) {
			this.onGround = true;
			this.gravity = 0;
			this.y = -57;
		} else {
			this.onGround = false;
		}

		//Woosh gravity
		if (keys[37] || keys[65]) {
			//console.log("left");
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
			this.x += this.speed;
		}
		if (keys[40] || keys[83]) {
			//console.log("down");
			if (!this.onGround) {
				this.y += this.speed;
			}
		}

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
