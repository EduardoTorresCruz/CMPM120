
class StudioScene extends Phaser.Scene {
    // gives scene unique label
    constructor(){
        super('studio_scene');
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('studio_logo', 'LuciousLightLogo.png');
        this.load.image('fullscreen_img', 'fullscreen.png');
        this.load.audio('chime', 'ChimeSFX.m4a');
        this.load.audio('warp', 'WarpSFX.m4a');
    }
    create(){
        this.graphics = this.add.graphics();

        // create chime audio
        let chime = this.sound.add('chime', {volume: 0.4}, {loop: false});

        // create chime audio
        let warp = this.sound.add('warp', {volume: 0.2}, {loop: false});

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

        // add transition(first creating white rectangle)
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

        // delay this event by 4 seconds
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

                // play chime
                chime.play();

                // have chime drown out
                this.tweens.add({
                    targets: chime,
                    volume: 0,
                    duration: 1500,
                    repeat: 0,
                    });
            },
            loop: false,
        });

        // delay this event by 7 seconds
        this.time.addEvent({
            delay: 7000,
            callback: ()=>{
                warp.play();
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

        // go to game scene after all that needs to occur in this studio scene(8 seconds)
        this.time.delayedCall(8000, () => {
            this.scene.start('game_scene');
        })
    }
    update(){

    }
}

class GameScene extends Phaser.Scene {
    // gives scene unique label
    constructor(){
        super('game_scene');
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('fullscreen_img', 'fullscreen.png');
        this.load.image('background_img', 'MountainsAtNight.png');
    }
    create(){
        this.graphics = this.add.graphics();

        // add background
        let background_img = this.add.image(300, 300, 'background_img',);
        background_img.setScale(0.25); // resize to 33% of original size

        // add fullscreen button
        let fullscreen_img = this.add.image(475, 25, 'fullscreen_img',).setInteractive();
        fullscreen_img.setScale(0.1); // resize to 10% of original size
        fullscreen_img.alpha = 0.5;

        // functionality of the fullscreen button
        fullscreen_img.on('pointerup', function(){
            if(!this.scale.isFullscreen){
                this.scale.startFullscreen();
            }
        }, this);

        // adds stickman
        this.graphics.fillStyle(0x000000, 1); // color, opacity
        let stickman_head = this.graphics.fillCircle(25, 460, 10);
        stickman_head.depth = 1;
        let stickman_body = this.add.line(0,0, 25, 470, 25, 500, 0x000000, 1);
        stickman_body.depth = 2;
        let stickman_arms = this.add.line(0,0, 25, 480, 45, 480, 0x000000, 1);
        stickman_body.depth = 3;
        let stickman_leg1 = this.add.line(0,0, 25, 490, 23, 510, 0x000000, 1);
        stickman_body.depth = 4;
        let stickman_leg2 = this.add.line(0,0, 29, 510, 26, 490, 0x000000, 1);
        stickman_body.depth = 4;

        // multi-line text
        let text = this.add.text(100, 50, "The road you're about to take is one of perseverance and suffering. Many will not find it and for the few that do, many will not see the end.");
        text.setWordWrapWidth(300);

        // slides the scene after a 3 seconds of delay
        this.tweens.add({
            delay: 3000,
            targets: background_img,
            duration: 8000,
            x: 130,
            ease: 'Linear',
            repeat: 0,
        });

        // fades text away after a 4 second delay
        this.tweens.add({
            delay: 4000,
            targets: text,
            duration: 10000,
            alpha: 0,
            ease: 'Linear',
            repeat: 0,
        });
        
        // delay this event by 3 seconds
        this.time.addEvent({
            delay: 3500,
            callback: ()=>{
                // make stickman invisible
                stickman_head.alpha = 0;
                stickman_body.alpha = 0;
                stickman_arms.alpha = 0;
                stickman_leg1.alpha = 0;
                stickman_leg2.alpha = 0;
            },
            loop: false,
        });

        // go to title scene after all that needs to occur in this studio scene(10 seconds)
        this.time.delayedCall(10000, () => {
            this.scene.start('title_scene');
        })
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
        this.load.audio('game_music', 'ForTheFallen.mp3');
    }
    create(){
        this.graphics = this.add.graphics();

        // add fullscreen button
        let fullscreen_img = this.add.image(475, 25, 'fullscreen_img',).setInteractive();
        fullscreen_img.setScale(0.1); // resize to 10% of original size
        fullscreen_img.alpha = 0.5;

        // functionality of the fullscreen button
        fullscreen_img.on('pointerup', function(){
            if(!this.scale.isFullscreen){
                this.scale.startFullscreen();
            }
        }, this);

        // add brownish background
        this.graphics.fillStyle(0xD3BBAF, 1); // color, opacity
        let brown_rect = this.graphics.fillRect(0, 0, 500, 500);
        brown_rect.depth = 0;

        // add game title
        let game_title = this.add.image(240, 100, 'game_title',);
        game_title.setScale(0.1); // resize to 33% of original size

        // create background audio loop
        let background_music = this.sound.add('game_music', {volume: 0.3}, {loop: true});
        background_music.loop = true;
        background_music.play();

        // create all text
        let play_text = this.add.text(-300, 170, "Play", {
            fontFamily: 'Ariel',
            fontSize: '50px',
            color: '#0x000000',
        });
        play_text.preFX.addShadow(0, 0, 0.2, 2, 0x333333, 5);
        let options_text = this.add.text(-300, 270, "Options", {
            fontFamily: 'Ariel',
            fontSize: '50px',
            color: '#0x000000',
        });
        options_text.preFX.addShadow(0, 0, 0.2, 2, 0x333333, 5);
        let credits_text = this.add.text(-300, 370, "Credits", {
            fontFamily: 'Ariel',
            fontSize: '50px',
            color: '#0x000000',
        })
        credits_text.preFX.addShadow(0, 0, 0.2, 2, 0x333333, 5);

        // text sliding animations
        this.tweens.add({
            delay: 1000,
            targets: play_text,
            duration: 2000,
            x: 80,
            ease: 'Linear',
            repeat: 0,
        });

        this.tweens.add({
            delay: 3000,
            targets: options_text,
            duration: 2000,
            x: 80,
            ease: 'Linear',
            repeat: 0,
        });

        this.tweens.add({
            delay: 5000,
            targets: credits_text,
            duration: 2000,
            x: 80,
            ease: 'Linear',
            repeat: 0,
        });
       
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
    scene: [StudioScene, GameScene, TitleScene],
}

let game = new Phaser.Game(config);