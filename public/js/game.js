const soundsDir = "assets/sounds/";
var TILES = ["green", "red", "yellow", "blue"];

var isGameOver = true;
var level = 1

var sequence = [];
var nextTileIndex = 0;

function startGame(){
    if (!isGameOver)
        return;

    console.log("STARTING...");
    isGameOver = false;
    level = 0;
    sequence = [];

    generateNextTile();

}

function generateNextTile(){
    if (isGameOver)
        return;

    nextTileIndex = 0;
    level++;

    var newTile = Math.floor(Math.random() * 4);
    sequence.push(newTile);
    console.log(sequence);

    $("#level-title").text("Level " + level);

    // flash tiles
    $("." + TILES[newTile]).animate({opacity: 0.5}, 200).animate({opacity: 1}, 200);

    var audio = new Audio(soundsDir + TILES[newTile] + ".mp3");
    audio.play();
}

function handleClick(){
    if (isGameOver)
        return;

    // Pressed Animation
    $("." + this.id).addClass("pressed");
    setTimeout(() => {$("." + this.id).removeClass("pressed");}, 100);

    var audio = new Audio(soundsDir + this.id + ".mp3");
    audio.play();

    var chosenTile = TILES.indexOf(this.id);
    if (sequence[nextTileIndex] != chosenTile){
        gameOver();
        return;
    }

    nextTileIndex++;
    if (sequence.length <= nextTileIndex){
        setTimeout(generateNextTile, 1000);
    }
}

function gameOver(){
    isGameOver = true;

    var audio = new Audio(soundsDir + "wrong.mp3");
    audio.play();
    $("body").addClass("red");
    setTimeout(() => {$("body").removeClass("red");}, 100);
    $("#level-title").text("Game Over, Press Any Key to Restart");
}


$(document).keydown(startGame);
$(".btn").click(handleClick);