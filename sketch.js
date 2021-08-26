var PLAY = 1;
var END = 0;
var gameState = PLAY;


var path1,jack,sun,ground
var cloudsGroup,hurdlesGroup
var score=0

function preload(){
    path=loadImage("backgroundImg.png")
  running = loadAnimation("leg1.png","leg2.png","leg3.png","leg4.png","leg5.png","leg6.png","leg7.png","leg8.png");
  hurdleimg=loadImage("hurdle.png");
  sunAnimation = loadImage("sun.png");
  groundImg=loadImage("ground.png")
  cloudImage = loadImage("cloud.png");
  jumpSound = loadSound("jump.wav")
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  sideImg=loadImage("side.png");
}

function setup(){
    createCanvas(600,400);
   
    
   
    path1=createSprite(300,200)
    path1.addImage("way", path)
    path1.scale=5

    jack=createSprite(100,260,50,50)
    jack.addAnimation("runner", running)
    jack.scale=0.6
    jack.debug=true
    jack.setCollider("rectangle",0,0,40,225)

    sun = createSprite(width-50,75,10,10);
    sun.addAnimation("sun", sunAnimation);
    sun.scale = 0.1

    invisibleGround = createSprite(width/2,385,width,125);  
    invisibleGround.shapeColor ="#f4cbaa"

    ground=createSprite(300,400,600,100);
    ground.addImage("groun",groundImg)

    gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  restart.scale=0.1
  
  gameOver.visible = false;
  restart.visible = false;
 
    cloudsGroup = new Group();
    hurdlesGroup = new Group();
  score=0
    
}

function draw (){
  background(0);
  
  
if(gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);
  
  ground.velocityX=path1.velocityX 
  path1.velocityX=-(5+5*score/10)
  if (path1.x < 0){
    path1.x = path1.width/2;
  }

  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  if(keyDown("SPACE")){
    jack.velocityY=-10
    jumpSound.play()
  }

 

  jack.velocityY = jack.velocityY + 0.8

  jack.collide(invisibleGround);

  
  spawnHurdle()
  spawnClouds()

  if(hurdlesGroup.isTouching(jack)){
    gameState=END
    
  }
    
}

  if(gameState===END){
    gameOver.visible=true
    restart.visible=true
    path1.velocityX=0
    ground.velocityX = 0;
      jack.velocityY = 0
      jack.y=240
      // hurdlesGroup.destroyEach()
      // cloudsGroup.destroyEach()
      hurdlesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

      hurdlesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    jack.addAnimation("runner",sideImg)

    if(mousePressedOver(restart)){
      reset()
    }
  }
  drawSprites()

    textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();

  jack.addAnimation("runner",running)

  score = 0;
    
}


function spawnHurdle(){
  if(frameCount % 60===0){
    hurdle=createSprite(600,300,50,50)
    hurdle.scale=0.3
    hurdle.x=Math.round(random(600,500))
    hurdle.addImage("hud",hurdleimg)
    hurdle.velocityX=-(5*score/10)
    hurdle.lifetime=300
    hurdlesGroup.add(hurdle)
  }
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width+20,height-320,40,10);
    cloud.y = Math.round(random(100,220));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = jack.depth;
    jack.depth = jack.depth+1;

    cloudsGroup.add(cloud);
  }
} 

