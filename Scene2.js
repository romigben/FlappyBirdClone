class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        this.background = this.add.tileSprite(0,0, config.width, config.height, "background");
        this.background.setOrigin(0,0);

        this.background = this.add.tileSprite(0,0, config.width*2, config.height+120, "clouds");

        this.background = this.add.tileSprite(0,0, config.width*2, 50, "bush");
        this.background.setOrigin(0,-10);

        this.background = this.add.tileSprite(0, 0, config.width *2, 50, "ground");
        this.background.setOrigin(0,-11);

        this.pipeGroup = this.physics.add.group();
        this.pipePool = [];
        for(let i = 0; i < 4; i++){
            this.pipePool.push(this.pipeGroup.create(0, 0, 'pipeTop'));
            this.pipePool.push(this.pipeGroup.create(0, 0, 'pipeDown'));
            this.placePipes(false);
        }
        this.pipeGroup.setVelocityX(-gameOptions.birdSpeed);
        this.bird = this.physics.add.sprite(80, config.height / 2, 'bird');
        this.bird.body.gravity.y = gameOptions.birdGravity;

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.dieSound = this.sound.add("audio_die");
        this.pointSound = this.sound.add("audio_point");
        this.jumpSound = this.sound.add("audio_jump");
        this.music = this.sound.add("music");

        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 15,
            loop: false,
            delay: 0
        }
        this.music.play(musicConfig);

        this.score = 0;
        this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
        this.scoreText = this.add.text(10, 10, '');
        this.updateScore(this.score);

        
    }

    update() {
        this.background.tilePositionX += 0.5;

        this.physics.world.collide(this.bird, this.pipeGroup, function(){
            this.die();
        }, null, this);

        if(this.bird.y > config.height || this.bird.y < 0){
            this.die();
        }

        if(this.bird.angle < 20) {
            this.bird.angle += 1;
        }

        this.pipeGroup.getChildren().forEach(function(pipe){
            if(pipe.getBounds().right < 0){
                this.pipePool.push(pipe);
                if(this.pipePool.length == 2){
                    this.placePipes(true);
                }
            }
        }, this)
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
                this.flap();
        }
    }

    flap() {
        this.bird.body.velocity.y = -gameOptions.birdFlapPower;
        var tween = this.tweens.add({
            targets: this.bird,
            angle: -20,
            duration: 50,
            repeat: 0,
            callbackScope: this
        });
        this.jumpSound.play();
    }

    placePipes(addScore) {
        let rightmost = this.getRightmostPipe();
        let pipeHoleHeight = Phaser.Math.Between(gameOptions.pipeHole[0], gameOptions.pipeHole[1]);
        let pipeHolePosition = Phaser.Math.Between(gameOptions.minPipeHeight + pipeHoleHeight / 2, config.height - gameOptions.minPipeHeight - pipeHoleHeight / 2);
        this.pipePool[0].x = rightmost + this.pipePool[0].getBounds().width + Phaser.Math.Between(gameOptions.pipeDistance[0], gameOptions.pipeDistance[1]);
        this.pipePool[0].y = pipeHolePosition - pipeHoleHeight / 2;
        this.pipePool[0].setOrigin(0, 1);
        this.pipePool[1].x = this.pipePool[0].x;
        this.pipePool[1].y = pipeHolePosition + pipeHoleHeight / 2;
        this.pipePool[1].setOrigin(0, 0);
        this.pipePool = [];
        if(addScore){
            this.updateScore(1);
        }
    }
    getRightmostPipe() {
        let rightmostPipe = 0;
        this.pipeGroup.getChildren().forEach(function(pipe){
            rightmostPipe = Math.max(rightmostPipe, pipe.x);
        });
        return rightmostPipe;
    }
    updateScore(inc) {
        this.score += inc;
        this.scoreText.text = 'Score: ' + this.score + '\nBest: ' + this.topScore;
        if (this.score > 0) {
            this.pointSound.play();
        }
        
    }
    
    die() {
        localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore));
        this.game.sound.stopAll();
        this.dieSound.play();
        this.scene.start('playGame');
    }
}