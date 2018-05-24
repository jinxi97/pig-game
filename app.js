/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*eslint-env browser*/

var scores, roundScore, activePlayer, gamePlaying;

init();


function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';

    document.querySelector('#name-0').textContent = 'PLAYER 1';
    document.querySelector('#name-1').textContent = 'PLAYER 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    //This is strange, but we need to remove first to avoid 2 'active' at player 0
    document.querySelector('.player-0-panel').classList.add('active');
}


document.querySelector('.btn-roll').addEventListener('click', function () {
    //the anonymous function that is only used here
    if(gamePlaying){
        
        var dice
        
        
        var displayDice = new Promise(function(resolve, reject) {
            //1. Generate a randome dice number
            dice = Math.floor(Math.random()*6+1);
            //2. Display the result
            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png';
            setTimeout(function(){
                resolve(true);
            }, 50);
            
        });
        displayDice.then(function(result) {
            //3. Update the round score IF the rolled number was NOT 1
            console.log(result);
            if (dice !== 1) {
                //Add score
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                alert("You rolled 1, so all your round score are cleared!");
                next_player();
            }
        });
        
    }
});

function next_player(){
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    /*
    if(activePlayer === 0){
        activePlayer = 1
        //remove active from player panel
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
    }else{
        activePlayer = 0
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
    }
    */
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //clear the dice
    document.querySelector('.dice').style.display = 'none';
}


document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {

        //Add Current score to global score
        scores[activePlayer] += roundScore;

        //Update the UI 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if the play won the game
        if(scores[activePlayer] >= 20){

            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
            gamePlaying = false
        }else{
            //Next Player
            next_player();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);




