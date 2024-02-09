class Disparo {
    constructor (tanque){
        
        this.speed = 4;
        this.w = 30;
        this.h = 30;
        this.type = tanque.enfoque;

        if(this.type === "arriba"){
            this.directionX = 0;
            this.directionY = -1;
            this.x = tanque.left + 22;
            this.y = tanque.top - 8;
        }else if (this.type === "abajo"){
            this.directionX = 0;
            this.directionY = 1;
            this.x = tanque.left + 22;
            this.y = tanque.top + 60;
        }else if (this.type === "izquierda"){
            this.directionX = -1;
            this.directionY = 0;
            this.x = tanque.left - 22;
            this.y = tanque.top + 22;
        }else if (this.type === "derecha"){
            this.directionX = 1;
            this.directionY = 0;
            this.x = tanque.left + 60;
            this.y = tanque.top + 22;
        }
        
        this.elementShoot = document.createElement("img");
        if (this.type === "arriba"){
            this.elementShoot.src = "./images/bullet.png";
        }else if(this.type === "abajo"){
            this.elementShoot.src = "./images/bullet-bottom.png";
        }else if(this.type === "derecha"){
            this.elementShoot.src = "./images/bullet-right.png";
        }else if(this.type === "izquierda"){
            this.elementShoot.src = "./images/bullet-left.png";
        }

        this.elementShoot.style.position = "absolute";
        this.elementShoot.style.width = `${this.w}px`;
        this.elementShoot.style.height = `${this.h}px`;
        this.elementShoot.style.left = `${this.x}px`;
        this.elementShoot.style.top = `${this.y}px`;
        gameBoxNode.appendChild(this.elementShoot);
    }

    updatePosition(){
        this.elementShoot.style.left = `${this.x}px`;
        this.elementShoot.style.top = `${this.y}px`;
        }
    
    move(){
        
        if (this.type === "arriba"){
            this.y -= this.speed;
            this.updatePosition();
        }else if(this.type === "abajo"){
            this.y += this.speed;
            this.updatePosition();
        }else if (this.type === "izquierda"){
            this.x -= this.speed;
            this.updatePosition();
        }else if (this.type === "derecha"){
            this.x += this.speed;
            this.updatePosition();
        }
    }

    didCollide(enemy) {
        const shootRect = this.elementShoot.getBoundingClientRect();
        const enemyRect = enemy.elementEnemy.getBoundingClientRect();
        
        if (
            shootRect.left < enemyRect.right &&
            shootRect.right > enemyRect.left &&
            shootRect.top < enemyRect.bottom &&
            shootRect.bottom > enemyRect.top
        ) {
            return true;
        } else {
            return false;
        }
    }
}