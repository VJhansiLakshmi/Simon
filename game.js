var gamePattern = [];
var userChosenPattern = [];
var buttonColors = ["green","red","yellow","blue"];
var level = 0;
var score = 0;

// start game in the start or at startOver when space bar is pressed
$("body").on("keydown",function(event){
    if(event.keyCode == 32 && gamePattern.length == 0){
        score = 0;
        $(".score").html("score : "+score);
        nextSequence();
    }
});


$(".level").on("click",function(){
  if(gamePattern.length == 0){
    score = 0;
    $(".score").html("score : "+score);
    nextSequence();
  }
});



// on click of a color confirm if the userChosenPattern matches gamePattern so far or else startover
$(".color-btn").on("click",function(){
  if(gamePattern.length > 0){
    var userChosenColor = $(this).attr('id');
    userChosenPattern.push(userChosenColor);
    if(checkPattern(gamePattern,userChosenPattern)){
      playSound(userChosenColor);
      $("."+userChosenColor).addClass("pressed");
      setTimeout(function(){$("."+userChosenColor).removeClass("pressed"); }, 10);
      if(gamePattern.length == userChosenPattern.length){
        score = score + userChosenPattern.length;
        $(".score").html("score : "+score);
        userChosenPattern.length = 0;
        nextSequence();
      }
    }
    else{ startOver();}
  }
});


// click title to reload page
$("#game-name").on("click",function(){
  location.reload();
});



// click how to play for instructions in dialog box
$(".howtoplay").on("click",function(){
  swal("How to Play Simon", "1. Press Space Bar to start.\n 2. Simon will give the first signal.\n 3. Repeat the signal by clicking the same color button.\n 4. Simon will give the next signal.\n 5. Repeat the earlier and current signals by clicking the respective color buttons in the same sequence.\n 6. If the sequence is correct, Simon will give the next signal.\n 7. Remember the sequence of the signals.");
});


//function for random selection of a color and storing into gamePattern
function nextSequence(){
  level++;
  $(".level").html("Level "+level);
  var randomSeq = Math.random()*4;
  randomSeq = Math.floor(randomSeq);
  var randomChosenColor = buttonColors[randomSeq];
  gamePattern.push(randomChosenColor);
  setTimeout(function()
  {
    $("#"+randomChosenColor).fadeOut(250).fadeIn(250);
    playSound(randomChosenColor);
  }, 500);

}

//function to check if selected pattern matches gamePattern
function checkPattern(a, b){
  var lenA = a.length;
  var lenB = b.length;
  if(lenA == 0){ return true;}
  else{
    for(var i=0;i<lenB;i++){
      if(a[i] != b[i]){ return false;}
    }
    return true;
  }
}

//function to play sounds
function playSound(audioName){
  var sound = new Audio("sounds/"+ audioName +".mp3");
  sound.play();
}

//function to restart game
function startOver(){
  gamePattern.length = 0;
  userChosenPattern.length = 0;
  level = 0;
  $("body").addClass("game-over");
  setTimeout(function(){$("body").removeClass("game-over"); }, 200);
  $("#start-button").html("Game Over! Press Space Bar to Restart");
  $("#start-button-media").html("Game Over! Tap here to Restart");
  playSound("wrong");
}
