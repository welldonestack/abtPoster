class Icon {
  constructor(pg, posterW, posterH, emojiClass) {
    this.pg = pg;
    this.icon = [];
    this.iconInitialPos = [];
    this.iconTarget = [];
    this.iconW = 35 * 1.5;
    this.iconH = 39 * 1.5;

    for (let i = 0; i < 3; i++) {
      this.iconInitialPos[i] = createVector(
        emojiClass.emojiTarget[i].x - emojiClass.emoji[i].w / 2 - this.iconW,
        emojiClass.emojiTarget[i].y - emojiClass.emoji[i].h / 2 + this.iconH / 2.5
      );
    }

    for (let i = 0; i < 3; i++) {
      this.icon[i] = new Vehicle(
        this.iconInitialPos[i].x,
        this.iconInitialPos[i].y,
        this.iconW,
        this.iconH
      );
    }

    this.iconTarget[0] = createVector(
      this.iconInitialPos[0].x - this.iconW * 0.7,
      this.iconInitialPos[0].y
    ); //same y
    this.iconTarget[1] = createVector(
      this.iconInitialPos[1].x,
      this.iconInitialPos[1].y + this.iconH * 0.7
    ); //same x
    this.iconTarget[2] = createVector(
      this.iconInitialPos[2].x - this.iconW * 0.13,
      this.iconInitialPos[2].y + this.iconH * 0.02
    ); //same x,y
  }

  play() {
    for (let i = 0; i < this.icon.length; i++) {
      this.icon[i].arrive(this.iconTarget[i]);
      this.icon[i].update();
      this.icon[i].show(this.pg, iconPic[i], this.w, this.h, this.alphaValue);
      this.icon[i].checkEdges(
        this.iconInitialPos[i].x,
        this.iconInitialPos[i].y,
        this.iconTarget[i].x + 1,
        this.iconTarget[i].y - 1
      );
    }
  }
}
