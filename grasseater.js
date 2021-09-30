let LivingCreature = require('./LivingCreature')

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
    }


    move() {
        let emptyCells = super.chooseCell(0);
        let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (emptyCell && this.energy > 0) {
            this.energy--
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            matrix[newX][newY] = 2
            matrix[this.x][this.y] = 0
            this.x = newX
            this.y = newY
        }else if(this.energy <= 0){
            this.die()
        }
    }

    eat() {
        this.mul()
        let grassCells = this.chooseCell(1)
        let grassCell = grassCells[Math.floor(Math.random() * grassCells.length)]

        if (grassCell && this.energy > 0) {
            this.energy++
            let newX = grassCell[0]
            let newY = grassCell[1]
            matrix[newX][newY] = 2
            matrix[this.x][this.y] = 0
            for (let i = 0; i < grassArr.length; i++) {
                if(newX == grassArr[i].x && newY == grassArr[i].y){
                    grassArr.splice(i, 1)
                }          
             }
            this.x = newX
            this.y = newY
        }else {
            this.move()
        }
    }

    mul() {
        let emptyCells = super.chooseCell(0) // [[x - 1, y],[x + 1, y - 1], [x + 1, y + 1]];
        let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)] // [x - 1, y]
        if (this.energy >= 12 && emptyCell) {
            let newX = emptyCell[0] //x - 1
            let newY = emptyCell[1] // y
            matrix[newX][newY] = 2
            let great = new GrassEater(newX, newY)
            grassEaterArr.push(great)
            this.energy = 8
        }
        if (weath == "winter") {
			this.energy -= 4;
			this.multiply -= 4;
		}
		if (weath == "summer") {
			this.energy += 2;
			this.multiply += 2;
		}
    }

    die(){
        matrix[this.x][this.y] = 0
        for (let i = 0; i < grassEaterArr.length; i++) {
            if(this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y){
                grassEaterArr.splice(i, 1)
            }          
         }
    }

}