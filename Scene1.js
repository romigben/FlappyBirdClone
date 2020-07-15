class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image("background", "assets/images/background.png");
        this.load.image("bush", "assets/images/bush.png");
        this.load.image("clouds", "assets/images/clouds.png");
        this.load.image("ground", "assets/images/ground.png");
        this.load.image("bird", "assets/images/bird.png");
        this.load.image("pipeTop", "assets/images/pipe_top.png");
        this.load.image("pipeDown", "assets/images/pipe_bottom.png");
        this.load.audio("music", ["assets/sounds/minecraft_peaceful_music.mp3"]);
        this.load.audio("audio_die", ["assets/sounds/die.mp3"]);
        this.load.audio("audio_point", ["assets/sounds/point.mp3"]);
        this.load.audio("audio_jump", ["assets/sounds/wing.mp3"]);
    }
    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("playGame");
    }
}