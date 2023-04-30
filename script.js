
class StudioScene extends Phaser.Scene {
    // Gives scene unique label
    constructor(){
        super('studio_scene');
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('studio_logo', 'LuciousLightLogo.png');
        this.load.image('fullscreen_img', 'fullscreen.png');
    }
    create(){
        this.graphics = this.add.graphics();

        let fullscreen_button = this.add.img(400, 0, 'fullscreen_img',).setInteractive();
 
        fullscreen_button.on('pointerup', function(){
            if(!this.scale.isFullscreen){
                this.scale.startFullscreen();
            }
        }, this);

        // add studio logo
        this.imageObject = this.add.image(
            275, // x
            250, // y
            'studio_logo',
        );
        this.imageObject.setScale(0.33) // resize to 33% of original size


    }
    update(){

    }
}

class TitleScene extends Phaser.Scene {
    // Gives scene unique label
    constructor(){
        super('title_scene');
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('game_title', 'TheNarrowRoadLogo.png');
    }
    create(){
        this.graphics = this.add.graphics();
    }
    update(){

    }
}

let config = {
    type: Phaser.WEBGL,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "cinematic",
        width: 500,
        height: 500,
    },
    backgroundColor: 0x000000,
    scene: [StudioScene, TitleScene],
}

let game = new Phaser.Game(config);