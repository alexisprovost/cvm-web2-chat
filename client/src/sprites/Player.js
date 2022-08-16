class Player {
	constructor(parent) {
		this.parent = parent;
		this.node = document.createElement("div");
		this.node.className = "player";
		this.x = 0;
		this.y = -150;
		this.speed = 10;
		this.gravity = 1;
		this.velocity = -0.5;
		this.alive = true;

		parent.append(this.node);
	}

	tick(keys) {
		if (keys[37] || keys[65]) {
			this.x -= this.speed;
		}
		if (keys[38] || keys[87]) {
			if (Math.ceil(this.y) == -54) {
				this.gravity = 1;
				this.y += this.speed;
			}
			this.y -= this.speed;
		}
		if (keys[39] || keys[68]) {
			this.x += this.speed;
		}
		if (keys[40] || keys[83]) {
			if (this.y < -57) {
				this.y += this.speed;
			}
		}

		//Woosh gravity

		if (this.y < -57 || this.x < -57 || this.x > 430) {
			this.gravity -= this.velocity;
			this.y += this.gravity;
		}

		if (this.y >= document.body.scrollHeight) {
			this.alive = false;
			this.node.remove();
		}

		this.node.style.left = this.x + "px";
		this.node.style.top = this.y + "px";

		console.log(this.x, this.y);

		return this.alive;
	}
}

export default Player;
