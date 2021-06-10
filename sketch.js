var canvas, backgroundImage;
var passedFinish ;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var car1,car2,car3,car4,cars;
var form, player, game;
var finishedPlayers=0;


function preload(){
track=loadImage("images/track.jpg")
ground=loadImage("images/ground.png")
car1_img=loadImage("images/car1.png")
car2_img=loadImage("images/car2.png")
car3_img=loadImage("images/car3.png")
car4_img=loadImage("images/car4.png")
obstacle_img=loadImage("images/f1.png")
}

function setup(){
  canvas = createCanvas(displayWidth,displayHeight);
  database = firebase.database();

obstaclesGroup=createGroup()

for(var i = 0;i<5;i++){
  var x=random(200,displayWidth-200)
  var y=random(-height*4,height-300)
  obstacle=createSprite(x,y)
  obstacle.addImage(obstacle_img)
  obstaclesGroup.add(obstacle)
}
 

yVel =0
xVel=0

  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4&&finishedPlayers===0){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(finishedPlayers===4){
  game.update(2)
  }
 
  if(gameState === 2){
    game.end();
  }
}
