// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  //using object.create setups the prototype
  let obj = Object.create(Enemy.prototype);
  obj.x = randomEnemyXStartValue();
  obj.y = randomEnemyYStartValue();
  obj.speed = randomEnemySpeedValue();
  obj.sprite = 'images/enemy-bug.png';

  return obj;
};

//QUESTION: Should these randomizer functions run be placed in prototype or
//in global scope
var randomEnemyXStartValue = function() {

  let startInColumn1 = 0,
    startInColumn2 = 101,
    startInColumn3 = 202,
    startInColumn4 = 303,
    startInColumn5 = 404,
    startInColumn6 = 505,
    startInColumn7 = 606;
  let horizontalEnemyStartPositions = [startInColumn1, startInColumn2,
    startInColumn3, startInColumn4, startInColumn5, startInColumn6, startInColumn7
  ];
  let randomStartColumn = Math.floor(Math.random() * 7);
  let randomHorizontalStartPosition = horizontalEnemyStartPositions[randomStartColumn];

  return randomHorizontalStartPosition;
}

var randomEnemyYStartValue = function() {

  let startInUpperRow = 59,
    startInMiddleRow = 142,
    startInLowerRow = 225;
  let verticalEnemyStartPositions = [startInUpperRow, startInMiddleRow,
    startInLowerRow
  ];
  let randomStartRow = Math.floor(Math.random() * 3);
  let randomVerticalStartPosition = verticalEnemyStartPositions[randomStartRow];

  return randomVerticalStartPosition;
}

var randomEnemySpeedValue = function() {
  return 200 + Math.random() * 500;
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  let startPosition = -150;
  let highestHorizontalPositionBeforeReset = 505 + Math.random() * 300;
  let currentHorizontalPosition = this.x;

  if (currentHorizontalPosition > highestHorizontalPositionBeforeReset) {

    this.x = startPosition;
    this.y = randomEnemyYStartValue();
    this.speed = randomEnemySpeedValue();
  } else {

    this.x += this.speed * dt;
  }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

  let playerFixedHorizontalStartPosition = 203;
  let playerFixedVerticalStartPosition = 405;
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  let obj = Object.create(Player.prototype);
  obj.sprite = 'images/char-boy.png';
  obj.x = playerFixedHorizontalStartPosition;
  obj.y = playerFixedVerticalStartPosition;

  return obj;
};

Player.prototype.update = function() {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyInput) {
  switch (keyInput) {
    case ("left"):
      {
        this.x -= 101;
        break;
      }
    case ("right"):
      {
        this.x += 101;
        break;
      }
      case ("up"):
        {
          this.y -= 83;
          break;
        }
        case ("down"):
          {
            this.y += 83;
            break;
          }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var numberOfEnemies = 5;
var allEnemies = enemyFactory(numberOfEnemies);

function enemyFactory(numberOfEnemies) {

  let enemyContainer = [];
  for (let i = 0; i < numberOfEnemies; i++) {
    enemyContainer.push(new Enemy);
  }

  return enemyContainer;
};

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
