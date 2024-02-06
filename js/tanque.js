class Tanque {
    constructor (gameScreen, left, top, width, height, imgSrc){
        this.gameScreen = gameScreen;
        this.left = left; //canbiar por x y
        this.top = top;
        this.width = width;
        this.height = height;
        this.directionX = 0;
        this.directionY = 0;

        this.elementTank = document.querySelector("img");
        this.elementTank.src = imgSrc;

        this.elementTank.style.position = "absolute";
        this.elementTank.style.width = `${width}px`;
        this.elementTank.style.height = `${height}px`;
        this.elementTank.style.top = `${top}px`;
        this.elementTank.style.left = `${left}px`;
        this.gameScreen.appendChild(this.elementTank);

    }

    move(){
        this.left += this.directionX;
        this.top += this.directionY;

        if (this.left < 10){
            this.left = 10;
        }
        if (this.top < 10){
            this.top = 10;
        }
        if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
            this.left = this.gameScreen.offsetWidth - this.width - 10;
        }
        if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
            this.top = this.gameScreen.offsetHeight - this.height - 10;
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