'use strict';

//make button and function for roll dice button
    //math.random 1 - 6
//make new game button
//make hold button that moves total score to player score ... 
// transfers to player 2
//display total score, add to total score, transfer to score
    //current score then changes to 0
//first place is the player who gets to 100 points first

//selecting player's scores
const p1Score = document.querySelector('#score--0');
const p2Score = document.querySelector('#score--1');

//selecting player display
const playerBkgrnd = document.querySelector('.player--0');
const playerBkgrnd2 = document.querySelector('.player--1');

//selecting current score
const p1CurrentScore = document.querySelector('#current--0');
const p2CurrentScore = document.querySelector('#current--1');

const visDice = document.querySelector('.dice');

//selecting buttons
const diceRoll = document.querySelector('.btn--roll');
const resetBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');

const scores = [0, 0];

let currentScore = 0;
let totalScore = 0;
let activePlayer = 0;
let playing = true; 

//manipulating player's scores
p1Score.textContent = 0;
p2Score.textContent = 0;

visDice.classList.add('hidden');

const switchPlayer = function() {
    //adding scores to current
            //place score in total
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            currentScore = 0;
            //switch to next player
            activePlayer = activePlayer === 0 ? 1 : 0;
            playerBkgrnd.classList.toggle('player--active');
            playerBkgrnd2.classList.toggle('player--active');

            // document.getElementById(`current--${activePlayer}`).textContent = 0;

};

diceRoll.addEventListener('click', function(){
if(playing){
    //creating the roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //attaching the corresponding dice img
    visDice.classList.remove('hidden');
    visDice.src = `dice-${dice}.png`;

    if(dice !== 1){
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        switchPlayer();

    };
}

});

holdBtn.addEventListener('click', function(){
    if(playing){
        //transfer current score to active player's total score
        scores[activePlayer] += currentScore;

        // scores[1] = scores[1] + currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //check to see if score is >= 100
        if(scores[activePlayer] >= 100) {
            playing = false;
            //if yes, finish the game
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active'); 
            diceRoll.classList.add('hidden');
            holdBtn.classList.add('hidden');
            visDice.classList.add('hidden');       
        } else {
            //if no, switch to the next player
            switchPlayer();
        };  
    };
});

newGameBtn.addEventListener('click', function(){
    holdBtn.classList.remove('hidden');
    visDice.classList.add('hidden'); 
    diceRoll.classList.remove('hidden');


    p2CurrentScore.textContent = 0;
    p1CurrentScore.textContent = 0;
    p1Score.textContent = 0;
    p2Score.textContent = 0;

    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active'); 

    playing = true;
});
