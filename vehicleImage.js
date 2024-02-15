class VehicleImage extends Vehicle {
  constructor(x, y, maxspeed, alphaValue) {
    super(x, y);

    this.w = 411; // singerpic size
    this.h = 154; // singerpic size

    this.alphaValue = alphaValue;
    this.maxspeed = maxspeed;
    this.maxforce = 15;
    this.dampingPoint = 600;
  }
  
  show(pg, emoji, alphaValue) {
    // Draw a triangle rotated in the direction of velocity
    // let angle = this.velocity.heading();
    pg.push();
    pg.translate(this.position.x, this.position.y);
    // pg.rotate(angle);
    pg.tint(255, this.alphaValue);
    pg.image(emoji, 0, 0, this.w, this.h);
    pg.pop();
  }
}
