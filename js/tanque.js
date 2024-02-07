class Tanque {
    constructor (gameBoxNode, left, top, width, height, imgSrc){
        this.gameBoxNode = gameBoxNode;
        this.left = left; //canbiar por x y
        this.top = top;
        this.width = width;
        this.height = height;
        this.directionX = 0;
        this.directionY = 0;
        this.enfoque = "arriba";
        
      

        this.elementTank = document.querySelector("img");
        this.elementTank.src = imgSrc;
        this.elementTank.className = "";

        this.elementTank.style.position = "absolute";
        this.elementTank.style.width = `${width}px`;
        this.elementTank.style.height = `${height}px`;
        this.elementTank.style.top = `${top}px`;
        this.elementTank.style.left = `${left}px`;
        this.gameBoxNode.appendChild(this.elementTank);

    }

    move(){
        //velocidad tanque
        this.left += this.directionX * 1.5;
        this.top += this.directionY * 1.5;

        //bordes por los que no se sale el tanque
        if (this.left < -15){
            this.left = -15;
        }
        if (this.top < -2){
            this.top = -2;
        }
        if (this.left > this.gameBoxNode.offsetWidth - this.width + 15) {
            this.left = this.gameBoxNode.offsetWidth - this.width + 15;
        }
        if (this.top > this.gameBoxNode.offsetHeight - this.height + 7) {
            this.top = this.gameBoxNode.offsetHeight - this.height + 7;
        }
        this.updatePosition();
    }

    updatePosition(){
        this.elementTank.style.left = `${this.left}px`;
        this.elementTank.style.top = `${this.top}px`
        }

    didCollide(enemy) {
        const tanqueRect = this.elementTank.getBoundingClientRect();
        const enemyRect = enemy.elementEnemy.getBoundingClientRect();
        
        if (
            tanqueRect.left < enemyRect.right &&
            tanqueRect.right > enemyRect.left &&
            tanqueRect.top < enemyRect.bottom &&
            tanqueRect.bottom > enemyRect.top
        ) {
            return true;
        } else {
            return false;
        }
    }
}