let record = false;
let canvas;
// let path;

P5Capture.setDefaultOptions({
  format: "png",
  framerate: 30,
  disableUi: true,
  disableScaling: true,
});

function preload() {
  font = loadFont("Arial Black.ttf");
  bgGradient = loadImage("img/bgGradient.png");
  bgClearWindow = loadImage("img/bgClearWindow.png");
  logo = loadImage("img/logo.png");
  logoColumn = loadImage("img/logoColumn.png");
  logoNoColumn = loadImage("img/logoNoColumn.png");
  emojiPic = [];
  for (let i = 0; i < 3; i++) {
    emojiPic[i] = loadImage("img/emojiPic" + i + ".png");
  }
  singersPic = [];
  for (let i = 0; i < 5; i++) {
    singersPic[i] = loadImage("img/concert" + i + ".png");
  }
}

function setup() {
  createCanvas(900, 900);
  canvas = new Canvas(596, 842);
  // path = new Path(posterW);
}

function draw() {
  if (record) {
    if (frameCount === 1) {
      const capture = P5Capture.getInstance();
      capture.start({
        duration: 240,
      });
    }
  }
  background(0);
  canvas.show();
  // path.show();
}

function keyPressed() {
  if (key === "s") {
    const capture = P5Capture.getInstance();
    capture.stop();
  }
}
