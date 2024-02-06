
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

function restartGame() {
    location.reload();
  }

function handleKeyDown(event){
    //console.log("Tecla presionada:", event.key)
    const key = event.key;
    if (key === "ArrowLeft"){
        gameObj.tanque.directionX = -1;
    }
    if (key === "ArrowRight"){
        gameObj.tanque.directionX = 1;
    }
    if (key === "ArrowUp"){
        gameObj.tanque.directionY = -1;
    }
    if (key === "ArrowDown"){
        gameObj.tanque.directionY = 1;
    }
    if (key === "f"){
        // gameObj.disparos.directionX = -1;
        gameObj.createNewShoot()
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



startBtnNode.addEventListener("click", startGame);

restartBtnNode.addEventListener("click", function () {
   
    restartGame();
  });




