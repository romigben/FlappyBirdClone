var gameOptions = {
 
    // Player gravity
    birdGravity: 800,
 
    // Horizontal bird speed
    birdSpeed: 125,
 
    // Flap thrust
    birdFlapPower: 300,
 
    // Minimum pipe height, in pixels. Affects hole position
    minPipeHeight: 40, 
 
    // Distance range from next pipe, in pixels
    pipeDistance: [220, 280],
 
    // Space between pipes, in pixels
    pipeHole: [100, 150], 
 
    // Local storage object name for points
    localStorageName: 'bestFlappyScore'
}

var config = {
    width: 800,
    height: 600,
    backgroundColor: 0x87ceeb,
    scene: [Scene1, Scene2],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
}

var game = new Phaser.Game(config);