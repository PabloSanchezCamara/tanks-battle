class Enemy {

    constructor (gameScreen) {
        
        this.gameScreen = gameScreen;
        this.left = Math.floor(Math.random()*600+70);
        this.top = 0;
        this.width = 100;
        this.height = 150;

        this.elementEnemy = document.createElement("img");
        this.elementEnemy.src = "./images/red-tank2.jpeg";

        this.elementEnemy.style.position = "absolute";
        this.elementEnemy.style.width = `${this.width}`;
        this.elementEnemy.style.height = `${this.height}`;
        this.elementEnemy.style.left = `${this.left}`;
        this.elementEnemy.style.top = `${this.top}`;
        this.gameScreen.appendChild(this.elementEnemy);

        this.speed = 0.5
    }

    updatePosition(){
    this.elementEnemy.style.left = `${this.left}px`;
    this.elementEnemy.style.top = `${this.top}px`;
    }

    move(){
        this.top += this.speed;
        this.updatePosition()
       //this.elementEnemy.style.top = `${this.top}px`;
    }

    move2(){
        this.left += this.speed;
        this.updatePosition()
    }

}