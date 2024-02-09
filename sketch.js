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
  // noLoop();
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

function mouseDragged() {
  let offsetMouse = createVector(
    (width - canvas.posterW) / 2,
    (height - canvas.posterH) / 2
  );
  let mousePos = createVector(mouseX, mouseY);
  mousePos.sub(offsetMouse);

  for (let i = 0; i < canvas.emoji.length; i++) {
    let offsetEmoji = [];
    let offsetEmojiPos = [];
    offsetEmoji[i] = createVector(canvas.emoji[i].w / 2, canvas.emoji[i].h / 2);
    offsetEmojiPos[i] = canvas.emoji[i].position.copy();
    offsetEmojiPos[i].add(offsetEmoji[i]); // offset to center of the emoji

    let distance = [];
    distance[i] = p5.Vector.dist(offsetEmojiPos[i], mousePos);
    if (distance[i] < canvas.emoji[i].h / 2) {
      canvas.emoji[i].position.x = mousePos.x - canvas.emoji[i].w / 2;
      canvas.emoji[i].position.y = mousePos.y - canvas.emoji[i].h / 2;
      //replay motions
      //canvas.textParticlesInLiquid.initialize(53, 80, 660, 0.5, 1, 0.5);
      canvas.resetSingerImage();
    }
  }
}
