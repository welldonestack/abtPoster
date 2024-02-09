// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// The "Vehicle" class

class Vehicle {
  constructor(x, y, w, h) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.position = createVector(x, y);

    this.w = w;
    this.h = h;

    this.alphaValue = 70;
    this.maxspeed = 20;
    this.maxforce = 10;
    this.dampingPoint = 250;
  }

  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  arrive(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    let d = desired.mag();
    // Scale with arbitrary damping within 100 pixels
    if (d < this.dampingPoint) {
      let m = map(d, 0, this.dampingPoint, 0, this.maxspeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxspeed);
    }
    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    this.applyForce(steer);
  }

  show(pg, emoji, alphaValue) {
    // Draw a triangle rotated in the direction of velocity
    let angle = this.velocity.heading();
    pg.push();
    pg.translate(this.position.x, this.position.y);
    // pg.rotate(angle);
    pg.tint(255, this.alphaValue);
    pg.image(emoji, 0, 0, this.w, this.h);
    pg.pop();
  }

  
}
