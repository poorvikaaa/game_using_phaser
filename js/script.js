class ExampleScene extends Phaser.Scene {
  ball;
  paddle;
  bricks;
  scoreText;
  score = 0;
  gameOver = false;
  preload() {
    this.load.image("ball", "js/img/ball.png");
    this.load.image("paddle", "js/img/paddle.png");
    this.load.image("brick", "js/img/bricks.png");
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
    this.initBricks();
    this.scoreText = this.add.text(5, 5, "Points: 0", {
      font: "18px Arial",
      color: "#0095dd",
    });
  }

  hitBrick(ball, brick) {
    brick.destroy();
    this.score += 10;
    this.scoreText.setText(`Points: ${this.score}`);
    
    if (this.bricks.countActive() === 0) {
      alert(`You Win! Final Score: ${this.score}`);
      location.reload();
    }
  }

  initBricks() {
    const bricksLayout = {
      width: 50,
      height: 20,
      count: {
        row: 3,
        col: 7,
      },
      offset: {
        top: 50,
        left: 60,
      },
      padding: 10,
    };
    this.bricks = this.add.group();
    for (let c = 0; c < bricksLayout.count.col; c++) {
      for (let r = 0; r < bricksLayout.count.row; r++) {
        const brickX = c * (bricksLayout.width + bricksLayout.padding) + bricksLayout.offset.left;
        const brickY = r * (bricksLayout.height + bricksLayout.padding) + bricksLayout.offset.top;

        const newBrick = this.add.sprite(brickX, brickY, "brick");
        this.physics.add.existing(newBrick);
        newBrick.body.setImmovable(true);
        this.bricks.add(newBrick);
      }
    }
    this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
  }

  update() {
    this.paddle.x = this.input.x || this.scale.width * 0.5;
    const ballIsOutOfBounds = !Phaser.Geom.Rectangle.Overlaps(
      this.physics.world.bounds,
      this.ball.getBounds(),
    );
    if (ballIsOutOfBounds && !this.gameOver) {
      this.gameOver = true;
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