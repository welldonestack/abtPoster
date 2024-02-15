class TextParticles {
  constructor(singer) {
    this.singer = singer;
    this.numbOfSingers = this.singer.length;
    this.textToPoints = [];
    this.vectorTextToPoints = [];
    this.mover = [];
    this.points = [];
  }

  initialize(fontSize, x, y, resolution, ratioW, ratioH) {
    for (let i = 0; i < this.numbOfSingers; i++) {
      this.points[i] = font.textToPoints(
        this.singer[i],
        x,
        y + fontSize * (i + 1),
        fontSize,
        {
          sampleFactor: resolution,
        }
      );
      this.textToPoints.push(this.points[i]);
    }
    // creating 2D array form to push data
    for (let i = 0; i < this.numbOfSingers; i++) {
      this.vectorTextToPoints[i] = [];
      this.mover[i] = [];
      for (let j = 0; j < this.numbOfSingers; j++) {
        this.vectorTextToPoints[i][j];
        this.mover[i][j];
      }
    }
    // transform the data into PVector class.
    for (let i = 0; i < this.numbOfSingers; i++) {
      for (let j = 0; j < this.textToPoints[i].length; j++) {
        this.vectorTextToPoints[i].push(
          createVector(this.textToPoints[i][j].x, this.textToPoints[i][j].y)
        );
        // Mover class initialize assign each textToPoints' as a initial particle position.
        this.mover[i][j] = new Mover(
          this.vectorTextToPoints[i][j].x * ratioW,
          this.vectorTextToPoints[i][j].y * ratioH
        );
      }
    }
  }

  run(pg) {
    for (let i = 0; i < this.numbOfSingers; i++) {
      for (let j = 0; j < this.textToPoints[i].length; j++) {
        let force = createVector(0, 0.1);
        this.mover[i][j].applyForce(force);
        this.mover[i][j].update();
        this.mover[i][j].show(pg, 200);
        
        // this.mover[i][j].checkEdges(pg);
        
      }
    }
  }
}
