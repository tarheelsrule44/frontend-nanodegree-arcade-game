// Enemies our player must avoid
var Enemy = function(x, y, speed) {    
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
}

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // If the enemies position is within the screen, this sets speed * dt
    if(this.x < ctx.canvas.width){
        this.x += this.speed * dt;
    }
    // If the enemy is off the screen, reset position
    else{
        this.x = -75;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Player Class
var Player = function(x,y){
    this.sprite ='images/char-boy.png';
    this.x = x;
    this.y = y;
}

Player.prototype.update = function(dt){ 
    // If player reaches top row, reset back to start
    if(this.y < 50){
        player.reset();
    }
    // Defines player's area
    playerPosition = {
        'left':   this.x,
        'bottom': this.y,
        'right':  this.x+50,
        'top':    this.y+70,
    }
    // Iterate through allEnemies and define enemy area   
    for(e=0; e<allEnemies.length; e++){
        bugPosition = {
            'left':   allEnemies[e].x,
            'bottom': allEnemies[e].y,
            'right':  allEnemies[e].x+70,
            'top':    allEnemies[e].y+70,
        }
        // Collision detection
    if(playerPosition.left<bugPosition.right &&
        playerPosition.bottom<bugPosition.top &&
        playerPosition.right>bugPosition.left &&
        playerPosition.top>bugPosition.bottom){
        player.reset(); }
    }
         
}

// Reset player back to starting position.
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
}

// Draw the player on the screen
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// What to do when arrow keys are used
Player.prototype.handleInput = function(key) {
    if(key === 'left' && this.x > 25){
        this.x = this.x - 100;
    }
    if(key === 'up' && this.y > 0){
        this.y = this.y - 82.5;
    }
    if(key === 'right' && this.x < 400){
        this.x = this.x + 100;
    }
    if(key === 'down' && this.y < 400){
        this.y = this.y + 82.5;
    }    
}

// Instantiation
var allEnemies = [new Enemy(0, 60, 100),
                  new Enemy(0, 145, 200),
                  new Enemy(0, 230, 300)];

var player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});