class Canvas {
  constructor(posterW, posterH) {
    this.posterW = posterW;
    this.posterH = posterH;
    this.createLayers(this.posterW, this.posterH);
    this.initializeSingerList();
    this.initializeEmoji(this.posterW, this.posterH);
    this.resetSingerImage();
  }

  // display all canvas
  show() {
    this.mergedCanvas1();
    this.mergedCanvas2();
    this.mergedCanvas3();
  }

  pg1() {
    // layers of pg1 (text beneath the window)
    this.bgGradientLayer(this.pg1a);
    this.singerListPlay(this.pg1a);
    this.singerPicPlay();
    this.bgClearWindowLayer(this.pg1b);
  }

  pg2() {
    // layers of pg2 (text above the window)
    this.bgGradientLayer(this.pg2a);
    this.bgClearWindowLayer(this.pg2b);
    this.singerListPlay(this.pg2b);
  }

  pg3() {
    this.pg3a.clear();
    this.emojiPlay();
    // fixed singers list
    this.pg3b.clear();
    this.singerList.run(this.pg3b, 150);
    this.logoPlay();
  }

  
  resetSingerImage() {
    // controls the concert image animation
    this.singerPicX = 26;
    this.singerPicY = 503;
    this.singerPic = [];
    for (let i = 0; i < singersPic.length; i++) {
      this.singerPic.push(
        new VehicleImage(
          this.posterW + 500 + 1300 * i,
          this.singerPicY,
          80 + i * 10,
          255 - 35 * i
        )
      );
    }
  }

  emojiPlay() {
    for (let i = 0; i < this.emoji.length; i++) {
      this.emoji[i].arrive(this.emojiTarget[i]);
      this.emoji[i].update();
      this.emoji[i].show(
        this.pg3a,
        emojiPic[i],
        this.w,
        this.h,
        this.alphaValue
      );
    }
  }

  logoPlay() {
    if (this.playBlink()) {
      if (frameCount % 60 < 30) {
        this.pg3b.image(logoColumn, 0, 0);
      }
      this.pg3b.image(logoNoColumn, 0, 0);
    } else {
      this.pg3b.image(logo, 0, 0);
    }
  }

  singerPicPlay() {
    if (this.playImage()) {
      for (let i = 0; i < singersPic.length; i++) {
        let singerPicTarget = createVector(this.singerPicX, this.singerPicY);
        this.singerPic[i].arrive(singerPicTarget);
        this.singerPic[i].update();
        this.singerPic[i].show(
          this.pg1a,
          singersPic[i],
          this.w,
          this.h,
          this.alphaValue
        );
      }
    }
  }

  singerListPlay(pg) {
    this.textParticlesInLiquid.applyLiquid(pg);
    this.textParticlesInLiquid.run(pg);
  }

  bgGradientLayer(pg) {
    pg.clear();
    pg.image(bgGradient, 0, 0);
  }

  bgClearWindowLayer(pg) {
    pg.clear();
    pg.tint(255, 230);
    pg.image(bgClearWindow, 0, 0);
  }
  
  playImage() {
    return (
      this.emoji[0].position.x > this.emojiTarget[0].x - 10 ||
      this.emoji[1].position.x < this.emojiTarget[1].x + 10 ||
      this.emoji[2].position.x < this.emojiTarget[2].x + 10
    );
  }

  playBlink() {
    return (
      this.singerPic[singersPic.length - 1].position.x < this.singerPicX + 30
    );
  }

  createLayers(posterW, posterH) {
    this.pg1a = createGraphics(posterW, posterH);
    this.pg1b = createGraphics(posterW, posterH);
    this.canvas1 = createGraphics(posterW, posterH);
    this.pg2a = createGraphics(posterW, posterH);
    this.pg2b = createGraphics(posterW, posterH);
    this.canvas2 = createGraphics(posterW, posterH - 282);
    this.pg3a = createGraphics(posterW, posterH);
    this.pg3b = createGraphics(posterW, posterH);
    this.canvas3 = createGraphics(posterW, posterH);
  }
  initializeEmoji(posterW, posterH) {
    this.emoji = [];
    this.emojiTarget = [];
    this.emoji[0] = new Vehicle(216, 47, 109, 89); // begins at logo ":T"
    this.emoji[1] = new Vehicle(posterW, 630, 89, 109);
    this.emoji[2] = new Vehicle(posterW, 30, 89, 109);
    this.emojiTarget[0] = createVector(posterW - this.emoji[0].w, 180); // middle
    this.emojiTarget[1] = createVector(posterW - this.emoji[1].w, 630); // bottom
    this.emojiTarget[2] = createVector(posterW - this.emoji[2].w, 30); //  top
  }
  initializeSingerList() {
    this.singerList = [
      "PEGGY GOU",
      "ROMY",
      "RHYE",
      "PARCELS",
      "JAMIE XX",
      "AND MORE",
    ];
    this.textParticlesInLiquid = new TextParticlesInLiquid(this.singerList);
    this.textParticlesInLiquid.initialize(53, 80, 660, 0.5, 1, 0.5);
    this.singerList = new SingerList(this.singerList);
    this.singerList.initialize(53, 80, 660, 0.5, 1, 0.5);
  }

  mergedCanvas1() {
    this.pg1(); // layers of pg1 (text beneath the window)
    this.canvas1.image(this.pg1a, 0, 0); // text
    this.canvas1.image(this.pg1b, 0, 0); // beneath the window
    push();
    imageMode(CENTER);
    translate(width / 2, height / 2);
    image(this.canvas1, 0, 0);
    pop();
  }
  mergedCanvas2() {
    this.pg2(); // layers of pg2 (text above the window)
    this.canvas2.image(this.pg2a, 0, 0); // window
    this.canvas2.image(this.pg2b, 0, 0); // beneath the text
    push();
    imageMode(CENTER);
    translate(width / 2, height / 2);
    let adjustedHeight = (this.canvas1.height - this.canvas2.height) / 2;
    //make pg2 transparent so the vehicleImages on pg1 could be seen
    if (this.playImage()) {
      tint(255, 0);
    }
    image(this.canvas2, 0, -adjustedHeight);
    pop();
  }
  mergedCanvas3() {
    this.pg3(); // layers of pg3 (emoji:T) & singer's list fixed position
    this.canvas3.clear();
    this.canvas3.image(this.pg3a, 0, 0); // :T
    this.canvas3.image(this.pg3b, 0, 0); // fixed singers list
    push();
    imageMode(CENTER);
    translate(width / 2, height / 2);
    image(this.canvas3, 0, 0);
    pop();
  }
}
