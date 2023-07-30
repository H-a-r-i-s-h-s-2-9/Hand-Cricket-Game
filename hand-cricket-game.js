let moves = document.querySelector('.moves-js')
let scorecard = document.querySelector('.scorecard')
let statusMsg = document.querySelector('.wicket-event-div')
let playAgainButon = document.querySelector('.play-again-button')
let emoji = document.querySelector('.emojis')


let player = 0;
let yourScore = 0;
let computerScore = 0;
let endGame = false;



document.body.addEventListener('keydown', (event) => {
    const k = event.key;
    if(k === '1' || k === '2' || k === '3' || k === '4' || k === '5' || k === '6') {
        playGame(Number(k));
    }else if(k === '7')
        playGame(10);
    else if(k === '8')
        playGame(20);
})

function playGame(x){

    if(!endGame) {    
        const y = computerMove();

        if(x == y) {
            renderMove(x,y);
            if(player == 0) {
                statusMsg.innerHTML = "Your are out!, Now you need to bowl";
                emoji.innerHTML = `😥😥😥😥😥`
            }
            else {
                statusMsg.innerHTML = `well done! <span class="win-text">YOU WON!</span>
                <button class="play-again-button" onclick="resetGame()">play again</button>`;
                endGame = true;
                emoji.innerHTML = `🎉🎉🎉🎉🎉`;
            }
            player = 1;
            
        } else{
            renderMove(x,y);    
            if(player == 0) {
                statusMsg.innerHTML = "Your are Batting..."
                emoji.innerHTML = '';
                yourScore += x;
                
            } else {
                statusMsg.innerHTML = "Your are Bowling..."
                emoji.innerHTML = '';
                computerScore += y;
                if(yourScore < computerScore) {
                    statusMsg.innerHTML = 
                    `You Lost the match <button class="play-again-button" onclick="resetGame()">play again</button>`;
                    endGame= true;
                    emoji.innerHTML = `😥😥😥😥😥`;

                }
            }
            
        }


        renderScore(yourScore,computerScore);
    }
    
}

function computerMove(){
    let randomNumber = Math.floor((Math.random()*10) );

    while(randomNumber === 9 || randomNumber === 0) {

        randomNumber = Math.floor((Math.random()*10));
    }

    if(randomNumber === 7)
        randomNumber = 10
    else if(randomNumber === 8)
        randomNumber = 20

    return randomNumber;

}


function renderMove(x,y){
    moves.innerHTML = 
    `Your move: <span class="moves-css">${x}</span>, Computer move: <span class="moves-css">${y}</span>`;

}


function renderScore(score1,score2) {
    scorecard.innerHTML = 
    `Your Score: <span class="score-css">${score1}</span>, Computer Score: <span class="score-css">${score2}</span>`
}

function resetGame(){
    yourScore = 0;
    computerScore = 0;
    player = 0;
    renderScore(yourScore,computerScore);
    renderMove(0,0);
    emoji.innerHTML = '';
    statusMsg.innerHTML = '';
    endGame = false;
}


