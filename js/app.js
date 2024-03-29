// Enemies our player must avoid
class Enemy {
    constructor(x, y, l) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.level = l;
        this.speed = 100 * (1.0 + Math.random()) * (1.0 + l/10)
        this.width = 98;
        this.height = 66;
        this.xInterval = 3;
        this.yInterval = 76;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        (this.x > 505) ? (this.x = -202 + this.speed * dt) : (this.x = this.x + this.speed * dt);
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    freeze() {
        this.speed = 0;
        window.setTimeout(function restartEnemy() {
            allEnemies.forEach(function searchEnemy(enemy) {
                if (enemy.speed === 0) {
                    enemy.speed = 100 * (1.0 + Math.random()) * (1.0 + enemy.level/10)
                }
            });
        }, 1000);
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
        this.width = 30;
        this.height = 20;
        this.xInterval = 37.5;
        this.yInterval = 109;
        this.hit = [];
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.

        // Check if player is far from the borders and allow player to move freely
        if (this.x > 0 && this.x < 404 && this.y > 50 && this.y < 450) {
            this.x = this.x + this.h * 100 * dt;
            this.y = this.y + this.v * 100 * dt;
        }
        // As player reaches one of the borders
        else {
            // Check if player has hit left border and stop his movement in that direction
            if (this.x + (this.xInterval / 2) <= 0 && this.h < 0) {
                this.h = 0;
            }
            // Check if player's hit right border
            if (this.x - (this.xInterval / 2) >= 404 && this.h > 0) {
                this.h = 0;
            }
            // Lower border
            if (this.y >= 450 && this.v > 0) {
                this.v = 0;
            }
            // Allows player to move in any other direction, except to the direction detected above
            this.x = this.x + this.h * 100 * dt;
            this.y = this.y + this.v * 100 * dt;
            // If player reaches the water blocks he wins!
            if (this.y + this.yInterval <= 90) {
                this.restart(dt);
            }
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        if (this.hit) {
            ctx.drawImage(Resources.get('images/Hit.png'), this.x + this.hit[0], this.y + this.hit[1]);
        }
    }
    // Render player animation when hit by one of the enemies
    restart(dt) {
        this.x = 202;
        this.y = 404;
    }
    lose(hit) {
        document.removeEventListener('keyup', keyRelease);
        document.removeEventListener('keydown', keyPress);
        this.h = 0;
        this.v = 0;
        this.hit = hit;
        window.setTimeout(function playerLose() {
            player.hit = [];
            player.x = 202;
            player.y = 404;
            document.addEventListener('keyup', keyRelease);
            document.addEventListener('keydown', keyPress);
        }, 1000);
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

function keyPress(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}

function keyRelease(e) {
    const allowedKeys = {
        37: 'release-left',
        38: 'release-up',
        39: 'release-right',
        40: 'release-down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy1 = new Enemy(-101, 131, 1);
const enemy2 = new Enemy(-303, 212, 1);
const enemy3 = new Enemy(-50.5, 293, 1);
let allEnemies = [enemy1, enemy2, enemy3];
const player = new Player(202, 404);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', keyPress);
document.addEventListener('keyup', keyRelease);
