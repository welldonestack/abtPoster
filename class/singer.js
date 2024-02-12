class Singer {
  constructor(pg, posterW, posterH) {
    this.pg = pg;
    this.singer = [];
    this.singerTarget = [];

    this.singerX = 26;
    this.singerY = 503;

    for (let i = 0; i < singersPic.length; i++) {
      this.singerTarget[i] = createVector(this.singerX, this.singerY);
    }
    if (mouseIsPressed) {
      shuffle(singersPic, true); // shuffles the image sequence
    }
    for (let i = 0; i < singersPic.length; i++) {
      this.singer.push(
        new VehicleImage(
          posterW + 500 + 1300 * i,
          this.singerY,
          80 + i * 10,
          255 - 35 * i
        )
      );
    }
  }

  play() {
    // if (this.playImage(emojiPosition, emojiTarget)) {

    for (let i = 0; i < this.singer.length; i++) {
      this.singer[i].arrive(this.singerTarget[i]);
      this.singer[i].update();
      this.singer[i].show(
        this.pg,
        singersPic[i],
        this.w,
        this.h,
        this.alphaValue
      );
    }
  }
  // }

  playWhen(emojiPosition, emojiTarget) {
    // singer only starts to play when emoji[0] is close to the target
    // at the same time when the emoji[0] has not arrived at target yet
    // last OR statement prevents image play stopping when singer has arrived
    // at the target.
    return (
      (emojiPosition > emojiTarget - 20 &&
        int(emojiPosition) != int(emojiTarget)) ||
      int(this.singer[0].position.x) < int(this.singerX + 50)
    );
  }

  initialize() {
    if (mouseIsPressed) {
      shuffle(singersPic, true); // shuffles the image sequence
    }
    for (let i = 0; i < singersPic.length; i++) {
      this.singer[i].position.x = posterW + 500 + 1300 * i;
      this.singer[i].position.y = this.singerY;
      this.singer[i].maxspeed = 80 + i * 10;
      this.singer[i].alphaValue = 255 - 35 * i;
    }
  }
}
