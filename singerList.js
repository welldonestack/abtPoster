class SingerList extends TextParticles {
  constructor(singer) {
    super(singer);
  }

  run(pg, alphaValue) {
    for (let i = 0; i < this.numbOfSingers; i++) {
      for (let j = 0; j < this.textToPoints[i].length; j++) {
        this.mover[i][j].show(pg, alphaValue);
      }
    }
  }
}
