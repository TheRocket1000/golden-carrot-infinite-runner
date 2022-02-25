var carrot, gcarrot;
var runner, obs, group;
var ground, invisible;
var road, inv;
var over;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;

function preload(){

carrot = loadImage("Carrot.png");
runner = loadImage("goldencarrot.png");
road = loadImage("ground2.png");
inv = loadImage("ground1.png");
over = loadImage("gameOver.png");
}
function setup(){
  createCanvas(600,200)
  
gcarrot=createSprite(50,180,20,50);
gcarrot.scale = 0.5;
gcarrot.addImage(runner);

ground = createSprite(200,180,400,20);
ground.addImage(road);
ground.x = ground.width /2;

gameOver = createSprite(300,100);
gameOver.addImage(over);
gameOver.scale = 0.5;

invisible = createSprite(200,190,400,10);
invisible.addImage(inv);
invisible.visible = false;

group=createGroup();

gcarrot.setCollider("circle",0,0,40);
gcarrot.debug = false
  
score = 0;  
}

function draw(){
  background("black")
  
text("Score: "+ score, 500,50);  
console.log("this is ",gameState);

if (gameState === PLAY){
  gameOver.visible = false;

  ground.velocityX = -5;

  score = score + Math.round(frameCount/60);

  if (ground.x < 0){
  ground.x = ground.width/2;
  }

  if(keyDown("space") && gcarrot.y >= 150) {
  gcarrot.velocityY = -13;
}

gcarrot.velocityY = gcarrot.velocityY + 0.8

spawnObstacles();

if(group.isTouching(gcarrot)){
    gameState = END;
}
}
else if (gameState === END){
  ground.velocityX = 0;
  gameOver.visible = true;
  group.setVelocityEach(0);
  group.setLifetimeEach(-1);
}
gcarrot.collide(invisible);

drawSprites();
}

function spawnObstacles(){

  if (frameCount % 60 === 0) {
   obs = createSprite(600,600,40,10);
   obs.y = Math.round(random(10,150));
   obs.addImage(carrot);
   obs.scale = 0.2;
   obs.velocityX = -5;
   
   obs.lifetime = 300;
   
   obs.depth = gcarrot.depth;
   gcarrot.depth = gcarrot.depth + 1;
   
  group.add(obs);
  }
}