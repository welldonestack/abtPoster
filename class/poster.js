class Poster {
  constructor() {
    this.toggle = false;
    this.createLayers(posterW, posterH);
    this.singerList = new SingerList();
    this.emoji = new Emoji(this.pg3a, posterW, posterH);
    this.singer = new Singer(this.pg1a, posterW, posterH);
    this.logo = new Logo(this.pg3b);
    this.icon = new Icon(this.pg3a, posterW, posterH, this.emoji);
  }

  // display all poster
  show() {
    this.mergedCanvas1();
    this.mergedCanvas2();
    this.mergedCanvas3();
  }
  
  createLayers() {
    this.pg1a = createGraphics(posterW, posterH);
    this.pg1b = createGraphics(posterW, posterH);
    this.poster1 = createGraphics(posterW, posterH);
    this.pg2a = createGraphics(posterW, posterH);
    this.pg2b = createGraphics(posterW, posterH);
    this.poster2 = createGraphics(posterW, posterH - 282);
    this.pg3a = createGraphics(posterW, posterH);
    this.pg3b = createGraphics(posterW, posterH);
    this.poster3 = createGraphics(posterW, posterH);
  }
  bgGradientLayer(pg) {
    pg.clear();
    pg.image(bgGradient, 0, 0);
  }
  bgClearWindowLayer(pg) {
    pg.clear();
    pg.tint(255, 230);
    pg.image(bgClearWindow, 0, 0);
    if (this.toggle) {
      this.slitEffect(pg, bgClearWindow, 89);
    }
  }

  mergedCanvas1() {
    this.pg1(); // layers of pg1 (text beneath the window)
    this.poster1.image(this.pg1a, 0, 0); // text
    this.poster1.image(this.pg1b, 0, 0); // beneath the window
    push();
    imageMode(CENTER);
    translate(width / 2, height / 2);
    image(this.poster1, 0, 0);
    pop();
  }
  mergedCanvas2() {
    this.pg2(); // layers of pg2 (text above the window)
    this.poster2.image(this.pg2a, 0, 0); // window
    this.poster2.image(this.pg2b, 0, 0); // beneath the text
    push();
    imageMode(CENTER);
    translate(width / 2, height / 2);
    let adjustedHeight = (this.poster1.height - this.poster2.height) / 2;
    //make pg2 transparent so the vehicleImages on pg1 could be seen
    if (
      this.singer.playWhen(
        this.emoji.emoji[0].position.x,
        this.emoji.emojiTarget[0].x
      )
    ) {
      tint(255, 0);
    }
    image(this.poster2, 0, -adjustedHeight);
    pop();
  }
  mergedCanvas3() {
    this.pg3(); // layers of pg3 (emoji:T) & singer's list fixed position
    this.poster3.clear();
    this.poster3.image(this.pg3a, 0, 0); // :T
    this.poster3.image(this.pg3b, 0, 0); // fixed singers list
    push();
    imageMode(CENTER);
    translate(width / 2, height / 2);
    image(this.poster3, 0, 0);
    pop();
  }

  pg1() {
    // layers of pg1 (text beneath the window)
    this.bgGradientLayer(this.pg1a);
    this.singerList.play(this.pg1a);

    if (
      this.singer.playWhen(
        this.emoji.emoji[0].position.x,
        this.emoji.emojiTarget[0].x
      )
    ) {
      this.singer.play();
    }
    this.bgClearWindowLayer(this.pg1b);
  }
  pg2() {
    // layers of pg2 (text above the window)
    this.bgGradientLayer(this.pg2a);
    this.bgClearWindowLayer(this.pg2b);
    this.singerList.play(this.pg2b);
  }
  pg3() {
    this.pg3a.clear();
    this.emoji.play(this.toggle);
    // fixed singers list
    this.pg3b.clear();
    this.singerList.textParticlesSingerList.run(this.pg3b, 150);
    this.logo.play(
      this.singer.singer[singersPic.length - 1].position.x,
      this.singer.singerX
    );
    this.icon.play();
  }
  
  slitEffect(pg, img, w) {
    let slitW = w;
    let wave1 = int(map(sin(radians(frameCount * 0.76)), -1, 1, 0, pg.width));
    let wave2 = int(
      map(tan(radians(frameCount / 1.5)), -1, 1, 0, pg.width + slitW * 5)
    );
    let wave3 = int(map(sin(radians(frameCount * 0.76)), -1, 1, 0, pg.width));

    let sx = wave1;
    let sy = 0;
    let sw = posterW;
    let sh = posterH;

    let dx = wave2;
    let dy = 0;
    let dw = posterW;
    let dh = posterH;

    let sx1 = wave3;
    let sy1 = 0;
    let sw1 = posterW;
    let sh1 = posterH;

    let dx1 = wave1;
    let dy1 = 0;
    let dw1 = posterW;
    let dh1 = posterH;

    for (let i = 0; i < posterW / slitW; i++) {
      pg.copy(img, sx, sy, sw, sh, dx + i * slitW, dy, dw, dh);
    }

    for (let i = 0; i < posterW / slitW; i++) {
      pg.copy(
        img,
        sx1,
        sy1,
        sw1,
        sh1,
        dx1 / 1.5 + (i / 2) * slitW,
        dy1,
        dw1,
        dh1
      );
    }
  }
}
