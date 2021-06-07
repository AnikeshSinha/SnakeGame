const canvas = document.getElementById('canvas');
const pen = canvas.getContext('2d');

pen.fillStyle = 'yellow';
const cs = 67;
const H = 735;
const W = 1200;
let food = null;
let score = 0;
// let initial_x = 50;
// let initial_y = 100;

const snake = { //Snake Objects
  // Initial Length of the snake
  init_len: 5,
  // Default direction of the snake
  direction: 'right',
  // Cells array contain all the {x,y}  for each cell
  cells:[],

  createSnake: function (){

    for (let i = 0; i < this.init_len; i++){
      this.cells.push({
        x:i,
        y:0
      })
    }

  },

  drawSnake: function(){

    for(let cell of this.cells){
      pen.fillRect(cell.x*cs,cell.y*cs,cs-2,cs-2);
    }

  },

  updateSnake: function(){
    // Getting the coordinates for current head of a snake
    const headX = this.cells[this.cells.length - 1].x;
    const headY = this.cells[this.cells.length - 1].y;

    if(headX === food.x && headY === food.y){
      food = getRandomFood();
      score++;
    }
    else{
          // Removing the First cell
    this.cells.shift();


    }

    let nextX , nextY;

    if(this.direction == 'up'){
      nextX = headX;
      nextY = headY - 1;
      if(nextY * cs < 0  ){
        clearInterval(id);
        // score = 0;
        pen.fillStyle = 'red';
        pen.fillText('Game Over', 50 , 100);

      }
      
    }
    else if(this.direction == 'down'){
      nextX = headX;
      nextY = headY + 1;

      if(nextY * cs >= H  ){
        clearInterval(id);
        // score = 0;
        pen.fillStyle = 'red';
        pen.fillText('Game Over', 50 , 100);

      }
    }
    else if(this.direction == 'left'){
      nextX = headX - 1;
      nextY = headY;
      if(nextX * cs < 0 ){
        clearInterval(id);
        // score = 0;
        pen.fillStyle = 'red';
        pen.fillText('Game Over', 50 , 100);

      }
    }
    else{
      // Getting the coordinates for next cell to pushed
      nextX = headX + 1;
      nextY = headY;

      if(nextX * cs >= W ){
        clearInterval(id);
        // score = 0;
        pen.fillStyle = 'red';
        pen.fillText('Game Over', 50 , 100);

      }
     
    }




    // Adding the new cell at headX + 1, headY+1
    this.cells.push({
      x:nextX,
      y:nextY
    })
  }


}




// intialise the Game

function init(){
  // pen.fillRect(50, 100, 67, 67);
  snake.createSnake();


  food = getRandomFood();

  // pen.fillText(`Score ${score}` ,50 , 50);

  function keypressed(e){
    // console.log(e);
    // console.lof("keyPressed");

    if(e.key === 'ArrowDown'){
      snake.direction = 'down';
    }
    else if(e.key === 'ArrowUp'){
      snake.direction = 'up';
    }
    else if(e.key === 'ArrowLeft'){
      snake.direction = 'left';
    }
    else{
      snake.direction = 'right';
    }

  }



  document.addEventListener('keydown',keypressed);
}


// Draw
function draw(){
  // pen.clearRect(0,0, W, H);
  // pen.fillRect(initial_x,initial_y, 67 ,67);

  pen.clearRect(0,0,W,H);
  pen.font = '40px sans-serif';
  pen.fillText(`Score :-  ${score}` ,50 , 50);

  pen.fillStyle = 'blue';
  pen.fillRect(food.x * cs,food.y * cs , cs , cs);
  pen.fillStyle = 'yellow';

  snake.drawSnake();

}

// update

function update(){
  // initial_x = initial_x + cs;
  snake.updateSnake();

}


// Game Loop

function gameLoop(){
  // console.log("Game Loop Running");
  draw();
  update();
}

// Random Food
function getRandomFood(){
  const foodX = Math.floor(Math.random() * (W - cs) / cs);
  const foodY = Math.floor(Math.random() * (H - cs) / cs);

  const food = {
    x: foodX,
    y: foodY
  }

  return food;
}

// Calling the init function and initilising the game
init();


const id = setInterval(gameLoop,100);
