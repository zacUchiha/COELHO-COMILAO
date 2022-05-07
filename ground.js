class Ground 
{
  constructor(x, y, w, h) 
  {
    // propriedades - Características
    let options = {
      // deixa o corpo parado 
      isStatic:true
    };
    
    // cria um corpo retangular
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    // adiciona o corpo ao mundo
    World.add(world, this.body);
  }

  // mostrar o recurso visual 
  show() {
    // recebendo a posição do corpo
    let pos = this.body.position;
    push();
    rectMode(CENTER);
    noStroke();
    fill(148,127,146);
    // o recurso visual do corpo -> rect == rectangular
    rect(pos.x,pos.y, this.w, this.h);
    pop();
  }
}
