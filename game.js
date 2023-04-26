let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

/****************************PLAYER CLICKS****************************/
$(".btn").click(function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


/****************************GAME STARTS****************************/
function nextSequence() {
    userClickedPattern = [];
    let randNum = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randNum];
    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);


    $("#level-title").text(`Level ${level}`);
    level++;
}


/******************PLAY SOUND FOR GAME + USER CLICKS******************/
function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}


/*************************USER CLICK ANIMATION*************************/
function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}


/*************************CHECK ANSWER*************************/
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            // setTimeout(nextSequence(), 1000);
            // userClickedPattern = [];
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        var wrong = new Audio(`sounds/wrong.mp3`);
        wrong.play();
        console.log("wrong");

        startOver();
    }
}

/*************************RESTART GAME*************************/
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


/* 
- press A to start game
- pull random number, put into array and that's pattern
- play the number for the user
- wait for user input to hit all array numbers in order
- if right, play next number. if wrong, display/error wrong and empty array
- 
*/