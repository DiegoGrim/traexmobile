var PLAY = 1 ;
var END = 0;
var GS= PLAY ;
var trex, trex_running,colition, edges;
var groundImage,ground;
var invisble;
var cielo;
var cactus1,cactus2,cactus3,cactus4,cactus5,cactus6;
var score;
var gameOver , gameOverIMG ; 
var restart , restartIMG ;
var jump , checkpoint , death ;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cielo= loadImage("cloud.png");
  cactus1 = loadImage("obstacle1.png");
  cactus2 = loadImage("obstacle2.png");
  cactus3 = loadImage("obstacle3.png");
  cactus4 = loadImage("obstacle4.png");
  cactus5 = loadImage("obstacle5.png");
  cactus6 = loadImage("obstacle6.png");
  colition = loadImage ("trex_collided.png");
  gameOverIMG = loadImage("gameOver.png");
  restartIMG = loadImage ("restart.png"); 
  jump = loadSound ("jump.mp3");
  checkpoint =loadSound ("checkPoint.mp3");
  death = loadSound ("die.mp3"); 
}

function setup(){
  createCanvas(windownWidth,windowHeight);
  
  //crear sprite de Trex
  trex = createSprite (50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addImage("tirex",colition)
  edges = createEdgeSprites();
  
  //agregar tamaño y posición al Trex
  trex.scale = 0.5;
  trex.x = 50;
  ground=createSprite(200,180,300,10);
  ground.addImage ("ground2",groundImage);

  
  invisible=createSprite(width/2,height-10,width,125);
  invisible.visible = false;
 nubes=new Group ();
 cactuss=new Group ();
 score=0 
 gameOver=createSprite (300,100,50,50);
 gameOver.addImage (gameOverIMG)
 restart=createSprite (300,150,50,50);
 restart.addImage (restartIMG)
 gameOver.scale = 0.5;
 restart.scale = 0.5 ;
 trex.setCollider ("rectangle",0,0,900,trex.heigth); 
}


function draw(){
  //establecer color de fondo.
  background("white");
  if (GS === PLAY ) {
    gameOver.visible = false 
    restart.visible = false 
 text("score:   "+score,450,100)
 fill(0);
  ground.velocityX = -(4 + score/300);
    //Mover aqui conteo de puntos 
    score = score + Math.round(frameCount/60);
    //Mover aqui puntuacion
      if (score > 0 && score % 300 === 0 ){
      checkpoint.play ();   
      }
    //Mover aqui ciclo de repeticion de suelo
     if (ground.x < 0 ){
    ground.x = ground.width/2
  }  
    //Mover aqui salto de trex
   //if(keyDown("space")&& trex.y >= 150 ){
    //trex.velocityY = -10;
    //jump.play ();
  //}    
  if (touches.length > 0 || keyDown ("space") && trex.y >= heigth -100) {
    trex.velocityY = -10;
    jump.play ();
    touches = []; 
  }
    //Mover aqui efecto gravedad  
   trex.velocityY = trex.velocityY + 0.5;    
    //Mover aqui nubes
   clouds(); 
    //Mover aqui obstaculos
   cactus(); 
   if(score>=750 ){
     background(0)
     fill(500);
     text("score:    "+score,450,100)
     
   }
   if (score>=3500){
     background(500)
     fill(0);
     text("score:    "+score,450,100)
     
   }
    //Establecer cambio de estado de juego GS
        if (cactuss.isTouching(trex)  ) {
          GS=END ;
          death.play () ;   
          //trex.velocityY = -9;
          //jump.play ();
        }
        
    } else if (GS === END ){
    ground.velocityX = 0;
    trex.velocityY = 0;
    cactuss.setVelocityXEach(0); 
    nubes.setVelocityXEach(0);
    trex.changeAnimation("tirex",colition);
    gameOver.visible = true 
    restart.visible = true 
    cactuss.setLifetimeEach(-1);
    nubes.setLifetimeEach(-1);
    

        //Establecer aqui movimiento 0 del suelo
    
    }
   if (mousePressedOver (restart)){
     reinicio ();
   }
   if (mousePressedOver (gameOver)){
     reinicio ();
   }
  //cargar la posición Y del Trex
  console.log(trex.y)
  
  //hacer que el Trex salte al presionar la barra espaciadora
 

 
  
  //evitar que el Trex caiga
  trex.collide (invisible)
  
  
  drawSprites();
}
function clouds(){
  if(frameCount % 80 === 0){
    cloud=createSprite(600,50,30,10);
    cloud.velocityX = -(6 + score/300);
    cloud.addImage(cielo);
    cloud.scale= 0.8;
    cloud.depth = trex.depth;
    trex.depth = trex.depth +1;
    cloud.y = Math.round(random(10,60));
    cloud.lifetime =210;
    nubes.add(cloud);
  }
 
}
function cactus(){
if(frameCount %80 === 0 ){
  var obstaculos = createSprite(600,160,20,50);
  var rand = Math.round (random(1,6));
  obstaculos.velocityX = -(6 + score/500);
 switch (rand) {
   case 1 : obstaculos.addImage(cactus1);
   break;
   case 2 : obstaculos.addImage(cactus2);
   break;
   case 3 : obstaculos.addImage(cactus3);
   break;
   case 4 : obstaculos.addImage(cactus4);
   break;
   case 5 : obstaculos.addImage(cactus5);
   break;
   case 6 : obstaculos.addImage(cactus6);
   break;
   default:break;
 }
 obstaculos.scale = 0.5 ;
 obstaculos.lifetime =250;
 obstaculos.depth = trex.depth; trex.depth = trex.depth +1 ;
 cactuss.add (obstaculos);
}
}
function reinicio () {
GS = PLAY ;
gameOver.visible = false ;
restart.visible = false ;
cactuss.destroyEach ();
nubes.destroyEach (); 
trex.changeAnimation ("running", trex_running );
score = 0 ; 

}