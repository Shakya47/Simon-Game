var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green","yellow"]; 
var startGame = false;
var level = 0;

$(document).keypress(function(event){
    if(startGame === false){
        startGame = true;
        nextSequence(level);
    }
});

$(".btn").click(function(event){
    if(startGame === true){
        var userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);
        animateButtons(userChosenColor);
        playSound(userChosenColor);
        if(checkAnswer()===false){
        gameReset();
        }
        else if((userClickedPattern.length === level +1) && startGame === true){
            setTimeout(function(){
                level++;
                nextSequence(level);
            },1000);
        }
    }       
});

function nextSequence(level){
    var randomNumber = Math.floor(Math.random()*4);
    $("h1").text("Level "+level);  
    console.log("Level " + level);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    console.log("Game Pattern " + gamePattern);
    console.log("User Pattern " + userClickedPattern);
    userClickedPattern = [];
}

function checkAnswer(){
    var userLength = userClickedPattern.length;
    if(userLength>level+1) return false;
    for(var i = 0; i<userLength && i<=level +1; i++){
        if(gamePattern[i]!=userClickedPattern[i]){
            return false;
        }
        else
            return true;
    }    
}

function gameReset(){
    startGame = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    playSound("wrong");
    $("h1").text("Game Over!  Score: "+level).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");   
    },100);
    setTimeout(function(){
        $("h1").text("Press Any Key to Start");
    },2000);
}

function animateButtons(currentButton){
    $("#"+currentButton).addClass("pressed");
    setTimeout( function(){
        $("#"+currentButton).removeClass("pressed");
    },100);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
     audio.play();
}

//if button are clicked quickly, it still registers them in userPattern and the level 1 is also showing in console log.
//write a better a code without for loop in chechAnswer()