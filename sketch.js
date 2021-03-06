
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var mario,mariohead,marioimgL,marioimgR,marioaniL,marioaniR;
var tetris,t1img,t2img,t3img,t4img,t5img,t6img,t7img;
var ground,sideL,sideR;
var jumpsound


function preload(){
	marioaniL = loadAnimation("images/lll.png","images/ls.png","images/lrl.png");
	marioaniR = loadAnimation("images/rs.png","images/rrl.png");
	marioimgR = loadImage("images/rs.png");
	marioimgL = loadImage("images/ls.png")
	t1img = loadImage("images/t-1.png")
	t2img = loadImage("images/t-2.png")
	t3img = loadImage("images/t-3.png")
	t4img = loadImage("images/t-4.png")
	t5img = loadImage("images/t-5.png")
	t6img = loadImage("images/t-6.png")
	t7img = loadImage("images/t-7.png")
	jumpsound = loadSound("sounds/mjs.mp3")



}

function setup(){
//make the canvas
createCanvas(400,600);

//setup mario
mario = createSprite(200,500,10,20);
mariohead = createSprite(200,481,20,5)
mario.addImage("mariorest",marioimgL);
mario.scale = 0.08;
mario.addAnimation("walkL",marioaniL);
mario.addAnimation("walkR",marioaniR);
mariohead.visible = false

//make the groups
mariogroup = new Group()
tgroup = new Group()
ggroup = new Group()

//make ground and walls
ground = createSprite(200,620,600,40);
ggroup.add(ground)
sideL = createSprite(-20,300,40,600);
ggroup.add(sideL)
sideR = createSprite(420,300,40,600);
ggroup.add(sideR)




}

function draw(){
//background setting
background("cyan");

//gravity to mario
mario.velocityY = mario.velocityY + 2

//not fall throught the ground
mario.collide(ground)

//make the soft spot of mario follow his body
mariohead.y = mario.y -20
mariohead.x = mario.x 

//move left with A key
if(keyDown("A")){
	mario.x = mario.x -4 ;
	mario.changeAnimation("walkL",marioaniL);
	}
else{
	mario.changeImage("mariorest",marioimgL);
}

//move right with D key
if(keyDown("D")){
	mario.x = mario.x + 4 ;
	mario.changeAnimation("walkR",marioaniR);
	}
else{
	mario.changeImage("mariorest",marioimgR);
}

//jumo with space bar
if(keyDown("SPACE") && mario.y > 560){
	mario.velocityY = - 20;	
	jumpsound.play()
}
else if(keyDown("SPACE") && mario.isTouching(tgroup)){
	mario.velocityY = - 20;	
	jumpsound.play()
}

//add mario to his group
mariogroup.add(mario);

//collide teris block with other things
tgroup.collide(tgroup)
mario.collide(tgroup)
mario.collide(ggroup)
tgroup.collide(ggroup)




//function of tetris
tetris()

drawSprites();
}

//make the tetris blocks function
function tetris(){
	if(frameCount % 60 === 0) {
		var tetris = createSprite(200,1,50,50);
		tetris.x = mario.x
		tetris.scale = 0.3
		tetris.velocityY = tetris.velocityY + 2

		
		

	var rand = Math.round(random(1,7));
    switch(rand) {
      case 1: tetris.addImage(t1img);
              break;
      case 2: tetris.addImage(t2img);
              break;
      case 3: tetris.addImage(t3img);
              break;
      case 4: tetris.addImage(t4img);
              break;
      case 5: tetris.addImage(t5img);
              break;
      case 6: tetris.addImage(t6img);
              break;
	  case 7: tetris.addImage(t7img);
              break;
      default: break;
}
tgroup.add(tetris)
}}