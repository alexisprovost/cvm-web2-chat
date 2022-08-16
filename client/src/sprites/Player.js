class Player {
	constructor(parent) {
		this.parent = parent;
		this.node = document.createElement("div");
		this.node.className = "player";
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
	}

	tick(keys) {
		//Woosh gravity
		if (keys[37] || keys[65]) {
			console.log("left");
			this.x -= this.speed;
		}
		if (keys[38] || keys[87]) {
			console.log("jump");
			this.y -= this.speed;
		}
		if (keys[39] || keys[68]) {
			console.log("right");
			this.x += this.speed;
		}
		if (keys[40] || keys[83]) {
			console.log("down");
			this.y += this.speed;
		}

		this.gravity -= this.velocity;
		this.y += this.gravity;

		// Kill player if they fall off the screen
		if (this.y >= document.body.scrollHeight) {
			this.alive = false;
			this.node.remove();
		}

		this.node.style.left = this.x + "px";
		this.node.style.top = this.y + "px";

		//console.log(this.x, this.y);

		return this.alive;
	}
}

export default Player;
