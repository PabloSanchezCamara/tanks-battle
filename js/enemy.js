class Enemy {

    constructor (gamebBoxNode, type) {
        
        this.gamebBoxNode = gamebBoxNode;
        this.type = type

        if (this.type === "arriba"){
            this.left = Math.floor(Math.random()*700);
            this.top = -100;
        }else if (this.type === "abajo"){
            this.left = Math.floor(Math.random()*700);
            this.top = 600;
        }else if (this.type === "derecha"){
            this.left = 700;
            this.top = Math.floor(Math.random()*600);
        }else if (this.type === "izquierda"){
            this.left = -100;
            this.top = Math.floor(Math.random()*600)
        }
        this.width = 100;
        this.height = 150;



        this.elementEnemy = document.createElement("img");
        if (this.type === "arriba"){
            this.elementEnemy.src = "./images/red-tank2.png";
        }else if(this.type === "abajo"){
            this.elementEnemy.src = "./images/red-tank2-bottom.png";
        }else if(this.type === "derecha"){
            this.elementEnemy.src = "./images/red-tank2-right.png";
        }else if(this.type === "izquierda"){
            this.elementEnemy.src = "./images/red-tank2-left.png";
        }

        this.elementEnemy.style.position = "absolute";
        this.elementEnemy.style.width = `${this.width}`;
        this.elementEnemy.style.height = `${this.height}`;
        this.elementEnemy.style.left = `${this.left}`;
        this.elementEnemy.style.top = `${this.top}`;
        this.gamebBoxNode.appendChild(this.elementEnemy);
        

        this.speed = 0.7
    }

    updatePosition(){
    this.elementEnemy.style.left = `${this.left}px`;
    this.elementEnemy.style.top = `${this.top}px`;
    }

    move(){
        if (this.type === "arriba"){
            this.top += this.speed;
            this.updatePosition();
        }else if(this.type === "abajo"){
            this.top -= this.speed;
            this.updatePosition();
        }else if (this.type === "izquierda"){
            this.left += this.speed;
            this.updatePosition();
        }else if (this.type === "derecha"){
            this.left -= this.speed;
            this.updatePosition();
        }
    }

}