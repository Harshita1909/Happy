//declaring sprites
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var survivalTime;
var score;
var ground,groundImage;
var invisibleGround;

//declaring game states
var START=1;
var PLAY=2;
var END=0;
var gameState=START;

function preload(){
  
//loading images of the sprites
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
 bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
groundImage=loadImage("ground2.png");

 
}



function setup() {
  createCanvas(600,600);
  
//creating monkey
monkey=createSprite(80,320,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale=0.1;
  

//creating ground
ground=createSprite(400,350,1000,10);
ground.addImage(groundImage);
ground.velocityX=-4;
ground.x=ground.width/2;
console.log(ground.x);
 
//creating invisible ground
invisibleGround=createSprite(400,360,1000,10);
invisibleGround.visible=false;
  
//survival time for monkey
 survivalTime=0;
  
//score
score=10;

  //creating food group
FoodGroup=createGroup();
obstacleGroup=createGroup();
  

  
}


function draw() {
background("yellow");
  
if(gameState===START){
ground.visible=false;
FoodGroup.visible=false;
obstacleGroup.visible=false;
monkey.visible=false;

stroke("green");
textSize(30);
fill("green");
text("MONKEY GO HAPPY",170,50);
  
stroke("blue");
textSize(20);
fill("blue");
text("Hi!! players . I am very hungry monkey,I love to eat bananas ",10,100);
text("I have a challenge for you guys !!,Read the instructions below to ",10,130);
text("play my game",10,160);
  
stroke("green");
textSize(30);
fill("green");
text("INSTRUCTIONS :",10,210);
  
stroke("blue");
textSize(20);
fill("blue");
text("1.Press 'G' to start the game",10,270);
text("2.You need to press space bar to jump over the obstacles",10,300);
text("and to pick bananas",10,320);  
  text("3.If you pick banans your score will increase to +5",10,350);
text("4.If you hit the obstacles your score will decrease to -5",10,380);
text("5.If your score is zero you will lose the game",10,410);
  
stroke("green");
fill("green");
textSize(30);
text("BEST OF LUCK!!",200,500);
  
if(keyDown("g")){
gameState=PLAY;
} 
}

 if(gameState===PLAY){
   ground.visible=true;
FoodGroup.visible=true;
obstacleGroup.visible=true;
monkey.visible=true;

   
  // displaying survival time
stroke("blue");
textSize(20);
fill("blue")
text("Survival Time:"+survivalTime,400,20);
survivalTime=survivalTime+Math.round(getFrameRate()/60);
   
  //displaying score
stroke("green");
textSize(20);
fill("green");
text("score:"+score,100,20);
   
//making the ground move
if (ground.x < 0){
ground.x = ground.width/2;
}
   
 //jump when the space key is pressed
 if(keyDown("space")&& monkey.y >= 320) {
monkey.velocityY = -15;
 }  
//  console.log(monkey.y);
//add gravity
monkey.velocityY = monkey.velocityY + 0.8
  
  
 //stopping monkey from falling down 
  monkey.collide(invisibleGround);


//obstacleGroup.collide(invisibleGround);
  
spawnBanana();
spawnObstacle();
   
//if(FoodGroup.isTouching(monkey)){
//score=score+5;
//FoodGroup.destroyEach();
//}

//if(obstacleGroup.isTouching(monkey)){
//score=score-5;
//obstacleGroup.destroyEach();
//}

for(i=0;i<FoodGroup.length;i++){
if(FoodGroup[i].isTouching(monkey)){
FoodGroup[i].destroy();
score=score+5;
}
}
   
for(i=0;i<obstacleGroup.length;i++){
if(obstacleGroup[i].isTouching(monkey)){
obstacleGroup[i].destroy();
score=score-5;
}
}
if(score===0){
gameState=END;
}
 } 
  
if(gameState===END){
monkey.destroy();
ground.destroy();
FoodGroup.destroyEach();
obstacleGroup.destroyEach();
  
  //displaying score
stroke("green");
textSize(20);
fill("green");
text("score:"+score,100,20);
  
  // displaying survival time
stroke("blue");
textSize(20);
fill("blue")
text("Survival Time:"+survivalTime,400,20);
  
stroke("blue");
textSize(50);
fill("blue");
text("YOU LOSE !!",200,300);
  

  

  
}
drawSprites();  


}
function spawnBanana(){
  if(frameCount%80===0){
    var banana=createSprite(600,120,40,10);
    banana.y=Math.round(random(120,200));
    banana.addImage( bananaImage);
    banana.velocityX=-3;
    banana.scale=0.1;
    
    banana.lifetime=200;
    FoodGroup.add(banana);
  
  }
}

function spawnObstacle(){
if(frameCount%60===0){
var obstacle=createSprite(600,335,10,40);
obstacle.velocityX=-6;
 var rand=Math.round(random(1,6));
 obstacle.scale=0.1; 
obstacle.addImage(obstacleImage);
obstacle.lifetime=300;

  
obstacleGroup.add(obstacle);
}  
}




