'use strict';


// selecting the score elements
const player0 = document.querySelector('.player--0')
const player1 = document.querySelector('.player--1')
const scoreZero = document.getElementById('score--0')
const scoreOne = document.getElementById('score--1')
const currentScore0 = document.getElementById('current--0')
const currentScore1 = document.getElementById('current--1')
const diceElement = document.querySelector('.dice')
const btnNewgame = document.querySelector('.btn--new')
const btnHold = document.querySelector('.btn--hold')
const btnRoll = document.querySelector('.btn--roll')


// // Starting conditions
let scores,currentScore,activePlayer,playing

const init = function(){
// Starting conditions
scores =[0,0]
currentScore = 0;
activePlayer = 0
// setting the game's state whether it is playing or not
playing=true
    
scoreZero.textContent = 0
scoreOne.textContent = 0
currentScore0.textContent=0
currentScore1.textContent=0
diceElement.classList.add('hidden')
player0.classList.remove('player--winner');
player1.classList.remove('player--winner');
player0.classList.add('player--active');
player1.classList.remove('player--active');
}

init()

const switcPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent=0
    //switch to the next player 
   activePlayer = activePlayer === 0 ? 1 : 0;
   currentScore=0
//    switching active background colors
   player0.classList.toggle('player--active')
   player1.classList.toggle('player--active')
}

// ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', function(){
if (playing){
    // Generating a random dice roll
const dice = Math.trunc(Math.random() *6)+1
 console.log( dice);

//  displaying the current dice roll
 diceElement.classList.remove('hidden')
 diceElement.src = `dice-${dice}.png`

// checking if rolled dice is 1
if(dice!==1){
// if dice is not 1 add dice to current score
currentScore+=dice

// setting current score dynamically
document.getElementById(`current--${activePlayer}`).textContent=currentScore

}else{
    // resetting current score textcontent  to 0 
    document.getElementById(`current--${activePlayer}`).textContent=0
    //switch to the next player 
  switcPlayer();}

}

})

btnHold.addEventListener('click',function(){
    if (playing){
    // increasing the array 'scores' elements with currentScore using the activeplayer value (0 or 1) as the array index to be called, so if the active player is player 0...scores[0] is being increased by adding the currentScore
    scores[activePlayer]+=currentScore
    document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer]
    // resetting current score textcontent  to 0 
    // document.getElementById(`current--${activePlayer}`).textContent=0

    // finishing the game when player gets a score of 100 and above
    if (scores[activePlayer]>=100){
        playing=false
        diceElement.classList.add('hidden')
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    }else{
        //switch to the next player 
        switcPlayer();
    }
 }

})

btnNewgame.addEventListener('click' , init)
