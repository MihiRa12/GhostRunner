var door, doorImage, tower, towerImage, ghost, ghostImage, climber,climberImage, invisibleBlock, doorsGroup, climbersGroup, invisibleBlockGroup, sound;
var gameState = "play";

function preload(){
  
  doorImage = loadImage("door.png");
  towerImage = loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png");
  climberImage = loadImage("climber.png");
  sound = loadSound("spooky.wav");
  
  
}

function setup(){
  
  createCanvas(600,600);
  
  //sound.loop();
  
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  
}

function draw(){
  
  background('white');
  
  if(gameState === "play"){
    
    if(keyDown("left_arrow")){
      
      ghost.x = ghost.x-3;
      
    }
    
    if(keyDown("right_arrow")){
      
      ghost.x = ghost.x+3;
      
    }
    
    if(keyDown("space")){
      
      ghost.velocityY = -10;
      
    }
    
    ghost.velocityY = ghost.velocityY+0.8;
    
    if(tower.y>400){
      
      tower.y = 300;
      
    }
    
    spawnDoors();
    
    if(climbersGroup.isTouching(ghost)){
      
      ghost.velocityY = 0;
      
    }
    
    if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
      
      ghost.destroy();
      gameState= "end";
      
    }
    drawSprites(); 
  }
  
  if( gameState === "end"){
    
    text("Game Over", 230,250);
    
  }
  
  
  
 
}

function spawnDoors(){
   
  if(frameCount%240===0){
    
    var door = createSprite(200,-50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImage);
    climber.addImage(climberImage);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;
    
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    
    
  }
}