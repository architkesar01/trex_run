var trex,trexr;
var score
var edges ;


var  obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, ObstaclesGroup;


var e
var ig;
var cloudi;


var ObstaclesGroup 
var CloudsGroup 
var gameState
var END=0
var ground, groundi;


function preload(){
  
  trexr  = loadAnimation("trex1.png","trex3.png","trex4.png")
  
  groundi = loadImage(" ground2.png")
  cloudi = loadImage(" cloud.png")
  
   obstacle1 = loadImage(" obstacle1.png")
   obstacle2 = loadImage(" obstacle2.png")
   obstacle3 = loadImage(" obstacle3.png")
   obstacle4 = loadImage(" obstacle4.png")
   obstacle5 = loadImage(" obstacle5.png")
   obstacle6 = loadImage(" obstacle6.png")
  
  
  
}
 



function setup() {
  createCanvas(600, 200);
  
  edges = createEdgeSprites();
  
trex = createSprite(50,162,0,50)
  trex.addAnimation("runing",trexr )
  trex.scale=0.5;     
  
   ground = createSprite(200,180,1200, 20)
  
  ObstaclesGroup = createGroup();
 CloudsGroup = createGroup();
  
  ig =createSprite(200,190,400,10)
  
  ig.visible = false;
   ground.addImage(" ground", groundi)
  
  score=0; 

  
}



 



function draw() {
  background(180);
  
  if (keyDown("space") ){
    trex.velocityY = -12; 
  }
  
  trex.velocityY =  trex.velocityY+   0.8;
   ground.velocityX = -2;
   trex.collide (ig)
  
  if (ground.x<0){
     ground.x = ground.width/2;
  }

  spawnClouds();
  spawnObstacles();
  
  if(ObstaclesGroup.isTouching(trex)){
   
    gameState = END;
  
  }
  if (gameState===END){
    console.log("Game Over")
    text("Game Over",300,100)
    ground.velocityX=0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
  }

  drawSprites();
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
                
    //generate random obstacles
    var rand =Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1)
        break
         case 2:obstacle.addImage(obstacle2)
        break
         case 3:obstacle.addImage(obstacle3)
        break
         case 4:obstacle.addImage(obstacle4)
        break
         case 5:obstacle.addImage(obstacle5)
        break
         case 6:obstacle.addImage(obstacle6)
        break
        
        default:break;
        
    }
     
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudi);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}


