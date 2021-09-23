var lives=3,kills=0,gameState="play"
function preload(){
  playerImg=loadImage("images/player1.png")
  enemy1Img=loadImage("images/enemy1.png")
  enemy2Img=loadImage("images/enemy2.png")
  enemy3Img=loadImage("images/enemy3.png")
  bigEnemyImg=loadImage("images/bigEnemy.png")
}


function setup() {
  createCanvas(windowWidth,windowHeight+1);

  player=createSprite(width/2,height-30,10,10)
  player.addImage(playerImg)
  player.scale=0.3

  safetyLine=createSprite(width/2,height-150,width,2)
  safetyLine.visible=false

  enemyGroup=new Group()
  bulletGroup=new Group()

  life1=createSprite(width-150,100,10,10)
  life1.addImage(playerImg)
  life1.scale=0.1

  life2=createSprite(width-100,100,10,10)
  life2.addImage(playerImg)
  life2.scale=0.1

  life3=createSprite(width-50,100,10,10)
  life3.addImage(playerImg)
  life3.scale=0.1

  bigEnemy=createSprite(50,-100,10,10)
  bigEnemy.addImage(bigEnemyImg)
  bigEnemy.scale=0.5

  
}

function draw() {
  background("black");  
  stroke("white")
  textSize(20)
  text("lives="+lives,width-120,50)

  if(lives<=2){
    life1.visible=false
  }

  if(lives<=1){
    life2.visible=false
  }

  if(lives<=0 || gameState==="lost"){
    life3.visible=false
    text("GAME OVER!!!",width/2-50,height/2)
  }

  if(gameState==="won"){
  
    text("YOU WON",width/2-50,height/2)
  }

  stroke("white")
  
  strokeWeight(5)
  
  for(var i=0;i<width;i=i+40) {
    line(i,height-150,i+20,height-150)
  }
  player.x=mouseX
 enemyGroup.bounceOff(safetyLine,destroyLives)
 bulletGroup.bounceOff(enemyGroup,destroyBulletEnemy)
 if(bulletGroup.isTouching(bigEnemy)){
  gameState="won"
  bigEnemy.destroy()
 }

 if(safetyLine.isTouching(bigEnemy)){
  gameState="lost"
 }
  if(lives>0 && gameState==="play"){
    createEnemies()
    gun()
  }
 if(kills>2){
  bigEnemy.velocityY=1.2
  
  if(frameCount%20===0){
    bigEnemy.x=random(100,width-100)
  }
 }
  drawSprites();

}

function destroyLives(enemy,safetyLine){
  enemy.destroy()
  safetyLine.velocityY=0
 
  if(lives>0 && gameState==="play"){
    lives=lives-1
  }
}


function destroyBulletEnemy(bullet,enemy){
  enemy.destroy()
  bullet.destroy()
  kills=kills+1
}

function createEnemies(){
  if(frameCount%60===0){
    var enemy=createSprite(random(200,width-200),-50,10,10)
    enemy.velocityY=3
    var r=Math.round(random(1,3))
    if(r===1){
      enemy.addImage(enemy1Img)
      enemy.scale=0.3
    }
    if(r===2){
      enemy.addImage(enemy2Img)
      enemy.scale=0.4
    }
    if(r===3){
      enemy.addImage(enemy3Img)
      enemy.scale=0.15
    }
    enemyGroup.add(enemy)
    
  }

}
function gun(){
  if(frameCount%40===0){
    bullet=createSprite(player.x,player.y,10,10)
    bullet.velocityY=-10
    bulletGroup.add(bullet)

  }

}