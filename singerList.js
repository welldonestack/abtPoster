class SingerList {
  constructor() {
    this.singerList = [
      "PEGGY GOU",
      "ROMY",
      "RHYE",
      "PARCELS",
      "JAMIE XX",
      "AND MORE",
    ];
    this.textParticlesInLiquid = new TextParticlesInLiquid(this.singerList);
    this.textParticlesInLiquid.initialize(53, 80, 660, 0.5, 1, 0.5);
    this.textParticlesSingerList = new TextParticlesSingerList(this.singerList);
    this.textParticlesSingerList.initialize(53, 80, 660, 0.5, 1, 0.5);
  }

  play(pg) {
    this.textParticlesInLiquid.applyLiquid(pg);
    this.textParticlesInLiquid.run(pg);
  }
  
  initialize(){
  this.textParticlesInLiquid.initialize(53, 80, 660, 0.5, 1, 0.5);
  }
}
