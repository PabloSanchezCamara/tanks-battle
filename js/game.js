class Game {

    // propiedas elementos dle juego
    constructor(){
        this.startScreenNode = document.querySelector("#start-screen");
        this.gameContainerScreenNode = document.querySelector("#game-container");
        this.gameBoxNode = document.querySelector("#game-box");
        this.gameoverScreenNode = document.querySelector("#gameover-screen");

        this.tanque = new Tanque(this.gameBoxNode, 300, 300, 75, 75, "./images/Tank_0.png");
        this.height = 600;
        this.width = 700;
        this.enemies = []; //poner Arr
        this.enemiesAppearFreq = 2000;
        this.kills = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId;
        this.disparos = [] //poner Arr

        this.gameIntervalFreq = Math.round(1000/60)

        
        this.enemyAppearIntervalId;
    }

    //metodos de juego

    start() {
        this.gameBoxNode.style.height = `${this.height}px`;
        this.gameBoxNode.style.width = `${this.width}px`
        this.startScreenNode.style.display = "none";
        this.gameContainerScreenNode.style.display = "flex";
        this.gameBoxNode.style.display = "block";

        this.gameIntervalId = setInterval(() => {
            //console.log("probando intervalo")
            this.gameLoop()
        },this.gameIntervalFreq)
    }

    gameLoop(){
        
        this.update();

        if(this.gameIsOver){
            clearInterval(this.gameIntervalId);
        }
    }

    update(){
        this.tanque.move()
        
        //enemigos aparecen
        if (Math.random() > 0.98 && this.enemies.length < 6) {
            this.enemies.push(new Enemy(this.gameBoxNode));
        }
         
        //enemigos eliminados
        for (let i=0; i < this.enemies.length; i++){
            const enemy = this.enemies[i];
            enemy.move();

            if(this.tanque.didCollide(enemy)){
                enemy.elementEnemy.remove();
                this.enemies.splice(i, 1);
                this.lives--;
                i--;
                //this.updateLivesCounter(); MIRAR
            } 
            
            else if (enemy.top > this.height){
                enemy.elementEnemy.remove();
                this.enemies.splice (i, 1);
                i--;
            }
        }
        
        
        
        for (let i = 0; i < this.disparos.length; i++) {
            const disparo = this.disparos[i];
            disparo.move();
            for (let j=0; j<this.enemies.length; j++){
                const enemy = this.enemies[j];
            

            if (disparo.didCollide(enemy)){
                enemy.elementEnemy.remove();
                disparo.elementShoot.remove();
                this.enemies.splice(i, 1);
                i--;
               // this.updateKillsCounter();
            }}
        }


        //gameover 
        if (this.lives === 0) {
            this.endGame();
        }
        
    }


    //disparos aparecen
    createNewShoot (){
        const disparoObj = new Disparo(this.tanque);
        this.disparos.push(disparoObj);
    }

    updateKillsCounter() {
        const killsCounterElement = document.querySelector("#kills-counter");
        killsCounterElement.textContent = `Kills: ${this.kills}`;
    }
    
      updateLivesCounter() {
        const livesCounterElement = document.querySelector("#lives-counter");
        livesCounterElement.textContent = `Lives: ${this.lives}`;
    }

    endGame(){
    this.tanque.elementTank.remove();
    this.enemies.forEach( function (enemy){
        enemy.elementEnemy.remove();
    })
    this.gameIsOver = true;
    this.gameContainerScreenNode.style.display = "none";
    this.gameoverScreenNode.style.display = "block";
   }
    
}