
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
    gameObj.enemiesAppear();
}

function restartGame() {
    location.reload();
  }

function handleKeyDown(event){
    //console.log("Tecla presionada:", event.key)
    const key = event.key;
    if (key === "ArrowLeft"){
        gameObj.tanque.directionX = -1;
        gameObj.tanque.elementTank.src = "./images/Tank_0-left.png";
        gameObj.tanque.enfoque = "izquierda"
    }
    if (key === "ArrowRight"){
        gameObj.tanque.directionX = 1;
        gameObj.tanque.elementTank.src = "./images/Tank_0-right.png";
        gameObj.tanque.enfoque = "derecha"
    }
    if (key === "ArrowUp"){
        gameObj.tanque.directionY = -1;
        gameObj.tanque.elementTank.src = "./images/Tank_0.png";
        gameObj.tanque.enfoque = "arriba"
    }
    if (key === "ArrowDown"){
        gameObj.tanque.directionY = 1;
        gameObj.tanque.elementTank.src = "./images/Tank_0-bottom.png"
        gameObj.tanque.enfoque = "abajo"
    }
    if (key === " "){
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




