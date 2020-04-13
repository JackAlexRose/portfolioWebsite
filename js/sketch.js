let randOffset = 5;
var canvas;
var mess;
let c = color('magenta');

function setup() {
  canvas = createCanvas(800, 800);
  canvas.style('display', 'block');
  canvas.parent('mycanvas');
  canvas.style('z-index', '-1');
  background(255);
}

function draw() {
  background(0);
  stroke(240);
  for (let x = 100; x <= width - 100; x += 10) {
    for (let y = 100; y <= height - 100; y += 10) {
      if (pow((x - (width / 2)), 2) + pow((y - (height / 2)), 2) < 50000) {
        line(x - random(mouseY/8), y - random(mouseY/8), x + 5 + random(mouseY/8), y + random(mouseY/8));
      }
    }
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}