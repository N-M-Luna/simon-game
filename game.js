//Game logic for the Simon Game

//Starting Game Pattern and User Pattern:
var gamePattern = [];
var userPattern = [];

//Game starts at level 0
var level = 0;


//The game starts when the user presses a key
$("body").keydown( function(e) {
   if ( level === 0) {
      nextSequence();
   }
});

// "nextSequence" function adds a random button to the game pattern.
function nextSequence() {
   
   //All buttons:
   var buttonColors = ["red", "blue", "green", "yellow"];
   
   
   var randomNumber = Math.floor(Math.random() * 4);
   var nextColor = buttonColors[randomNumber];
   gamePattern.push(nextColor);
   
   //the user is notified via a flash
   $("#" + nextColor).fadeOut().fadeIn();
   
   //and via the buton's sound.
   playButtonSound(nextColor);
   
   //When this happens, the user is starting a new level. Let's let the user know.
   level++;
   $("#level-title").html("Level " + level);
   
}


//When the user clicks on a button, 
$(".btn").click(function(e) {
   
   //we add the button color to the User Pattern,
   var colorClicked = e.target.id;
   userPattern.push(colorClicked);
   //we play the button's sound,
   playButtonSound(colorClicked);
   
   //and we give the button a flashy animation.
   animatePress(colorClicked);
   
   //Then, we check if the user is on the right track
   checkAnswer(userPattern.length);
});
   

//This function checks if the user's chosen pattern is the same as the game pattern
function checkAnswer(lengthOfPattern) {
   
   var i = lengthOfPattern -1;
   if (userPattern[i] !== gamePattern[i]) {
      //if the button differs, game is over:
      
      //play sound
      var gameOverSound = new Audio ("sounds/wrong.mp3");
      gameOverSound.play();
      
      //flash red
      $("body").addClass("game-over");
      setTimeout( function() { $("body").removeClass("game-over")}, 200);
      
      //update the level
      $("#level-title").html("Game Over. Press any key to restart.");
      startOver();
      return;
   }
   //otherwise, nothing happens and we wait for the user to pick the next button.
   
   //if the user got all of the them right, the level is cleared 
   if (userPattern.length === level){
      //clear the user pattern for the next level
      userPattern = [];
      
      //and proceed to the next level
      setTimeout ( function () {nextSequence()}, 1250);
   }
}


//This function resets the game
function startOver() {
   level = 0;
   gamePattern = [];
   userPattern = [];
}
   
   
//This function takes the color of the button (input) and plays its sound ("output")
function playButtonSound(color) {
   var buttonSound = new Audio("sounds/" + color + ".mp3");
   buttonSound.play();
}

//This function takes the color of the button (input) and animates it ("output")
function animatePress(colorPressed) {
   var buttonId = "#" + colorPressed;
   $(buttonId).addClass("pressed");
   setTimeout( function() { $(buttonId).removeClass("pressed")}, 100);
}
     

