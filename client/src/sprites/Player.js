class Player {
    constructor(parent) {
        this.node = document.createElement('div');
        this.node.className = 'player';
        this.x = 0; 
        this.y = 0;
        this.speed = 5;

        parent.append(this.node);
    }

    tick(keys) {
        if (keys[37]) {
            this.x -= this.speed;
        }
        if (keys[38]) {
            this.y -= this.speed;
        }
        if (keys[39]) {
            this.x += this.speed;
        }
        if (keys[40]) {
            this.y += this.speed;
        }

        this.node.style.left = this.x + 'px';
        this.node.style.top = this.y + 'px';

        //console.log(this.x, this.y);
    }
}

export default Player;