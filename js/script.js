class ExampleScene extends Phaser.Scene {
  preload() {}
  create() {}
  update() {}
  ball;
  preload() {
    this.load.image("ball", "js/img/ball.png");
  }
   create() {
    this.ball = this.add.sprite(50, 50, "ball");
  }
  
}

const config = {
  type: Phaser.CANVAS,
  width: 480,
  height: 320,
  scene: ExampleScene,
    scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: "#eeeeee",

};

const game = new Phaser.Game(config);