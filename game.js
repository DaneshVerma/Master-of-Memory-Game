var gameStarted = false;
var level = 0;
buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickPattern = [];

// continuing the game play sequence
function nextSequence() {
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    level += 1;
    $("#level-title").text("Level " + level)
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)
}

// game starting here 
$("body").keypress(function (e) {
    if (!gameStarted) {
        $("#level-title").text("Level " + level)
        nextSequence()
        gameStarted = true
    }
});

// catching the button which is clicked and playing its  corresponding sound onwards.
$(".btn").click(function (e) {
    var userChosenColour = $(this).attr("id");
    userClickPattern.push(userChosenColour)
    playSound(userChosenColour)
    animePress(userChosenColour)
    checkAnswer(userClickPattern.length - 1)
});


// Function for playing sound
function playSound(name) {
    var sound = new Audio("/sounds/" + name + ".mp3")
    sound.play()
}

// function for adding & removing press effect class on button clicks
function animePress(currentColour) {
    console.log(currentColour)
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

// funtion for game logic
function checkAnswer(currentLevel) {
    // checking the last sound played by user is right  or Wrong !

    if (userClickPattern[currentLevel] == gamePattern[currentLevel]) {
        // if Write
        // checking the user completed the current sequence
        if (userClickPattern.length == gamePattern.length) {
            userClickPattern = []
            setTimeout(() => {
                // initiated next sequence 
                nextSequence()
            }, 1000)
        }
    }
    else {
        // if wrong 
        playSound("wrong")
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press anykey to Restart")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);
        // resetting the incremented paramerts to restart the game
        startOver()
    }
}


// function for resetting incremented params
function startOver() {
    gameStarted = false;
    level = 0;
    gamePattern = [];
    userClickPattern = [];
}