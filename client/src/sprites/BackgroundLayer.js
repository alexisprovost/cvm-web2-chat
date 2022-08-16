class BackgroundLayer {
	constructor(parent, img, speed, fadeIn = false) {
		this.parent = parent;
		this.img = img;
		this.alive = true;
		this.node = document.createElement("div");
		this.node.classList.add("background");
		if (fadeIn) {
			this.node.classList.add("fadeIn");
		}

		this.x = 0;
		this.y = 0;
		this.speed = speed;

		this.node.style.opacity = 1;

		this.node.style.backgroundImage = "url(" + img + ")";

		// under or on top of montains
		parent.append(this.node);
	}

	getParent = () => {
		return this.parent;
	};

	getImg = () => {
		return this.img;
	};

	getSpeed = () => {
		return this.speed;
	};

	tick() {
		if (this.x >= screen.width || this.x <= -screen.width) {
			this.node.style.opacity -= 0.01;

			if (this.node.style.opacity <= 0) {
				this.node.remove();
				this.alive = false;
			}
		}

		this.x += this.speed;

		this.node.style.backgroundPositionX = this.x + "px";

		return this.alive;
	}
}

export default BackgroundLayer;
