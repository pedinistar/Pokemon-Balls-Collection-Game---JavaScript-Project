const NUM_BUSHES = 50;
const NUM_BALLS = 5;
const player = document.getElementsByClassName("player")
const player_position = {
  x: parseInt(window.innerWidth / 2),
  y: parseInt(window.innerHeight / 2)
}
const balls = [];
const sound = new Audio("assets/coin.mp3")
var score = 0;
const player_velocity = {
  x:0,
  y:0
}

function createBushes(){
  for(let i = 0; i < NUM_BUSHES; i++){
    const div = document.createElement("div");
    div.classList.add('bush')
    div.style.left = Math.random() * 100 + '%';
    div.style.top = Math.random() * 100 + '%';
    document.body.appendChild(div)
  }
}

function generateBall(){
  const div = document.createElement("div");
  div.classList.add('pokeball')
  let x = Math.random() * 100 + '%';
  let y = Math.random() * 100 + '%';
  div.style.left = x;
  div.style.top = y;
  balls.push({
    ball: div,
    position: {
      x,
      y
    }
  })
  document.body.appendChild(div)
}

function createBalls(){
  for(let i = 0; i < NUM_BALLS; i++){
   generateBall()
  }
}

function collision($div1, $div2) {
  var x1 = $div1.getBoundingClientRect().left;
  var y1 = $div1.getBoundingClientRect().top;
  var h1 = $div1.clientHeight;
  var w1 = $div1.clientWidth;
  var b1 = y1 + h1;
  var r1 = x1 + w1;

  var x2 = $div2.getBoundingClientRect().left;
  var y2 = $div2.getBoundingClientRect().top;
  var h2 = $div2.clientHeight;
  var w2 = $div2.clientWidth;
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}

function score_display(){
  score+=1;
  console.log(score)
  document.querySelector(".score").textContent = score;
}

function checkCollisions(){
  balls.forEach(ball => {
      if(collision(ball.ball, player[0])){
        sound.play();
        ball.ball.remove();
        generateBall();
        score_display();
      }
  })
}

function run(){

  player_position.x += player_velocity.x
  player_position.y += player_velocity.y
  
  player[0].style.left = player_position.x + "px"
  player[0].style.bottom = player_position.y + "px"

  checkCollisions();

  // run will call again and agian
  requestAnimationFrame(run)
}

// main function

function init(){
  createBushes();
  createBalls();
  run();
  checkCollisions();
}

init()

window.addEventListener("keydown", function(dets){
  // dets.key will give the key pressed
  if(dets.key == "ArrowUp"){
    player_velocity.y = 10;
    player[0].style.backgroundImage = 'url(assets/player_front.png)';
  }
  else if(dets.key == "ArrowDown"){
    player_velocity.y = -10;
    player[0].style.backgroundImage = 'url(assets/player_back.png)';
  }
  else if(dets.key == "ArrowLeft"){
    player_velocity.x = -10;
    player[0].style.backgroundImage = 'url(assets/player_left.png)';
  }
  else if(dets.key == "ArrowRight"){
    player_velocity.x = 10;
    player[0].style.backgroundImage = 'url(assets/player_right.png)';
  }
  player[0].classList.add('active')
})

window.addEventListener("keyup", function(dets){
  player_velocity.x = 0;
  player_velocity.y = 0;
  player[0].classList.remove('active')
})