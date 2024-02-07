class TextParticlesInLiquid extends TextParticles {
  constructor(singer) {
    super(singer);
    this.liquid = [];
    this.liquid[0] = new Liquid(0, 470, width, height / 9, 0.02, -0.3, 0.6);
    this.liquid[1] = new Liquid(
      0,
      460 + height / 9,
      width,
      height / 9,
      0.02,
      2.2,
      1.3
    );
    this.liquid[2] = new Liquid(
      500,
      0,
      width - 500,
      height / 2,
      0.009,
      -1.1,
      0.6
    );
    this.liquid[3] = new Liquid(
      450,
      height / 4 - 100,
      width - 500,
      height / 4,
      0.009,
      -0.9,
      0.5
    );
  }

  applyLiquid(pg) {
    for (let i = 0; i < this.numbOfSingers; i++) {
      for (let j = 0; j < this.textToPoints[i].length; j++) {
        // Is the Mover in the liquid?
        for (let k = 0; k < this.liquid.length; k++) {
          if (this.liquid[k].contains(this.mover[i][j])) {
            // Calculate drag force
            let dragForce = this.liquid[k].calculateDrag(this.mover[i][j]);
            // Apply drag force to Mover
            this.mover[i][j].applyForce(dragForce);
            // Apply force that drags particle inside the window to the right
            let force = this.liquid[k].additionalForce(this.mover[i][j]);
            this.mover[i][j].applyForce(force);
          }
        }
      }
    }
  }
}
