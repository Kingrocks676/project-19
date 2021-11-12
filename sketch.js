var car,carimage;
var blocker1,blocker2;
var road,roadImage;
var obstacleCar,obstacleCarImage1,obstacleCarImage2,obstacleCarImage3,obstacleGroup;
var PLAY = 1;
var END = 0;
var START_SCREEN = 2;
var gamestate = START_SCREEN;
var speed = 1;
var score = 0,score_highlihter;
var start_screen,start_screen_background;
var gameover,gameoverImage;
var start_button,startImage;
var reset_button,resetImage;
var carSound;
var highscore,highscorehighliter;

function preload()
{
  roadImage = loadImage("road.png");
  carimage = loadImage("car.jpg");
  obstacleCarImage1 = loadImage("obstacle car1.jpg");
  obstacleCarImage2 = loadImage("obstacle car2.jpg");
  obstacleCarImage3 = loadImage("obstacle car3.jpg");
  startImage = loadImage("start button.png");
  start_screen_background = loadImage("start_screen_background.png");
  gameoverImage = loadImage("game over.png");
  resetImage = loadImage("reset.png");
  carSound = loadSound("car sound.mp3");
}
function setup() 
{
  createCanvas(500,500);
  road = createSprite(250,250,200,500);
  road.addImage(roadImage);
  road.scale = 0.5;
  road.visible = false;

  car = createSprite(250,400,40,40);
  car.addImage(carimage);
  car.scale = 0.6;
  car.visible = false;
  blocker1 = createSprite(50,250,150,500);
  blocker1.shapeColor = "green"
  blocker1.visible = false;
  blocker2 = createSprite(450,250,150,500);
  blocker2.shapeColor = "green"
  blocker2.visible = false;
  obstacleGroup = createGroup();

  score_highlihter = createSprite(425,100,70,30);
  score_highlihter.shapeColor = "white";
  score_highlihter.visible = false;

  highscorehighliter = createSprite(45,100,150,30);
  highscorehighliter.shapeColor = "white";
  highscorehighliter.visible = false;
  
  gamestate = START_SCREEN;

  start_screen = createSprite(250,250,500,500);
  start_screen.scale = 1;
  start_screen.addImage(start_screen_background);
  start_screen.visible = false;

  start_button = createSprite(250,250);
  start_button.addImage(startImage);
  start_button.scale = 0.25;

  gameover = createSprite(250,250);
  gameover.addImage(gameoverImage);
  gameover.visible = false;

  reset_button = createSprite(325,100);
  reset_button.addImage(resetImage);
  reset_button.scale = 0.15;
  reset_button.visible = false;
}


function spawn_obstacles()
{
  if ((World.frameCount % 60 === 0)) 
    {
      console.log("summoned_car")
      obstacleCar = createSprite(Math.round(random(150,350)),0);
      obstacleCar.velocityY = (6 + 3*score/100);
      var i = Math.round(random(1,3));

      switch (i)
        {
        case 1:
           obstacleCar.addImage(obstacleCarImage1);
          break;
        case 2:
            obstacleCar.addImage(obstacleCarImage2);
            break;
        case 3:
            obstacleCar.addImage(obstacleCarImage3);
            break;
        default:
            break;
  }
  obstacleCar.scale = 0.45;
  obstacleCar.lifetime = 125;
      }
  obstacleGroup.add(obstacleCar);
}



function draw() 
{
 
  background("skyblue");
  drawSprites();

  text("Score: " +score, 400,100);
  textSize = 50;

  text("High score: "+highscore,30,100);
  textSize = 50;
  
  if (gamestate === START_SCREEN)
  {
    highscore = 0;
    start_button.visible = true;
    start_screen.visible = true;
  }
  if (gamestate === PLAY)
    {
      road.velocityY = (6 + 3*score/100);
      highscorehighliter.visible = true;
      score_highlihter.visible = true;
      gameover.visible = false;
      reset_button.visible = false;
      road.visible = true;
      car.visible = true;
      blocker1.visible = true;
      blocker2.visible = true;
      score_highlihter = true;
    }

    if (score >= highscore)
    {
      highscore = score;
    }

  if ((mousePressedOver(start_button) && (gamestate === START_SCREEN)))
  {
    carSound.play();
    console.log("start the game");
    start_button.destroy();
    start_screen.destroy();
    gamestate = PLAY;
  }
  if ((keyDown("RIGHT_ARROW")) && (gamestate === PLAY))
  {
    car.x += 5;
  }

  if ((keyDown("LEFT_ARROW")) && (gamestate === PLAY))
  {
    car.x -= 5;
  }

  if (road.y >= 300)
  {
    road.y = 200;
  }

  car.collide(blocker1);
  car.collide(blocker2);

  if ((car.isTouching(obstacleGroup)) && (gamestate === PLAY))
  {
    road.velocityY = 0;
    obstacleCar.velocityY = 0;
    obstacleCar.visible = false;
    gamestate = END;
    gameover.visible = true;
    console.log("game over");
    car.visible = false;
    road.visible = false;
    blocker1.visible = false;
    blocker2.visible = false;
    gameover.visible = true;
    reset_button.visible = true;
  }

  if ((mousePressedOver(reset_button) && (gamestate === END)))
  {
    carSound.play();
    gamestate = PLAY;
    SPEED = NORMAL;
    road.velocityY = 8;
    score = 0;
  }

  if ((frameCount % 60 === 0) && (gamestate === PLAY))
  {
    score = score + 10;
    console.log(score);
  }

  if (gamestate === END)
  {
    carSound.stop();
  }
  if ((frameCount % 60 === 0) && (gamestate === PLAY))
  {
    spawn_obstacles();
  }
}

