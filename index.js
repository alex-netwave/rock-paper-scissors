const select = document.querySelector("select");
const score = document.querySelector(".score");
const userStatus = document.querySelector(".user-status");
const opponentStatus = document.querySelector(".opponent-status");

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
        if(userScore > opponentScore)
            alert("User wins the game!");
        else  if(userScore < opponentScore)
            alert("Opponent wins the game!");
        else
            alert("This game is a DRAW!!")
        resetGame();
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
            alert("DRAW");
            break;
        case "user":
            alert("User wins round.");
            userScore+=1;
            break;
        case "opponent":
            alert("Opponent wins round.");
            opponentScore+=1;
            break;
    }
    updateScoreDisplayed(winner);
}

function updateScoreDisplayed(winner){
    score.textContent = `Score: ${userScore} | ${opponentScore}`;
}

function updateChoiceDisplayed(userChoice, opponentChoice){
    userStatus.textContent = userChoice;
    opponentStatus.textContent = opponentChoice;
}

function resetUserChoice() {
    // Reset the select element to the default empty option
    select.value = "";
}

function resetGame() {
    userStatus.textContent = "";
    opponentStatus.textContent = "Waiting for user to make a move...";
    userScore = 0;
    opponentScore = 0;
    roundNum = 0;
    updateScoreDisplayed();
}