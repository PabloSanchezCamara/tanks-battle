window.onload = function (){
const startScreenNode = document.querySelector("#start-screen");
const gameContainerScreenNode = document.querySelector("#game-container");
const gameBoxNode = document.querySelector("#game-box");
const gameoverScreenNode = document.querySelector("#gameover-screen");
const startBtnNode = document.querySelector("#start-btn");
const restartBtnNode = document.querySelector("#restart-btn");

let gameObj;

//State functions

function startGame (){
    //console.log("clickando")

    gameObj = new Game;

    gameObj.start();
}

function handleKeyDown(event){
    //console.log("Tecla presionada:", event.key)
    const key = event.key;
    const possibleKeyStrokes = [
        "ArrowLeft",
        "ArrowUp",
        "ArrowRight",
        "ArrowDown",
    ]
    if (possibleKeyStrokes.includes(key)){
        event.preventDefault();

        switch (key){
            case "ArrowLeft":
                gameObj.tanque.directionX = -1;
                break;
            case "ArrowUp":
                gameObj.tanque.directionY = -1;
                break;
            case "ArrowRight":
                gameObj.tanque.directionX = 1;
                break;
            case "ArrowDown":
                gameObj.tanque.directionY = 1;
                break;
        }
    }
}
window.addEventListener("keydown", handleKeyDown);

function handleKeyUp(event){
    const key = event.key;
    if (key === "ArrowLeft" || key === "ArrowRight"){
        gameObj.tanque.directionX = 0;
    }
    if (key === "ArrowUp" || key === "ArrowDown"){
        gameObj.tanque.directionY = 0;
    }
}
window.addEventListener("keyup", handleKeyUp);

//Event listeners

startBtnNode.addEventListener("click", startGame)

}