const select = document.querySelector("select");
const score = document.querySelector(".score");
const opponentStatus = document.querySelector(".opponent-status");
const userMove = document.querySelector(".user-move");
const opponentMove = document.querySelector(".opponent-move");
const announcement = document.querySelector(".announcement");
const resetBttn = document.querySelector("button");

let userScore = 0;
let opponentScore = 0;
let roundNum = 0;

function getOpponentChoice() {
    const choiceVal = Math.random() * 100;
    if (choiceVal <= 33)
        return "rock";
    else if (choiceVal <= 66)
        return "paper";
    else
        return "scissors";
}

function getUserChoice() {
    return select.value;
}

function playRound(userChoice, opponentChoice) {
    let roundWinner = checkRoundWinner(userChoice, opponentChoice);
    updateChoiceDisplayed(userChoice, opponentChoice);
    updateScore(roundWinner);
    roundNum += 1;
}


select.addEventListener('change', ()=>
{
    let userChoice = getUserChoice();
    let opponentChoice = getOpponentChoice();
    playRound(userChoice, opponentChoice);
    resetUserChoice();
    if(roundNum === 3){
        if(userScore > opponentScore){
            announcement.style.color="white";           
            announcement.textContent = "USER WINS THE GAME!";
        }
        else  if(userScore < opponentScore){
            announcement.style.color="red";           
            announcement.textContent = "Opponent wins the game!";
        }
        else {
            announcement.style.color="white";               
            announcement.textContent = "This game is a DRAW!!";
        }
        select.disabled=true;
    }
});

function checkRoundWinner(userChoice, opponentChoice) {
    // base cases
    if(userChoice === "")
        return "no choice";
    if(userChoice === opponentChoice)
        return "draw";
    else if(userChoice === "rock" && opponentChoice === "scissors")
        return "user";
    else if(userChoice === "scissors" && opponentChoice === "rock")
        return "opponent";
    else if(userChoice === "paper" && opponentChoice === "rock")
        return "user";
    else if(userChoice === "rock" && opponentChoice === "paper")
        return "opponent";
    else if(userChoice === "scissors" && opponentChoice === "paper")
        return "opponent";
    else 
        return "user";
}

function updateScore(winner) {
    switch (winner) {
        case "no choice":
            alert("User, make a move");
            break;
        case "draw":
        {
            announcement.style.color="white";  
            announcement.textContent = "DRAW!!";
            break;
        }
        case "user":
        {
            announcement.textContent = "User wins round!";
            announcement.style.color="white";  
            userScore+=1;
            break;
        }
        case "opponent":
        {
            announcement.textContent = "Opponent wins round!";
            announcement.style.color="red";           
            opponentScore+=1;
            break;
        }
    }
    updateScoreDisplayed(winner);
}

function updateScoreDisplayed(winner){
    score.textContent = `${userScore} | ${opponentScore}`;
}

function updateChoiceDisplayed(userChoice, opponentChoice){
    userMove.textContent = userChoice;
    opponentMove.textContent = opponentChoice;
    opponentStatus.textContent = "";
}

function resetUserChoice() {
    // Reset the select element to the default empty option
    select.value = "";
}

function resetGame() {
    opponentStatus.textContent = "Waiting for user to make a move...";
    userScore = 0;
    opponentScore = 0;
    roundNum = 0;
    
    // resetting displayed choice
    userMove.textContent = "";
    opponentMove.textContent = "";
    announcement.textContent = "";
    select.disabled=false;
    updateScoreDisplayed();
}

resetBttn.addEventListener('click', resetGame);