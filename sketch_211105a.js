// Based on https://editor.p5js.org/cacheflowe/sketches/JWQn2Wn4E
// A template for rendering a looping animation to video file.
// Step 1:
// Import the following Javascript in index.html:
// <script type="module" src="https://cacheflowe.github.io/haxademic.js/src/p5-recorder.es6.js"></script>
// Step 2: 
// Copy the code above `setup()` below
// Step 3:
// In `draw()` call `updateLoopRecording()` after you've draw your stuff:
// `if(saveVideo) updateLoopRecording();`
// Step 4:
// Download your video with the button that shows up under your sketch
// Step 5:
// Convert your downloaded .webm video to mp4 here: 
// https://ffmpegwasm.netlify.app/

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
// Editable properties:
// Edit `loopFrames` to change the loop duration
// And disable `saveVideo` while you're working on your sketch
var loopFrames = 400; // 8-second loop (50fps * 8)
let saveVideo = false;
let xStep = 0;

// Loop properties that help you loop elements in your animation.
// These are updated in `updateLoopRecording()`
let frameCountLooped = 1;
let loopProgress = 0;
let loopProgressRadians = 0;

// call this function at the end of `draw()`
var recorder = null;
function updateLoopRecording() {
  // create a looped framecount & normalized progress
  frameCountLooped = frameCount % loopFrames;
  loopProgress = frameCountLooped / loopFrames;
  loopProgressRadians = loopProgress * TWO_PI;
  // update video recorder
  if(saveVideo) {
    if(!recorder) recorder = new p5Recorder(loopFrames);
    recorder.renderVideo();
  }
}
/////////////////////////////////////////////
/////////////////////////////////////////////
////////////////////////////////////////////////


function setup() {
  createCanvas(400, 400);
  frameRate(50);
  background('black');
}

function draw() {
  var w = width;
  var h = height;

  drawLoopedShapes();

  updateLoopRecording();

}

function drawLoopedShapes() {
  // draw something on a loop!
  from = color(0, 255, 0, 255);
  to = color(255, 0, 255, 255);
  
  
  
  var w = width;
  var h = height;

  push();
  translate(-w/2,-h/2)
  rotate(QUARTER_PI);
  for (var i=0; i< w; i+=10){
    let inter = 0.0019 * i;  
    let c = lerpColor(from, to, inter);
    fill(c)
    rectMode(CENTER)
    translate((w/10) *  30 * xStep, 0)
    triangle( 0, h - (xStep * 10000), w/2,(xStep * 10000), w, h )
    
  }
  pop();
  
  push();
  for (var i=0; i< w; i+=10){
    let inter = 0.0019 * i;  
    let c = lerpColor(from, to, inter);
    fill(c)
    rectMode(CENTER)
    translate(0,(w/10) *  20 * -xStep, 0)
    rotate(-xStep);
    triangle( xStep * 10000, h - (xStep * 10000), w/2,(xStep * 10000), w, h )
  
  }
  pop();
  for (var i=0; i< w; i+=10){
    let inter = 0.0019 * i;  
    let c = lerpColor(from, to, inter);
    fill(c)
    rectMode(CENTER)
    translate((w/10) *  20 * xStep, 0)
    triangle( 0, h - (xStep * 10000), w/2,(xStep * 10000), w, h )
  
  }
  
  xStep = xStep + (0.000079 * sin(loopProgressRadians));
}
