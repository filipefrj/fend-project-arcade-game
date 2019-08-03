// Enemies our player must avoid
class Enemy {
    constructor(x, y, s) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.s = s;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        (this.x > 505) ? (this.x = -202 + this.s * 100 * dt) : (this.x = this.x + this.s * 100 * dt);
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(x, y) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
        this.h = 0;
        this.v = 0;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x = this.x + this.h * 100 * dt;
        this.y = this.y + this.v * 100 * dt;
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(expression) {
        switch (expression) {
            case 'left':
                this.h = -1.1;
                break;
            case 'up':
                this.v = -1.1;
                break;
            case 'right':
                this.h = 1.1;
                break;
            case 'down':
                this.v = 1.1;
                break;
            case 'release-left':
                this.h = 0;
                break;
            case 'release-up':
                this.v = 0;
                break;
            case 'release-right':
                this.h = 0;
                break;
            case 'release-down':
                this.v = 0;
                break;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy1 = new Enemy(-101, 42.75, 1);
const enemy2 = new Enemy(-303, 128.25, 2);
const enemy3 = new Enemy(-50.5, 213.75, 1.5);
let allEnemies = [enemy1, enemy2, enemy3];
const player = new Player(202, 404);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'release-left',
        38: 'release-up',
        39: 'release-right',
        40: 'release-down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
