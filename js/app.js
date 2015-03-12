var randomSpeed = function() {
    var ranSpeed = (Math.floor(Math.random() * 5) +1) * 100;
    return ranSpeed;
}
var row = [60, 145, 230, 315];
var randomRow = function() {
    getRandomRow = row[Math.floor(Math.random() * row.length)];
    return getRandomRow;
}

var column = [0, 101, 202, 303, 404, 505, 606];
var randomColumn = function() {
    getRandomColumn = column[Math.floor(Math.random() * column.length)];
    return getRandomColumn;
}

var Gem = function(x, y) {
    var gemImage = ['images/Gem Blue.png', 'images/Gem Orange.png', 'images/Gem Green.png'];
    this.sprite = gemImage[Math.floor(Math.random() * gemImage.length)];
    this.x = x;
    this.y = y;
}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Gem.prototype.update = function() {
    for(e=0; e<allGems.length; e++){
        gemPosition = {
            'left':   allGems[e].x,
            'top': allGems[e].y,
            'right':  allGems[e].x+75,
            'bottom':    allGems[e].y+60,
        }
        // Collision detection
        if(playerPosition.left<gemPosition.right &&
            playerPosition.top<gemPosition.bottom &&
            playerPosition.right>gemPosition.left &&
            playerPosition.bottom>gemPosition.top) {
        // removes the collected gem    
        allGems.splice(e, 1); 
        // if all gems are collected, no more enemies
        if(allGems.length < 1) {
            allEnemies = [];
        }       
    }        
        
    }
}

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
        this.speed = randomSpeed(); 
        this.y = randomRow();
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
    /*if(this.y < 50){
        player.reset();
    }  */

    // Defines player's area
    playerPosition = {
        'left':   this.x,
        'top': this.y,
        'right':  this.x+50,
        'bottom':    this.y+70,
    }
    // Iterate through allEnemies and define enemy area   
    for(e=0; e<allEnemies.length; e++){
        bugPosition = {
            'left':   allEnemies[e].x,
            'top': allEnemies[e].y,
            'right':  allEnemies[e].x+70,
            'bottom':    allEnemies[e].y+70,
        }
        // Collision detection
    if(playerPosition.left<bugPosition.right &&
        playerPosition.top<bugPosition.bottom &&
        playerPosition.right>bugPosition.left &&
        playerPosition.bottom>bugPosition.top){
        player.reset(); }
    }
         
}

// Reset player back to starting position.
Player.prototype.reset = function(){
    this.x = 303;
    this.y = 400;
}

// Draw the player on the screen
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// What to do when arrow keys are used
Player.prototype.handleInput = function(key) {
    if(key === 'left' && this.x > 25){
        this.x -= 101;
    }
    if(key === 'up' && this.y > 0){
        this.y -= 83;
    }
    if(key === 'right' && this.x < 600){
        this.x += 101;
    }
    if(key === 'down' && this.y < 400){
        this.y +=  83;
    }    
}

var enemy1 = new Enemy(-75, randomRow(), randomSpeed());
var enemy2 = new Enemy(-75, randomRow(), randomSpeed());
var enemy3 = new Enemy(-75, randomRow(), randomSpeed());
var enemy4 = new Enemy(-75, randomRow(), randomSpeed());
var enemy5 = new Enemy(-75, randomRow(), randomSpeed());

// Instantiation
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

var player = new Player(303, 400);

var gem1 = new Gem(randomColumn() +15, randomRow() +25);
var gem2 = new Gem(randomColumn() +15, randomRow() +25);
var gem3 = new Gem(randomColumn() +15, randomRow() +25);

var allGems = [gem1, gem2, gem3];

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