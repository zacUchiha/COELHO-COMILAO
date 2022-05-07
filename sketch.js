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
  
  textSize(50)
  rope = new Rope(7, {x: 245, y:30});
  fruit = Bodies.circle(300, 300, 20);
  Composite.add(rope.body, fruit);
  link = new Link(rope, fruit);
}

function draw() 
{
  background(51);
  // aparecer o solo
  ground.show();
  rope.show();
  Engine.update(engine);
   ellipse(fruit.position.x, fruit.position.y, 20, 20);
}
