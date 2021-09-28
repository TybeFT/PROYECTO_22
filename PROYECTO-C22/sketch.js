var starImg,bgImg;
var star, starBody;
var hadaBody;
//crea la variable para el sprite del hada y fairyImg
var hada,fairyImg,fairyVoice;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	starImg = loadImage("images/star.png");
	bgImg = loadImage("images/starNight.png");
	//carga aquí la animación del hada
	fairyImg = loadAnimation("images/fairyImage1.png","images/fairyImage2.png");
	fairyVoice = loadSound("sound/JoyMusic.mp3");
}

function setup() {
	createCanvas(800, 750);

	//escribe el código para reproducir el sonido fairyVoice
	fairyVoice.loop();

	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;

	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	

	World.add(world, starBody);
	
	
	Engine.run(engine);

	//crea el sprite del hada, y agrega la animación para el hada
	hada = createSprite(140,540);
	hada.addAnimation("flying",fairyImg);
	hada.scale = 0.3;

}


function draw() {
  background(bgImg);

  Engine.update(engine);

  star.x= starBody.position.x; 
  star.y= starBody.position.y; 

  //console.log(hada.x);
  //console.log(hada.y);

  //escribe aquí el código para detener la estrella en la mano del hada
  if(star.y > 475 && starBody.position.y > 475)
  {
	  Matter.Body.setStatic(starBody,true);
  }

  movement();

  drawSprites();
}

function keyPressed() {

	if (keyCode === DOWN_ARROW) {
		Matter.Body.setStatic(starBody,false); 
		hada.x = 500;
	}
}

function movement()
{
	if(keyDown("LEFT_ARROW"))
	{
		hada.x = hada.x - 3;
	}else if(keyWentUp("LEFT_ARROW"))
	{
		hada.velocityX = 0;
	}

	if(keyDown("RIGHT_ARROW"))
	{
		hada.x = hada.x + 3;
	}else if(keyWentUp("RIGHT_ARROW"))
	{
		hada.velocityX = 0;
	}
}