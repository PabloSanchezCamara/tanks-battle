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
        this.enemiesAppearFreq = 1500;
        this.kills = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId;
        this.disparos = [] //poner Arr
        this.enemySpeed = 0.9;
        this.enemiesSpeedTimeIncrease = 3000;

        

        this.gameIntervalFreq = Math.round(1000/60)

        this.enemyAppearIntervalId;

        this.disparoSound = document.querySelector("#shoot-sound");
        this.disparoSound.volume = 0.05;

        this.bonusAppearIntervalId;
        this.bonusAppearFreq = 3000;
        this.bonusArr = [];
    }

    //metodos de juego

    enemySpeedIncrease(){
         this.enemiesSpeedIncreaseId = setInterval(() => {
                
                this.enemySpeed += 0.2;
                }, this.enemiesSpeedTimeIncrease);
                
            }
            
    start() {
        this.gameBoxNode.style.height = `${this.height}px`;
        this.gameBoxNode.style.width = `${this.width}px`
        this.startScreenNode.style.display = "none";
        this.gameContainerScreenNode.style.display = "flex";
        this.gameBoxNode.style.display = "block";
        this.enemySpeedIncrease()

        this.gameIntervalId = setInterval(() => {
            this.gameLoop()
        },this.gameIntervalFreq)
    }

    gameLoop(){
        
        this.update();

        if(this.gameIsOver){
            clearInterval(this.gameIntervalId);
        }
    }

    bonusAppear(){
        this.bonusAppearIntervalId = setInterval(() => {
            let newBonusObj = new Bonus(this.gameBoxNode);
            this.bonusArr.push(newBonusObj)
        }, this.bonusAppearFreq);
        
    }

    enemiesAppear(){
        this.enemyAppearIntervalId = setInterval(() => {
        const enemyTypes = ["arriba", "abajo", "izquierda", "derecha"];
        let randomEnemyTypeIndex1 = Math.floor(Math.random()* enemyTypes.length);
        let randomEnemyTypeIndex2 = Math.floor(Math.random()* enemyTypes.length);

        let newEnemy1 = new Enemy(this.gameBoxNode, enemyTypes[randomEnemyTypeIndex1],this.enemySpeed);
        this.enemies.push(newEnemy1);
        let newEnemy2 = new Enemy(this.gameBoxNode, enemyTypes[randomEnemyTypeIndex2],this.enemySpeed);
        this.enemies.push(newEnemy2);

        }, this.enemiesAppearFreq);
    }
    update(){
        this.tanque.move()

        //enemigos eliminados
        for (let i=0; i < this.enemies.length; i++){
            const enemy = this.enemies[i];
            enemy.move();

            if(this.tanque.didCollide(enemy)){
                enemy.elementEnemy.remove();
                this.enemies.splice(i, 1);
                this.lives--;
                i--;
                this.updateCounter()
            } 
            
            else if (enemy.top > this.height || enemy.top < -200 || enemy.left > this.width || enemy.left < -200){
                enemy.elementEnemy.remove();
                this.enemies.splice (i, 1);
                i--;
            } 
        }
        //disparos y enemigos eliminados en colision
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
                    this.addKillToCounter()
                } 
                
            }
        }

        for (let i = 0; i < this.disparos.length; i++) {
            const disparo = this.disparos[i];
            disparo.move();
            if (disparo.y > this.height || disparo.y < -30 || disparo.x > this.width || disparo.x < -30){
                disparo.elementShoot.remove();
                this.disparos.splice(i, 1);
                i--;
            }
        }

        for (let i=0; i < this.bonusArr.length; i++){
            const bonus = this.bonusArr[i];

            if(this.tanque.didCollideBonus(bonus)){
                bonus.elementBonus.remove();
                this.bonusArr.splice(i, 1);
                i--;
                this.tanque.speed += 2;

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
        this.disparoSound.play();
    }

    //contadores
    updateCounter() {
        document.querySelector("#kills-counter").textContent = this.kills;
        document.querySelector("#lives-counter").textContent = this.lives;
    }

    addKillToCounter(){
        this.kills++;
        this.updateCounter()
    }

    //fin juego
    endGame(){
    this.tanque.elementTank.remove();
    this.enemies.forEach( function (enemy){
        enemy.elementEnemy.remove();
    })
    this.gameIsOver = true;
    this.gameContainerScreenNode.style.display = "none";
    this.gameoverScreenNode.style.display = "flex";

    const killsGameOverScreen = document.querySelector("#final-score");
    killsGameOverScreen.textContent = `Has conseguido ${this.kills} kills!`;
    this.gameoverScreenNode.appendChild(killsGameOverScreen)
   }
}