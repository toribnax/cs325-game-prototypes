"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game(512, 256, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    //All the layers that compose the background
    game.load.image('h1', 'assets/hills1.png');
    game.load.image('h2', 'assets/hills2.png');
    game.load.image('h3', 'assets/hills3.png');
    game.load.image('h4', 'assets/hills4.png');
    game.load.image('h5', 'assets/hills5.png');
    game.load.image('h6', 'assets/hills6.png');
    
    game.load.image('ground', 'assets/platform.png');
    game.load.image('cloud', 'assets/cloud.png');

    game.load.spritesheet('fox', 'assets/fox.png', 24, 24);
    game.load.spritesheet('veggies', 'assets/Food.png', 16, 16);


}

var player;
var platforms;
var cursors;
var veggies;

var score = 0;
var scoreText;


function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);


    //Loads in the background for the game
    game.add.sprite(0, 0, 'h1');
    game.add.sprite(0, 0, 'h2');
    game.add.sprite(0, 0, 'h3');
    game.add.sprite(0, 0, 'h4');
    game.add.sprite(0, 0, 'h5');
    game.add.sprite(0, 0, 'h6');

    // This section of code was taken from the Making Your First Game Tutorial
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 2, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    
    //This section of code was taken from example Group Vs Group
    veggies = game.add.group();
    veggies.enableBody = true;
    veggies.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++)
    {
        var c = veggies.create(game.world.randomX, Math.random() * 500, 'veggies', game.rnd.integerInRange(0, 53));
        c.name = 'veg' + i;
        c.body.immovable = true;
    }


    //Creates two clouds as for platforms
    var ledge = platforms.create(100, 150, 'cloud');
    ledge.body.immovable = true;
    ledge.scale.setTo(0.2,0.2);

    ledge = platforms.create(380, 80, 'cloud');
    ledge.body.immovable = true;
    ledge.scale.setTo(0.2,0.2);

    //This section of code was taken from the Making Your First Game tutorial
    player = game.add.sprite(24, game.world.height - 150, 'fox');
    game.physics.arcade.enable(player);

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //Animation to move the fox
    player.animations.add('move', [5, 0, 1, 2, 3, 4], 10, true);

    
    //  The score
    scoreText = game.add.text(200, 12, 'score: 0', { font: '24px Kristen ITC', fill: '#82CAFA' });

    cursors = game.input.keyboard.createCursorKeys();
   

    
}

function update() {

    //  Collide the player the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);

    game.physics.arcade.collide(veggies, platforms);

    //  Checks to see if the player overlaps with any of the food, if it does call the collectFood function
    game.physics.arcade.overlap(player, veggies, collectFood, null, this);

    player.body.velocity.x = 0;

    //Moves the fox to the left
    if (cursors.left.isDown)
    {

        player.scale.x = -1;
        player.body.velocity.x = -150;

        player.animations.play('move');
    }
    //Moves the fox to the right
    else if (cursors.right.isDown)
    {

        player.scale.x = 1;
        player.body.velocity.x = 150;

        player.animations.play('move');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 5;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        
        player.body.velocity.y = -250;
    }

}

function collectFood (player, veg) {
    
    veg.kill();
    score += 5;
    scoreText.text = 'score: ' + score;

}
};
