const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const pixelCtverec = 32; //inicalizace čtverce v canvasu o velikosti 32px*32px
let startDate = new Date();
let date = 0;
let datum = 0;
let minuty = 0;
let interval = 0;
let speed = 2;
let game = 0;
let buttonS = document.getElementById('spustitS');
let buttonP = document.getElementById('spustitP');
let button = document.getElementById('spustit');
const ground = new Image();
const foodImg2 = new Image();

ground.src = 'images/pozadi.jpg';
foodImg2.src = 'images/jahoda.png'
let snake = [];
snake[0] = {
  x: 9 * pixelCtverec,
  y: 9 * pixelCtverec
};
//Math.random()*(max-min)+min
/*Objekt jahoda nám generuje jahodu (jídlo pro hada) v rámci canvasu*/
let jahoda = {
  x: Math.floor(Math.random() * (19 - 1) + 1) * pixelCtverec,
  y: Math.floor(Math.random() * (19 - 1) + 1) * pixelCtverec
}
let d;
let score = 0;
document.addEventListener('keydown', direction);

function direction(event) {

  if (event.keyCode === 37)
    d = 'LEFT';
  else if (event.keyCode === 38)
    d = 'UP';
  else if (event.keyCode === 39)
    d = 'RIGHT';
  else if (event.keyCode === 40)
    d = 'DOWN';
}

function collision(newhead, snake) {
  for (let bod of snake) {
    if (newhead.x === bod.x && newhead.y === bod.y)
      return true;
  }
  return false;
}

/*function vypisCas(){
  interval = setInterval(function(){
  date = new Date();
  datum = Math.round((((date - startDate) / 1000)*10)/10);
  if(datum >= 60) {
    minuty++;
    datum = 0;
    startDate = new Date();
  }
  ctx.fillStyle = 'white';
  ctx.fillText(minuty, 12 * pixelCtverec, 1.6 * pixelCtverec);
  ctx.fillText(":", 13 * pixelCtverec, 1.6 * pixelCtverec);
  ctx.fillText(datum , 14*pixelCtverec, 1.6 * pixelCtverec);
  }, 65);
  }*/
function draw() {
  ctx.drawImage(ground, 0, 0);
  for (let i = 0; i < snake.length; i++) {

    ctx.fillStyle = (i == 0) ? 'darkred' : 'orange';
    ctx.fillRect(snake[i].x, snake[i].y, pixelCtverec, pixelCtverec);

    ctx.strokeStyle = 'white';
    ctx.strokeRect(snake[i].x, snake[i].y, pixelCtverec, pixelCtverec);

  }
  ctx.drawImage(foodImg2, jahoda.x, jahoda.y, pixelCtverec, pixelCtverec);
  let snakeX = snake[0].x,
    snakeY = snake[0].y;

  if (d === 'LEFT')
    snakeX -= pixelCtverec;
  if (d === 'UP')
    snakeY -= pixelCtverec
  if (d === 'RIGHT')
    snakeX += pixelCtverec;
  if (d === 'DOWN')
    snakeY += pixelCtverec;
  else if (d === 'LEFT' || d === 'RIGHT' || d === 'DOWN' || d === 'UP') {
    date = new Date();
    datum = Math.round((((date - startDate) / 1000) * 10) / 10);
    if (datum >= 60) {
      minuty++;
      datum = 0;
      startDate = new Date();
    }
  }
  if (snakeX === jahoda.x && snakeY === jahoda.y) {
    score++;
    jahoda.x = (Math.floor(Math.random() * (18 - 1) + 1)) * pixelCtverec;
    jahoda.y = (Math.floor(Math.random() * (18 - 1) + 1)) * pixelCtverec;
  } else {
    //Metoda pop() odstraní poslední prvek z pole a vrátí jej
    snake.pop();
  }
  //Rules
  if (snakeX < 0 || snakeX > 18 * pixelCtverec || snakeY < 0 || snakeY > 18 * pixelCtverec || collision({
      x: snakeX,
      y: snakeY
    }, snake)) {
    clearInterval(game);
    ctx.fillStyle = 'white';
    ctx.fillText("SKONČIL JSI!", 150, 326);
    setInterval(function(){
      location.reload();
    },5000);
  }
  snake.unshift({
    x: snakeX,
    y: snakeY
  });

  ctx.fillStyle = 'white';
  ctx.font = '45px Changa one';
  ctx.fillText("Skóre: " + score, 1 * pixelCtverec, 1.6 * pixelCtverec);
  ctx.fillText("Herní čas:", 9 * pixelCtverec, 1.6 * pixelCtverec);
  if (minuty <= 9) {
    ctx.fillText("0" + minuty, 15 * pixelCtverec, 1.6 * pixelCtverec);
  } else
    ctx.fillText("0" + minuty, 15 * pixelCtverec, 1.6 * pixelCtverec);
  ctx.fillText(":", 16.5 * pixelCtverec, 1.6 * pixelCtverec);
  if (datum <= 9) {
    ctx.fillText("0" + datum, 17 * pixelCtverec, 1.6 * pixelCtverec);
  } else
    ctx.fillText(datum, 17 * pixelCtverec, 1.6 * pixelCtverec);
}

function kol() {
  button.addEventListener('click', function () {
    clearInterval(game);
    game = setInterval(draw, 70 / speed);
    button.setAttribute('disabled', true);
    buttonS.setAttribute('disabled', true);
    buttonP.setAttribute('disabled', true);
  })
  buttonS.addEventListener('click', function () {
    clearInterval(game);
    game = setInterval(draw, 100 / speed);
    button.setAttribute('disabled', true);
    buttonS.setAttribute('disabled', true);
    buttonP.setAttribute('disabled', true);
  })
  buttonP.addEventListener('click', function () {
    clearInterval(game);
    game = setInterval(draw, 200 / speed);
    button.setAttribute('disabled', true);
    buttonS.setAttribute('disabled', true);
    buttonP.setAttribute('disabled', true);
  })
}
kol();
//vypisCas();