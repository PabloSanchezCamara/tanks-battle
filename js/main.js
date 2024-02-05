const startScreenNode = document.querySelector("#start-screen");
const gameContainerScreenNode = document.querySelector("#game-container");
const gameBoxNode = document.querySelector("#game-box");
const gameoverScreenNode = document.querySelector("#gameover-screen");
const startBtnNode = document.querySelector("#start-btn");
const restartBtnNode = document.querySelector("#restart-btn");

let gameObj;

//State functions

function startGame (){
    console.log("clickando")


    gameObj = new Game;

    gameObj.start();
}


//Event listeners

startBtnNode.addEventListener("click", startGame)