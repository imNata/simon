var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;

$(document).on("keypress", function() {
    if (!started) {
        $(".head").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$("button").on("click", function() {
    var userChosenColour = this.classList[0];
    userClickedPattern.push(userChosenColour);
    console.log(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];
    level += 1;
    $(".head").text("Level " + level);
    var randomNumber = Math.floor((Math.random() * 100) % 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    var path = "." + randomChosenColour;
    $(path).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColor) {
    var path = "." + currentColor;
    $(path).addClass("pressed");
    setTimeout(function() {
        $("." + currentColor).removeClass("pressed"); //here i can also put path
        //instead of "."+currentColor
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
                // userClickedPattern = [];
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $(".head").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
