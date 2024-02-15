class Logo {
  constructor(pg) {
    this.pg = pg;
  }

  play(lastSingerPicPosition, singerX) {
    if (this.playBlink(lastSingerPicPosition, singerX)) {
      if (frameCount % 60 < 30) {
        this.pg.image(logoColumn, 0, 0);
      }
      this.pg.image(logoNoColumn, 0, 0);
    } else {
      this.pg.image(logo, 0, 0);
    }
  }

  playBlink(lastSingerPicPosition, singerX) {
    return lastSingerPicPosition < singerX + 30;
  }
}
