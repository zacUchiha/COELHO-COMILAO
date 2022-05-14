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

function preload(){
  
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
}

function draw() 
{
  background(51);
  // aparecer o solo
  ground.show();
  // aparecer a rope
  rope.show();
  // atualizando a engine (motor)
  Engine.update(engine);
  // cria um forma oval ou circular 
  ellipse(fruit.position.x, fruit.position.y, 20, 20);
}
