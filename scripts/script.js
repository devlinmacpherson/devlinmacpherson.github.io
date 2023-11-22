let canvas;
let button;

//radius
let r = 0;

//Spiral shape variables
let theta = 0;
let shape = 0;
let spiralTightness;

let originX = 0;
let originY = 0;

//previous x,y
let px = 0;
let py = 0;

let hue;
let sat;
let bright;

//background color
let backHue;
let backSat;
let backBright;

//boolean to handle mouse interaction. Helpful if I want to trigger interaction even when mouse isn't held
let mouseHeld = false;

//number of spirals drawn
let numSpirals = 0;

//default radius for first spiral
let defaultR = 100;

function setup() {
  colorMode(HSB, 100);
  pixelDensity(1);

  //gets the size of whole webpage, not just window width + height
  let canvasSize = select("html");
  let cWidth = canvasSize.width;
  let cHeight = canvasSize.height;
  let canvas = createCanvas(cWidth, cHeight);

  canvas.position(0, 0);

  //puts p5 canvas behind html
  canvas.style("z-index", "-1");

  button = createButton("reset sketch");
  button.position(width - 160, 10, "absolute");
  button.style("color", "white");
  button.style("font-family", "Source Code Pro");
  button.style("border", "1px solid white");
  button.style("border-radius", "5px");
  button.mousePressed(resetSketch);

  strokeWeight(1);

  //picks from array of default spiral values

  let tightVals = [
    0.38175749089477296, 0.24719396512365946, 0.7881740929340183,
    0.4822905762702234, 0.6863264099825124, 0.9806672252079057,
    0.11776075965458849,
  ];
  let shapeVals = [
    7.780660232309292, 7.185809339100562, 7.315342962934979, 7.4599722289230375,
    7.816392968025264, 7.9969575387599345, 7.335059510592007,
  ];

  let hueVals = [39.64, 67.46, 51.3, 1.6, 10.31, 32.8, 42.24];

  let spiralSelect = Math.floor(Math.random() * tightVals.length);
  spiralTightness = tightVals[spiralSelect];
  shape = shapeVals[spiralSelect];

  //default background color is blue
  backHue = 65;
  backSat = 100;
  backBright = 50;
  background(backHue, backSat, backBright);

  //default spiral selected from default color array
  hue = hueVals[Math.floor(Math.random() * hueVals.length)];
  sat = 100;
  bright = Math.random() * 50 + 50;
}
function draw() {
  //if pages gets reloaded or reset, automatically draw first spiral
  if (numSpirals <= 0) {
    drawSpiral(width / 2 + 200, 200);
  }

  stroke(hue, sat, bright);

  //calculates next point along the spiral
  let x = r * Math.cos(theta);
  let y = r * Math.sin(theta);

  //as long as mouse is being held, draw a line between previous x,y and current x,y
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
  mouseHeld = true;
  originX = mouseX;
  originY = mouseY;
}

function mouseReleased() {
  //this if statement ignores the mouse click when the reset button is pressed
  if (numSpirals > 0) {
    //when mouse is released, generate new values for everything
    mouseHeld = false;
    r = 0;
    //hues are selected within a similar range of the previous color
    hue = Math.random() * (hue + 30 - (hue - 30)) + (hue - 30);
    sat = Math.random() * 100;
    bright = Math.random() * 50 + 50;
    spiralTightness = Math.random() * 0.9 + 0.1;
    shape = Math.random() + 7;
    numSpirals++;
    console.log("Spiral #:", numSpirals);
    console.log(
      "Sprial Tightness:",
      spiralTightness,
      "\n",
      "Spiral Shape:",
      shape,
      "\n",
      "hue:",
      hue,
      "\n",
      "saturation:",
      sat,
      "\n",
      "brightness:",
      bright
    );
  }
}

function resetSketch() {
  console.log("reset");

  //randomly select a new color
  hue = Math.random() * 100;
  sat = Math.random() * 40 + 60;
  bright = Math.random() * 40;

  background(hue, sat, bright);

  //first spiral color will be complimentary, but brighter
  hue = Math.random() * (hue + 30 - (hue - 30)) + (hue - 30);
  sat = Math.random() * 100;
  bright = Math.random() * 50 + 50;
  r = 0;
  numSpirals = 0;

  console.log("Sprial Tightness:", spiralTightness);
  console.log("Spiral Shape:", shape);
  console.log("hue:", hue);
  console.log("saturation:", sat);
  console.log("brightness:", bright);
}

//resizes p5 canvas when browser window is res
function windowResized() {
  console.log("resized");
  let canvasSize = select("html");
  let cWidth = canvasSize.width;
  let cHeight = canvasSize.height;
  resizeCanvas(cWidth, cHeight, true);
  background(backHue, backSat, backBright);
  button.position(width - 160, 10);
}

//function to draw spiral when mouse is not clicked. this is used on page loading to generate the first spiral
function drawSpiral(x, y) {
  originX = x + numSpirals * (4 * defaultR);
  originY = y;

  //once the spiral reaches a certain radius, it is finished
  if (r < defaultR) {
    mouseHeld = true;
  } else {
    mouseHeld = false;
    r = 0;
    hue = Math.random() * (hue + 30 - (hue - 30)) + (hue - 30);
    sat = Math.random() * 100;
    bright = Math.random() * 50 + 50;
    spiralTightness = Math.random() * 0.9 + 0.1;
    shape = Math.random() + 7;
    numSpirals++;

    console.log("Spiral #:", numSpirals);
    console.log(
      "Sprial Tightness:",
      spiralTightness,
      "\n",
      "Spiral Shape:",
      shape,
      "\n",
      "hue:",
      hue,
      "\n",
      "saturation:",
      sat,
      "\n",
      "brightness:",
      bright
    );
  }
}
