class Canvas {
  constructor(posterW, posterH) {
    this.posterW = posterW;
    this.posterH = posterH;

    this.pg1a = createGraphics(this.posterW, this.posterH);
    this.pg1b = createGraphics(this.posterW, this.posterH);
    this.canvas1 = createGraphics(this.posterW, this.posterH);
    this.pg2a = createGraphics(this.posterW, this.posterH);
    this.pg2b = createGraphics(this.posterW, this.posterH);
    this.canvas2 = createGraphics(posterW, posterH - 282);
    this.pg3a = createGraphics(this.posterW, this.posterH);
    this.pg3b = createGraphics(this.posterW, this.posterH);
    this.canvas3 = createGraphics(this.posterW, this.posterH);

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

    this.emoji = [];
    this.emojiTarget = [];
    this.emoji[0] = new Vehicle(216, 47, 109, 89); // begins at logo ":T"
    this.emoji[1] = new Vehicle(this.posterW, 630, 89, 109);
    this.emoji[2] = new Vehicle(this.posterW, 30, 89, 109);
    this.emojiTarget[0] = createVector(this.posterW - this.emoji[0].w, 180); // middle
    this.emojiTarget[1] = createVector(this.posterW - this.emoji[1].w, 630); // bottom
    this.emojiTarget[2] = createVector(this.posterW - this.emoji[2].w, 30); //  top

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
      )
    }
  }

  // display all canvas
  show() {
    //load layers
    this.pg1(); // layers of pg1 (text beneath the window)
    this.pg2(); // layers of pg2 (text above the window)
    this.pg3(); // layers of pg3 (emoji:T) & singer's list fixed position

    //merging pages to canvas
    this.canvas1.image(this.pg1a, 0, 0); // text
    this.canvas1.image(this.pg1b, 0, 0); // beneath the window
    this.canvas2.image(this.pg2a, 0, 0); // window
    this.canvas2.image(this.pg2b, 0, 0); // beneath the text
    this.canvas3.clear();
    this.canvas3.image(this.pg3a, 0, 0); // :T
    this.canvas3.image(this.pg3b, 0, 0); // fixed singers list

    //layering pg3 above pg2. and pg2 above the pg1
    push();
    imageMode(CENTER);
    translate(width / 2, height / 2);
    image(this.canvas1, 0, 0);
    pop();
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
    push();
    imageMode(CENTER);
    translate(width / 2, height / 2);
    image(this.canvas3, 0, 0);
    pop();
  }

  pg1() {
    // layers of pg1 (text beneath the window)
    this.pg1a.clear();
    this.pg1a.image(gradientBackground, 0, 0);
    this.textParticlesInLiquid.applyLiquid(this.pg1a);
    this.textParticlesInLiquid.run(this.pg1a);
    // also contains images of singers
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
    this.pg1b.clear();
    this.pg1b.tint(255, 230);
    this.pg1b.image(transparentWindow, 0, 0);
  }
  pg2() {
    // layers of pg2 (text above the window)
    this.pg2a.clear();
    this.pg2a.image(gradientBackground, 0, 0);
    this.pg2b.clear();
    this.pg2b.tint(255, 230);
    this.pg2b.image(transparentWindow, 0, 0);
    this.textParticlesInLiquid.applyLiquid(this.pg2b);
    this.textParticlesInLiquid.run(this.pg2b);
  }
  pg3() {
    this.pg3a.clear();
    // emojis
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

    // fixed singers list
    this.pg3b.clear();
    this.singerList.run(this.pg3b, 150);

    // ABT logo
    if (this.playBlink()) {
      if (frameCount % 60 < 30) {
        this.pg3b.image(logoColumn, 0, 0);
      }
      this.pg3b.image(logoNoColumn, 0, 0);
    } else {
      this.pg3b.image(logo, 0, 0);
    }
  }

  playImage() {
    return this.emoji[0].position.x > this.posterW - 125;
  }

  playBlink() {
    return (
      this.singerPic[singersPic.length - 1].position.x < this.singerPicX + 30
    );
  }
}
