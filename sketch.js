const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var link;
var backgroundImg;
var fruitImg;
var bunny;
var bunnyImg;
function preload(){
 backgroundImg = loadImage("images/background.png");
 fruitImg = loadImage("images/melancia.png");
 bunnyImg = loadImage("images/eat_0.png")
}

function setup() 
{
  // espaço do jogo 
  createCanvas(500,500);

  // define a média de quadros
  frameRate(80);
  // motor de física 
  engine = Engine.create();

  // criando o mundo 
  world = engine.world;

  // criando um OBJETO da classe Ground
  ground = new Ground(200,490,600,20);

  // criar as formas a partir do centro
  rectMode(CENTER);
  ellipseMode(RADIUS);
  
  // size == tamanho
  // define o tamanho do texto
  textSize(50);

  // criando um objeto da classe rope
  // primeiro parâmetro é número de retangulos
  // o segundo é a posição inical da corda
  rope = new Rope(7, {x: 245, y:30});
  //criando um corpo circular
  fruit = Bodies.circle(300, 300, 20);
  // adicionando o fruta a composição
  Composite.add(rope.body, fruit);
  // criando um objeto da classe link
  link = new Link(rope, fruit);
  bunny = createSprite(250,420,40,40);
  bunny.addImage(bunnyImg);
  bunny.scale = 0.2
}

function draw() 
{
  background(51);
  image(backgroundImg,0,0,500,500);
  // aparecer o solo
  ground.show();
  // aparecer a rope
  rope.show();
  // atualizando a engine (motor)
  Engine.update(engine);
  // cria uma image de melancia
  // usa a posiçao x e y do corpo fisico da fruta
  push();
  imageMode(CENTER);
  image(fruitImg,fruit.position.x, fruit.position.y, 50, 50);
  pop();
  drawSprites();
}
