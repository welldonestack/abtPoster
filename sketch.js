let record = false;
let poster,
  posterW = 596,
  posterH = 842;
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
  iconPic = [];
  for (let i = 0; i < 3; i++) {
    iconPic[i] = loadImage("img/icon" + i + ".png");
  }
}

function setup() {
  createCanvas(900, 900);
  poster = new Poster(posterW, posterH);
  // path = new Path(posterW);
  // noLoop();
}

function draw() {
  if (record) {
    if (frameCount === 1) {
      const capture = P5Capture.getInstance();
      capture.start({
        duration: 1000,
      });
    }
  }
  background(0);
  poster.show();
  // path.show();
  hover();
}

function keyPressed() {
  if (key === "s") {
    const capture = P5Capture.getInstance();
    capture.stop();
  }
}

function mouseDragged() {
  let offsetMouse = createVector(
    (width - posterW) / 2,
    (height - posterH) / 2
  );
  let mousePos = createVector(mouseX, mouseY);
  mousePos.sub(offsetMouse);

  let distance = [];
 for (let i = 0; i < poster.emoji.emoji.length; i++) {
    distance[i] = p5.Vector.dist(poster.emoji.emoji[i].position, mousePos);
  }

  if (distance[0] < poster.emoji.emoji[0].w / 2) {
    // poster.emoji[0].alphaValue = 255;

    let dragLimitX = poster.emoji.emojiTarget[0].x - poster.emoji.emoji[0].w / 2;
    poster.emoji.emoji[0].position.x = map(
      mousePos.x,
      0,
      posterW,
      dragLimitX,
      poster.emoji.emojiTarget[0].x
    );
    poster.emoji.emoji[0].position.y = poster.emoji.emojiTarget[0].y;
    //poster.textParticlesInLiquid.initialize(53, 80, 660, 0.5, 1, 0.5);
    poster.singer.initialize();
  }

  if (distance[1] < poster.emoji.emoji[1].w / 2) {
    // poster.emoji[1].alphaValue = 255;

    let dragLimitY = poster.emoji.emojiTarget[1].y + poster.emoji.emoji[1].h / 15;
    poster.emoji.emoji[1].position.x = poster.emoji.emojiTarget[1].x;
    poster.emoji.emoji[1].position.y = map(
      mousePos.y,
      0,
      posterH + poster.emoji.emoji[1].h * 1,
      poster.emoji.emojiTarget[1].y,
      dragLimitY
    );
    poster.singer.initialize();
    poster.singerList.initialize();
  }
}

function hover() {
  let offsetMouse = createVector((width - posterW) / 2, (height - posterH) / 2);
  let mousePos = createVector(mouseX, mouseY);
  mousePos.sub(offsetMouse);
  let distance = [];
  for (let i = 0; i < poster.emoji.emoji.length; i++) {
    distance[i] = p5.Vector.dist(poster.emoji.emoji[i].position, mousePos);
    if (distance[i] < poster.emoji.emoji[i].h / 2) {
      poster.emoji.emoji[i].alphaValue = 255;
      poster.icon.icon[i].alphaValue = 70;
    } else {
      poster.emoji.emoji[i].alphaValue = 70;
      poster.icon.icon[i].alphaValue = 0;
    }
  }
}

function mousePressed() {
  let offsetMouse = createVector(
    (width - posterW) / 2,
    (height - posterH) / 2
  );
  let mousePos = createVector(mouseX, mouseY);
  mousePos.sub(offsetMouse);

  let distance = [];
  for (let i = 0; i < poster.emoji.emoji.length; i++) {
    distance[i] = p5.Vector.dist(poster.emoji.emoji[i].position, mousePos);
  }

  if (distance[2] < poster.emoji.emoji[2].h / 2) {
    poster.emoji.emoji[2].alphaValue = 255;
    poster.toggle = !poster.toggle;
  }
}
