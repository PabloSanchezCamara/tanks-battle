class Disparo {
    constructor (tanque){
        
        this.x = tanque.left;
        this.y = tanque.top;
        this.speed = 4;
        this.directionX = 0;
        this.directionY = 500;
        this.w = 30;
        this.h= 30;
        

        this.elementShoot = document.createElement("img");
        this.elementShoot.src = "./images/bullet.png";

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
        this.y += this.speed;
        this.updatePosition()
    }
}