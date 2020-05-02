var buttonColors = ["red", "green", "yellow", "blue"]; //array with all colors
var gamePattern = []; // empty array
var userClickedPattern = [];
var started = false;
var level = 0;

//***

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  //
  var randomNumber = Math.floor(Math.random() * 4); // 0-4 random number.
  var randomChosenColour = buttonColors[randomNumber]; // red - blue
  gamePattern.push(randomChosenColour);
  //
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //select a color and flash it's button.

  playSound(randomChosenColour);


}
//***

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});
//***

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); //play audio depending on the color.
  audio.play();
}

//****

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
//*****

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();

      }, 1000);
    }


  } else {
    gameOver();
  }


}
//****

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(function() {
    $("body").removeClass("game-over");

  }, 200);

  startOver();

}
//*****
function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}
//*****

$(document).keydown(function() {

  if (started === false) {

    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;



  }

});