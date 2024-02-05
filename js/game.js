class Game {

    // propiedas elementos dle juego
    constructor(){
        this.startScreenNode = document.querySelector("#start-screen");
        this.gameContainerScreenNode = document.querySelector("#game-container");
        this.gameBoxNode = document.querySelector("#game-box");
        this.gameoverScreenNode = document.querySelector("#gameover-screen");

        this.player;
        this.height = 900;
        this.width = 1300;
        this.enemies = [];
        this.kills = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId;

        this.gameIntervalFreq = Math.round(1000/60)

        
        this.enemyAppearIntervalId;
    }

    //metodos de juego

    start() {
        this.gameContainerScreenNode.style.height = `${this.height}px`;
        this.gameContainerScreenNode.style.width = `${this.width}px`
        this.startScreenNode.style.display = "none";
        this.gameContainerScreenNode.style.display = "flex";
        this.gameBoxNode.style.display = "block";

        this.gameIntervalId = setInterval(() => {
            //console.log("probando intervalo")

        },this.gameIntervalFreq)
    }
}