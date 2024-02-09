class Bonus {
    
    constructor(gameBoxNode){
        this.gameBoxNode = gameBoxNode
        this.x = Math.floor(Math.random()*500);
        this.y = Math.floor(Math.random()*600);
        this.w = 30;
        this.h = 30;

        this.elementBonus = document.createElement("img");
        this.elementBonus.src = "./images/present.png";

        this.elementBonus.style.position = "absolute";
        this.elementBonus.style.width = `${this.w}px`;
        this.elementBonus.style.height = `${this.h}px`;
        this.elementBonus.style.left = `${this.x}px`;
        this.elementBonus.style.top = `${this.y}px`;
        this.gameBoxNode.appendChild(this.elementBonus);
    }
}