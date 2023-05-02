
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

        // add fullscreen button
        let fullscreen_img = this.add.image(475, 25, 'fullscreen_img',).setInteractive();
        fullscreen_img.setScale(0.1); // resize to 10% of original size

        // functionality of the fullscreen button
        fullscreen_img.on('pointerup', function(){
            if(!this.scale.isFullscreen){
                this.scale.startFullscreen();
            }
        }, this);

        // add studio logo
        let studio_logo = this.add.image(275, 250, 'studio_logo',);
        studio_logo.setScale(0.33); // resize to 33% of original size

        // add transition
        this.graphics.fillStyle(0xFFFFFF, 1); // color, opacity
        let white_rect = this.graphics.fillRect(0, 0, 500, 500);

        studio_logo.alpha = 0; 
        fullscreen_img.alpha = 0; 
        white_rect.alpha = 0;
        white_rect.depth = 10; // ensures rectangle is on top of everything

        // have the screen fade in for 4 sceonds
        this.tweens.add({
            targets: [studio_logo, fullscreen_img],
            alpha: 1,
            duration: 4000,
            ease: 'Linear',
            repeat: 0,
        });

        // Delay this event by 4 seconds
        this.time.addEvent({
            delay: 4000,
            callback: ()=>{
                // create star 
                let star = this.add.star(200, 200, 5, 3, 6, 0xFFFFFF);
            
                // have the star pop in
                this.tweens.add({
                targets: star,
                scaleX: 3,
                scaleY: 3,
                angle: 300,
                duration: 2000,
                ease: 'Bounce',
                repeat: 0,
                });
            },
            loop: false,
        });

        // have the screen fade out to white(1 second after all animations)
        this.tweens.add({
            targets: white_rect,
            delay: 7000,
            alpha: 1,
            duration: 1000,
            ease: 'Linear',
            repeat: 0,
        });
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