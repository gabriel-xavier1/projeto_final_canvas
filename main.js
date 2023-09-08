class Canvas {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.atualizarTamanhoCanvas();
    window.addEventListener("resize", () => this.atualizarTamanhoCanvas());

    this.bolas = [];
  }

  atualizarTamanhoCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}

class Bola {
  constructor(canvas, posX, posY, raio, velocidadeX, velocidadeY) {
    this.canvas = canvas;
    this.posX = posX;
    this.posY = posY;
    this.raio = raio;
    this.velocidadeX = velocidadeX;
    this.velocidadeY = velocidadeY;
    this.cor = this.randomRGB();
  }

  static random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomRGB() {
    return `rgb(${Bola.random(0, 255)}, ${Bola.random(0, 255)}, ${Bola.random(
      0,
      255
    )})`;
  }

  desenhar() {
    const ctx = this.canvas.ctx;
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, this.raio, 0, Math.PI * 2);
    ctx.fillStyle = this.cor;
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.closePath();
  }

  animar() {
    this.posX += this.velocidadeX;
    this.posY += this.velocidadeY;

    if (this.posX + this.raio > this.canvas.canvas.width) {
      this.posX = this.canvas.canvas.width - this.raio;
      this.velocidadeX = -this.velocidadeX;
      this.cor = this.randomRGB();
    } else if (this.posX - this.raio < 0) {
      this.posX = this.raio;
      this.velocidadeX = -this.velocidadeX;
      this.cor = this.randomRGB();
    }

    if (this.posY + this.raio > this.canvas.canvas.height) {
      this.posY = this.canvas.canvas.height - this.raio;
      this.velocidadeY = -this.velocidadeY;
      this.cor = this.randomRGB();
    } else if (this.posY - this.raio < 0) {
      this.posY = this.raio;
      this.velocidadeY = -this.velocidadeY;
      this.cor = this.randomRGB();
    }
  }

  static adicionar(canvas) {
    const bola = new Bola(
      canvas,Bola.random(0, canvas.canvas.width),
      Bola.random(0, canvas.canvas.height),20,
      Bola.random(1, 10),
      Bola.random(1, 10)
    );
    canvas.bolas.push(bola);
  }

  static remover(canvas) {
    if (canvas.bolas.length > 0) {
      canvas.bolas.pop();
    }
  }
}



function adicionarERemover () {
  const adicionar = document.getElementById("adicionar");
  const remover = document.getElementById("remover");
  
  addEventListener("keydown", (event) => {
    if (event.key === "a" || event.key === "A") {
      Bola.adicionar(tela);
      adicionar.style.visibility = "hidden";
      remover.style.visibility = "visible";
      setTimeout(() => {
        remover.style.visibility = "hidden"; // Oculta o elemento após 3 segundos (3000 milissegundos)
      }, 9000);
    } else if (event.key === "r" || event.key === "R") {
      Bola.remover(tela);
    }
  });
}

adicionarERemover()

const tela = new Canvas();

function main() {
  tela.ctx.clearRect(0, 0, tela.canvas.width, tela.canvas.height);
  for (const bola of tela.bolas) {
    bola.desenhar();
    bola.animar();
  }
  requestAnimationFrame(main);
}

main();
