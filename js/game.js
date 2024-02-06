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
        this.enemies = [];
        this.enemiesAppearFreq = 2000;
        this.kills = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId;

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
        //console.log("in the gameloop")
        this.update();

        if(this.gameIsOver){
            clearInterval(this.gameIntervalId);
        }
    }

    update(){
        this.tanque.move()

       /*this.enemyAppearIntervalId = setInterval(() => {

            let positionAppear = Math.random() * (-120) 

            let newEnemyTop = new Enemy ("arriba", positionAppear);
            this.enemies.push(newEnemyTop);
            

            let newEnemyBottom = new Obstaculo("abajo", positionAppear);
            this.enemies.push(newEnemyBottom);
            //debemos tomar en cuenta elementps que salgan del juego y borrarlos

        }, this.enemiesAppearFreq)*/
        

        if (Math.random() > 0.98 && this.enemies.length < 6) {
            this.enemies.push(new Enemy(this.gameBoxNode));
        }
         for (let i = 0; i < this.enemies.length; i++){
            this.enemies[i].move();
         }

        for (let i=0; i < this.enemies.length; i++){
            const enemy = this.enemies[i];
            enemy.move();

            if(this.tanque.didCollide(enemy)){
                enemy.elementEnemy.remove();
                this.enemies.splice(i, 1);
                this.lives--;
                i--;
            } 
            
            else if (enemy.top > this.height){
                enemy.elementEnemy.remove();
                this.enemies.splice (i, 1);
                i--;
            }
        }

        if (this.lives === 0) {
            this.endGame();
        }
        
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