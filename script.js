class StudioScene extends Phaser.Scene {
    // Gives scene unique label
    constructor(){
        super('studio_scene');
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('studio_logo', 'LuciousLightLogo.png');
    }
    create(){
        this.graphics = this.add.graphics();

        this.imageObject = this.add.image(
            400, // x
            2000, // y
            'studio_logo',
        );
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
    width: 800,
    height: 800,
    backgroundColor: 0xFFFFFF,
    scene: [StudioScene, TitleScene],
}

let game = new Phaser.Game(config);