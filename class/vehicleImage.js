class VehicleImage extends Vehicle {
  constructor(x, y, maxspeed, alphaValue) {
    super(x, y);

    this.w = 411;
    this.h = 154;

    this.alphaValue = alphaValue;
    this.maxspeed = maxspeed;
    this.maxforce = 15;
    this.dampingPoint = 600;
  }
}
