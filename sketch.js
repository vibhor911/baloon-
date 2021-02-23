var bg,bgimg;
var baloon,baloonimg;
var hyponoticBall,database;
var position;

function preload(){
  bg=loadImage("pro-C35 images/Hot Air Ballon-01.png")
  baloon=loadAnimation("pro-C35 images/Hot Air Ballon-02.png","pro-C35 images/Hot Air Ballon-03.png","pro-C35 images/Hot Air Ballon-04.png");
}

function setup() {
  
  bgimg=createSprite(400,200,1200,800)
  bgimg.addImage(bg);
  //bgimg.scale=2;

  createCanvas(1200,800);

  database=firebase.database();
  console.log(database);
 
  hyponoticBall = createSprite(250,250,10,10);
 // hyponoticBall.shapeColor = "red";
 hyponoticBall.addAnimation("hotair",baloon);

var hyponoticBallPosition=database.ref('ball/position');
hyponoticBallPosition.on("value",readPosition,showError);

}

function draw() {
 
 

  //if(position!=undefined){
    if(keyDown(LEFT_ARROW)){
       baloon.x = baloon.x -10;
    }
    else if(keyDown(RIGHT_ARROW)){
       baloon.x = baloon.x +10;
    }
    else if(keyDown(UP_ARROW)){
       baloon.y = baloon.y  -1;
    }
    else if(keyDown(DOWN_ARROW)){
       baloon.y = baloon.y +1;
    }
//}
  drawSprites();

  stroke(500);
  textSize(20)
  text("press up arrow to move up",10,10)
  text("press down arrow to move down",10,50)
  text("press left arrow to move left",10,100)
  text("press right arrow to move right",10,150)
}

function readPosition(data){
  position=data.val();
  console.log(position.x);
hyponoticBall.x=position.x;
hyponoticBall.y=position.y;
}

function writePosition(x,y){
  database.ref('ball/position').set({
      'x':position.x+x,
      'y':position.y+y
  })
}

function showError(){
  console.log("Error in writing to the database");
}

function keyPressed(){
  if(keyCode==32&&hyponoticBall.scale>0){
    hyponoticBall.scale=hyponoticBall.scale-0.1;
  }
}
