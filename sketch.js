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
var cutBtn;
var blink;
var eat;
var backgroundSound;
var muteButton;
var ballonButton;
function preload(){
 backgroundImg = loadImage("images/background.png");
 fruitImg = loadImage("images/melancia.png");
//  bunnyImg = loadImage("images/eat_0.png");
 blink = loadAnimation("images/blink_1.png","images/blink_1.png", "images/blink_1.png", "images/blink_1.png", "images/blink_1.png", "images/blink_2.png", "images/blink_3.png");
 eat = loadAnimation("images/eat_0.png","images/eat_1.png","images/eat_2.png","images/eat_3.png","images/eat_4.png");
 eat.looping = false;
 backgroundSound = loadSound("sound/sound1.mp3");
 
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
  blink.frameDelay = 20;
  bunny = createSprite(400,420,40,40);
  bunny.addAnimation("piscando", blink);
  bunny.addAnimation("comendo", eat);
  bunny.scale = 0.2;

  cutBtn = createImg("./images/cut_btn.png");
  cutBtn.position(230, 20);
  cutBtn.size(50,50);
  cutBtn.mouseClicked(drop);
  backgroundSound.play();

  // image -> img
  muteButton = createImg("images/mute.png");
  // x, y
  muteButton.position(450,20);
  // largura e altura
  muteButton.size(50,50);
  // quando houver um evento de clique no mutebutton vamos chamar a funçao mute
  muteButton.mouseClicked(mute);
  ballonButton = createImg("images/balloon.png");;
  ballonButton.position(10,250);
  ballonButton.size(150,100);
  ballonButton.mouseClicked(air);
}

function air() {
  // aplicar força
  // corpo -> fruit
  // posição da aplicação da força
  // valor da força x ou/e y
  Matter.Body.applyForce(fruit, {x:0, y:0}, {x:0.01, y:0});
}

function mute() {
  // play -> jogar, tocando
  if(backgroundSound.isPlaying()) {
    backgroundSound.stop();
  } else {
    backgroundSound.play();
  }
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
  

  // so vamos mostrar a fruta se ela existir
  if(fruit) {
    push();
    imageMode(CENTER);
    // colocando a imagem no corpo fisico da fruta
    image(fruitImg,fruit.position.x, fruit.position.y, 50, 50);
    pop();
  }


  if(collide(fruit,bunny, 80)) {
    // trocando a animação
    bunny.changeAnimation("comendo");
    World.remove(world, fruit);
    fruit = null;
  }
  drawSprites();
}

// soltando a fruta da corda
function drop() {
  // quebrando a corda
  rope.break();
  // tira a restrição
  link.detach();
  // null == nulo
  link = null;
}

// sprite.collide = do sprite
function collide(corpoA, corpoB, distancia) {
  if(corpoA != null && corpoB != null) {
    // o dist é uma função que calcula a distancia entre dois pontos
    var diferenca = dist(corpoA.position.x, corpoA.position.y,corpoB.position.x, corpoB.position.y );
    // dentro do parenteses fica a condição
    if (diferenca <= distancia) {
      return true;
    } else {
      return false;
    }
  }
}