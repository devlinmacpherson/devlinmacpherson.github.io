let canvas;
let button;

let r = 0;
let theta = 0;

let originX = 0;
let originY = 0;

let px;
let py;

let maxRadius = 20;
let spiralTightness;
let shape;

let hue;
let sat;
let bright;

let backHue;
let backSat;
let backBright;

let mouseHeld = false;


let width;
let height;

let numSpirals = 0;

let defaultR = 120;
let defaultSpiralX;
let defaultSpiralY;



function setup() {
  colorMode(HSB, 100);
  let canvasSize = select('body');
  width = canvasSize.width;
  height = canvasSize.height;
  canvas = createCanvas(width, height);

  canvas.position(0,0);
  canvas.style('z-index', '-1');

  button = createButton("reset sketch");
  button.position(windowWidth-160, 10, 'absolute');
  button.style('color', 'white');
  button.style('font-family', 'Source Code Pro');
  button.style('border', '1px solid white')
  button.style('border-radius', '5px')
  button.mousePressed(resetSketch);

  strokeWeight(1);
  spiralTightness = random(0.1, 1);
  shape = random(7, 8);

  hue = 65;
  sat = 100;
  bright = 50;
  
  backHue = hue;
  backSat = sat;
  backBright = bright;
  
  
  background(hue, sat, bright);

  sat = random(50);
  bright = random(50, 100);

  defaultSpiralX = 300;
  defaultSpiralY = 300;
}
  function draw() {

  if (numSpirals <= 2) {
    drawSpiral(defaultSpiralX, defaultSpiralY);
  }

  stroke(hue, sat, bright);
  let x = r * cos(theta);
  let y = r * sin(theta);

  //Draw an ellipse at x,y
  if (mouseHeld == true) {
    push();
    translate(originX, originY);
    line(px, py, x, y);
    theta += shape * 2;
    r += spiralTightness * 2;
    
    pop();
  }
  px = x;
  py = y;
}


function mousePressed() {
  console.log(spiralTightness, shape);

  mouseHeld = true;
  originX = mouseX;
  originY = mouseY;
}

function mouseReleased() {
  mouseHeld = false;
  r = 0;
  hue = random(hue-15, hue+15);
  sat = random(100);
  bright = random(50, 100);
  spiralTightness = random(0.1, 1);
  shape = random(7, 8);
  numSpirals++;
}

//nice combos of tightness to shape
//0.33764569395874255 2.516029299399098 - star
//0.5490781462173264 4.688562376219423 - spiral in square
//0.20897266816521812 0.6816677792500992 - nonagon
//0.4049022672106023 1.8002588907287311 - 7 point star with spiral
//0.48068693299143384 7.522018544583969 - pentagon
//0.46393699784942266 4.707785726300671 - squre with 4 pointed spiral
//0.3308973226880011 2.3589877828958454 - 8 pointed star
//0.5277149946751076 3.1059186040423676 - maggie likes this one

function resetSketch() {
  hue = random(100);
  sat = random(60, 100);
  bright = random(40);
  
  backHue = hue;
  backSat = sat;
  backBright = bright;

  background(hue, sat, bright);

  sat = random(50);
  bright = random(50, 100);
  r = 0;
  numSpirals = 0;
  

}

function windowResized(){
  console.log("resized")
  let canvasSize = select('body');
  width = canvasSize.width;
  height = canvasSize.height;
  resizeCanvas(width, height, true);
  background(backHue, backSat, backBright);
   button.position(windowWidth-160, 10);
}


function drawSpiral(x,y){

  originX = x+(numSpirals*(4*defaultR));
  originY = y;
  if (r < defaultR){
    mouseHeld = true;
  } else {
    defaultSpiralX = random(200, windowWidth-300);
  defaultSpiralY = random(300, windowHeight-300);
    mouseHeld = false;
    r = 0;
    hue = random(hue-15, hue+15);
    sat = random(100);
    bright = random(50, 100);
    spiralTightness = random(0.1, 1);
    shape = random(7, 8);
    numSpirals++;
  }
}