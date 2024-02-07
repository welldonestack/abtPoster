class Mover {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();
    
    // this.lifeSpan = 255;
  }

  applyForce(force) {
    let f = force.copy();
    this.acceleration.add(f);
  }
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    
    // this.lifeSpan -=0.8;
  }
  show(pg, alphaValue) {
    pg.noStroke();
    pg.fill(255,alphaValue);
    pg.circle(this.position.x, this.position.y, 2);
  }
  checkEdges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }
}
