'use strict';

//Selecting html elements
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
// const p1CurrentScore = document.querySelector("#current--0");
// const p2CurrentScore = document.querySelector("#current--1");
// const p1Score = document.querySelector("#score--0");
// const p2Score = document.querySelector("#score--1");
const diceImg = document.querySelector(".dice");

//to control the game
let playing = true;
//to calculate current score
let currentScore = 0;
//to calculate total score
let totalScore = [0, 0];

//function to hide dice
const hideDice = function () {
    diceImg.classList.add("hidden");
};
//hide the dice at beginning of the game
hideDice();

/*************DRY FUNCTIONS**************/
//function to check which player is active
const activePlayer = function () {
    if (player1.classList.contains("player--active")) {
        return 0;
    } else {
        return 1;
    }
};
//switch player
const switchPlayer = function () {
    player1.classList.toggle("player--active");
    player2.classList.toggle("player--active")
}
//reset current score and display it
const resetAndDisplay = function () {
    currentScore = 0;
    document.querySelector(`#current--${activePlayer()}`).textContent = currentScore;
}
//reset the total and current scores of all players and display it
const resetScores=function(){
    for(let i=0;i<totalScore.length;i++){
        document.querySelector(`#score--${i}`).textContent = totalScore[i];
        document.querySelector(`#current--${i}`).textContent = currentScore;
    }
}
//reset active player to player 1
const resetActivePlayer=function(){
    if(activePlayer()===1){
        switchPlayer();
    }
};
/*************END***************/


//logic to roll dice
btnRoll.addEventListener("click", function () {
    if (playing) {
        //generate random numbers between 0-6
        const num = Math.trunc(Math.random() * 6) + 1;
        //show dice according to generated number
        diceImg.classList.remove("hidden");
        //show dice image according to generated number
        diceImg.src = `dice-${num}.png`;
        //if dice rolled is 1 then switch player else calculate the current score of active player
        if (num === 1) {
            switchPlayer();
            resetAndDisplay();
        } else {
            //calculate current score
            currentScore += num;
            //display the current score of the active player
            document.querySelector(`#current--${activePlayer()}`).textContent = currentScore;
        }
    }
})
//logic to hold dice
btnHold.addEventListener("click", function () {
    if (playing) {
        //calculate total score of active player
        totalScore[`${activePlayer()}`] += currentScore;
        //display the total score of active player
        document.querySelector(`#score--${activePlayer()}`).textContent = totalScore[`${activePlayer()}`];
        //check the winner if total score of active player is greater or equal to 20
        if (totalScore[`${activePlayer()}`] >= 100) {
            //show the winner animation to the player who won
            document.querySelector(`.player--${activePlayer()}`).classList.add("player--winner");
            //stop the game as there is a winner
            playing = false;
            //hide dice when there is a winner
            hideDice();
        } else {
            //switch player 
            switchPlayer();
            //reset the current score when player switches
            resetAndDisplay();
        }
    }
})
//logic to start new game
btnNew.addEventListener("click",function(){
    //start the game
    playing=true;
    //reset total and current scores of all players
    totalScore=[0,0];
    currentScore=0;
    resetScores();
    //remove the winner animation
    document.querySelector(`.player--${activePlayer()}`).classList.remove("player--winner");
    //reset the active player to player 1
    resetActivePlayer();
})






































// //make dice hidden at the start of game
// diceImg.classList.add("hidden");

// // let diceRoll=Math.trunc(Math.random()*6)+1;
// let score = 0;
// let player1Score = 0;
// let player2Score = 0;
// // let activePlayer=Math.trunc(Math.random())+1;
// let playing = true;

// //function to check the active player
// const activePlayer=function(){
//     if(player1.classList.contains("player--active")){
//         return player1;
//     }else{
//         return player2;
//     }
// }

// //function to add the current score
// const addCurrentScore=function(){
//     if(activePlayer()===player1){
//         p1CurrentScore.textContent = score;
//     }else{
//         p2CurrentScore.textContent = score;
//     }

//     // if (player1.classList.contains("player--active")) {
//     //     score += diceRoll;
//     //     //display the current score according to dice rolled
//     //     p1CurrentScore.textContent = score;
//     // } else if (player2.classList.contains("player--active")) {
//     //     score += diceRoll;
//     //     //display the current score according to dice rolled
//     //     p2CurrentScore.textContent = score;
//     // }
// }

// //function to switch players and reset the current score
// const switchAndReset=function(){
//     player1.classList.toggle("player--active");
//     player2.classList.toggle("player--active");
//     score = 0;
//     if(activePlayer===player1){
//         p1CurrentScore.textContent = score;
//     }else{
//         p2CurrentScore.textContent = score;
//     }
// }

// //function to calculate and show total score
// const totalScore=function(){
//     if(activePlayer()===player1){
//         player1Score += score;
//         p1Score.textContent = player1Score;        
//     }else{
//         player2Score += score;
//         p2Score.textContent = player2Score;
//     }
// }

// //logic for rolling dice
// btnRoll.addEventListener("click", function () {
//     let diceRoll = Math.trunc(Math.random() * 6) + 1;
//     //make dice visible
//     diceImg.classList.remove("hidden");
//     //display dice image dynamically
//     diceImg.src = `dice-${diceRoll}.png`
//     //switch players whenever dice no 1 is rolled
//     if (diceRoll === 1) {
//         switchAndReset();
//     }
//     //add the current score whenever dice is rolled
//     score += diceRoll;
//     addCurrentScore();
// })



// //logic for holding the dice
// btnHold.addEventListener("click", function () {
//     //if there is winner
//     if (playing) {
//         if(score>=20){
//             activePlayer().classList.add("player--winner")
//         }else{
//             //hold the total score
//             totalScore();
//             //switch players and reset current score
//             switchAndReset();
//         }

//         // if (player1.classList.contains("player--active")) {
//         //     //adding the total current score to the score of player 1
//         //     player1Score += score;
//         //     p1Score.textContent = player1Score;
//         //     //switching players and reset current score
//         //     switchAndReset();
//         //     //display the current score
//         //     p1CurrentScore.textContent = score;
//         // } else {
//         //     //adding the total current score to the score of player 2
//         //     player2Score += score;
//         //     p2Score.textContent = player2Score;
//         //     //switching players and reset current score
//         //     switchAndReset();
//         //     //display the current score
//         //     p2CurrentScore.textContent = score;
//         // }
//     }
// })