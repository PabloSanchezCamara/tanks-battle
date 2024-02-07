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
        this.enemiesAppearFreq = 7000;
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
        //console.log(this.enemies.length)
        

        if(this.gameIsOver){
            clearInterval(this.gameIntervalId);
        }
    }

    enemiesAppear(){
        this.enemyAppearIntervalId = setInterval(() => {

        let newEnemyTop = new Enemy(this.gameBoxNode, "arriba");
        this.enemies.push(newEnemyTop);

        let newEnemyBottom = new Enemy(this.gameBoxNode, "abajo");
        this.enemies.push(newEnemyBottom);

        let newEnemyLeft = new Enemy(this.gameBoxNode, "izquierda");
        this.enemies.push(newEnemyLeft);

        let newEnemyRight = new Enemy(this.gameBoxNode, "derecha");
        this.enemies.push(newEnemyRight);
        }, this.enemiesAppearFreq);
    }
    update(){
        this.tanque.move()

        
       /* //enemigos aparecen
        if (Math.random() > 0.98 && this.enemies.length < 6) {
            this.enemies.push(new Enemy(this.gameBoxNode));
        }*/
         
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
            
            else if (enemy.top > this.height || enemy.top < -200 || enemy.left > this.width || enemy.left < -200){
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
                    this.enemies.splice(j, 1);
                    this.disparos.splice(i, 1);
                    i--;
                    j--;
                } 
               // this.updateKillsCounter();
                
                else if (disparo.y > this.height /*|| disparo.y < -30 || disparo.x > this.width || disparo.x < -30*/){
                    disparo.elementShoot.remove();
                    this.disparos.splice(i, 1);
                    i--;
                } 
            }
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
        //console.log(this.disparos.length)
       //console.log(this.tanque)
        // let disparoObj;
        // if (disparoObj = new Disparo(this.tanque, "arriba")){
        //     this.disparos.push(disparoObj);
        // } else if (disparoObj = new Disparo(this.tanque, "abajo")){;
        //     this.disparos.push(disparoObj);
        // }else if (disparoObj = new Disparo(this.tanque, "derecha")){;
        //     this.disparos.push(disparoObj);
        // }else if (disparoObj = new Disparo(this.tanque, "izquierda")){;
        //     this.disparos.push(disparoObj);
        // }
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