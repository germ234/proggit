let LivingCreature = require('./LivingCreature')

module.exports = class Predator extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 12;
    }


    move() {
        let emptyCells0 = this.chooseCell(0)
        let grassCells = this.chooseCell(1)
        let emptyCells = [...emptyCells0, ...grassCells]
        let emptyCell = rand(emptyCells)
        if (emptyCell && this.energy > 0) {
            this.energy--
            let newX = emptyCell[0]
            let newY = emptyCell[1]

            if(matrix[newX][newY] == 0){
                matrix[newX][newY] = 3
                matrix[this.x][this.y] = 0
            }else if(matrix[newX][newY] == 1){
                matrix[newX][newY] = 3
                matrix[this.x][this.y] = 1
            }
            
            this.x = newX
            this.y = newY
        }else if(this.energy <= 0){
            this.die()
        }
    }

    eat() {
        this.mul()
        let grassCells = this.chooseCell(2)
        let grassCell = rand(grassCells)

        if (grassCell && this.energy > 0) {
            this.energy++
            let newX = grassCell[0]
            let newY = grassCell[1]
            matrix[newX][newY] = 3
            matrix[this.x][this.y] = 0
            for (let i = 0; i < grassEaterArr.length; i++) {
                if(newX == grassEaterArr[i].x && newY == grassEaterArr[i].y){
                    grassEaterArr.splice(i, 1)
                }         
            }
            this.x = newX
            this.y = newY 
            
        }else {
            this.move()
        }
    }

    mul() {
        let emptyCells = this.chooseCell(0) // [[x - 1, y],[x + 1, y - 1], [x + 1, y + 1]];
        let emptyCell = rand(emptyCells) // [x - 1, y]
        if (this.energy >= 15 && emptyCell) {
            let newX = emptyCell[0] //x - 1
            let newY = emptyCell[1] // y
            matrix[newX][newY] = 3
            let predator = new Predator(newX, newY)
            predatorArr.push(predator)
            this.energy = 12
        }
    }

    die(){
        matrix[this.x][this.y] = 0
        for (let i = 0; i < predatorArr.length; i++) {
            if(this.x == predatorArr[i].x && this.y == predatorArr[i].y){
                predatorArr.splice(i, 1)
            }          
        }
    }
}