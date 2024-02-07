class Path {
  constructor(posterW) {
    // A path has a radius, how wide is it.
    //{!3} Picking some arbitrary values to initialize the path
    this.radius =60;
    this.x = ((width-posterW)/2)+posterW - this.radius
    this.start = createVector(this.x, height);
    //{!2} A path is only two points, start and end.
    this.end = createVector(this.x, 0);
  }

  //{!7} Display the path.
  show() {
    strokeWeight(this.radius * 2);
    stroke(0, 100);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
    strokeWeight(1);
    stroke(0);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}
