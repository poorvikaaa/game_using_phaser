class ExampleScene extends Phaser.Scene {
  ball;
  paddle;
  preload() {
    this.load.image("ball", "js/img/ball.png");
    this.load.image("paddle", "js/img/paddle.png");
  }

  create() {
    this.ball = this.physics.add.sprite(50, 50, "ball");
    this.ball.body.setVelocity(150, -150);
    this.ball.setBounce(1, 1);
    this.ball.setCollideWorldBounds(true);
    this.ball.body.setBounce(1);

    this.paddle = this.physics.add.sprite(
      this.scale.width * 0.5,
      this.scale.height - 25,
      "paddle"
    );
    this.paddle.setOrigin(0.5, 1);
    this.paddle.body.setImmovable(true);

    this.physics.add.collider(this.ball, this.paddle);
    this.physics.world.checkCollision.down = false;
  }

  update() {
    this.paddle.x = this.input.x || this.scale.width * 0.5;
    const ballIsOutOfBounds = !Phaser.Geom.Rectangle.Overlaps(
      this.physics.world.bounds,
      this.ball.getBounds(),
    );
    if (ballIsOutOfBounds) {
  // Game over logic
      alert("Game over!");
      location.reload();
}
  }
}

const config = {
  type: Phaser.CANVAS,
  width: 480,
  height: 320,
  scene: ExampleScene,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: "#eeeeee",
};

const game = new Phaser.Game(config);