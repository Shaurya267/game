var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = (9 + 1*9 + 1*9 + 1*height/600);
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(300,500,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 4;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 4;
    }
    
    if(keyDown("space")){
      ghost.velocityY = 0;
      tower.velocityY = 0;
           
        doorsGroup.setLifetimeEach(-1);
        climbersGroup.setLifetimeEach(-1);
        invisibleBlockGroup.setLifetimeEach(-1); 
      
      doorsGroup.setVelocityYEach(0);
      climbersGroup.setVelocityYEach(0);
      invisibleBlockGroup.setVelocityYEach(0);
    }
    
    ghost.velocityY = 0;
    
    if(tower.y > 400){
      tower.y = 200
    }
    spawnDoors();
    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
      ghost.velocityX = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.velocityY = 0;
      ghost.velocityX = 0;
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    ghost.velocityY = 0;
      tower.velocityY = 0;
           
        doorsGroup.setLifetimeEach(-1);
        climbersGroup.setLifetimeEach(-1);
        invisibleBlockGroup.setLifetimeEach(-1); 
      
      doorsGroup.setVelocityYEach(0);
      climbersGroup.setVelocityYEach(0);
      invisibleBlockGroup.setVelocityYEach(0);

      stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = (9 + 1*9 + 1*9 + 1*height/600);
    climber.velocityY = (9 + 1*9 + 1*9 + 1*height/600);
    invisibleBlock.velocityY = (9 + 1*9 + 1*9 + 1*height/600);
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 100;
    climber.lifetime = 100;
    invisibleBlock.lifetime = 100;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = false;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

