// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Liquid {
  constructor(x, y, w, h, c, xforce, yforce) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.xforce = xforce;
    this.yforce = yforce;
  }

  // Is the Mover in the Liquid?
  contains(mover) {
    let pos = mover.position;
    return (
      pos.x > this.x &&
      pos.x < this.x + this.w &&
      pos.y > this.y &&
      pos.y < this.y + this.h
    );
  }

  // Calculate drag force
  calculateDrag(mover) {
    // Magnitude is coefficient * speed squared
    let speed = mover.velocity.mag();
    let dragMagnitude = this.c * speed * speed;

    // Direction is inverse of velocity
    let dragForce = mover.velocity.copy();
    dragForce.mult(-1);

    // Scale according to magnitude
    dragForce.setMag(dragMagnitude);
    return dragForce;
  }
  
  additionalForce(xforce, yforce){
    let additionalForce = createVector(this.xforce, this.yforce);
    return additionalForce;
  }

  show() {
    noStroke();
    fill(220,10);
    rect(this.x, this.y, this.w, this.h);
  }
}
