class Emoji {
  constructor(pg, posterW, posterH) {
    this.pg = pg;
    this.emoji = [];
    this.emojiTarget = [];

    this.emoji[0] = new Vehicle(216 + 109 / 2, 47 + 89 / 2, 109, 89); // begins at logo ":T"
    this.emoji[1] = new Vehicle(posterW + 109 / 2, 630 + 109 / 2, 89, 109);
    this.emoji[2] = new Vehicle(posterW + 109 / 2, 30 + 109 / 2, 89, 109);
    this.emojiTarget[0] = createVector(
      posterW - this.emoji[0].w / 2,
      180 + this.emoji[0].h / 2
    ); // middle
    this.emojiTarget[1] = createVector(
      posterW - this.emoji[1].w / 2,
      630 + this.emoji[1].h / 2
    ); // bottom
    this.emojiTarget[2] = createVector(
      posterW - this.emoji[2].w / 2,
      30 + this.emoji[2].h / 2
    ); //  top

    this.toggle = false;
  }

  play(toggle) {
    this.lightSwitch(toggle);

    for (let i = 0; i < this.emoji.length; i++) {
      this.emoji[i].arrive(this.emojiTarget[i]);
      this.emoji[i].update();
      this.emoji[i].show(this.pg, emojiPic[i], this.w, this.h, this.alphaValue);
    }
  }

  lightSwitch(toggle) {
    if (toggle) {
      this.emoji[2].alphaValue = 255;
    }
  }
}
