class Bullet {
    constructor(parent, x, y, direction) {
        this.parent = parent;
        this.node = document.createElement("div");
        this.node.style = "position: absolute; width: 15px; height: 15px; background-color: red; border-radius: 50%;";
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.speed = 10;
        this.node.style.left = this.x + "px";
        this.node.style.top = this.y + "px";
        parent.append(this.node);
    }

    theDumpsterTruckIsHere() {
        this.node.remove();
    }

    tick() {
        this.x += this.direction * this.speed;
        this.node.style.left = this.x + "px";
        if (this.x > screen.width || this.x < -screen.width) {
            this.node.remove();
            return false;
        }
        return true;
    }
}

export default Bullet;