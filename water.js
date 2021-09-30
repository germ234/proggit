let LivingCreature = require('./LivingCreature')

module.exports = class Water extends LivingCreature {
    constructor(x, y, index){
        super(x, y, index);
        this.mulyiply = 0;
    }

    mul () {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        var grassCells = this.chooseCell(1);
        var grassCell = grassCells[Math.floor(Math.random() * grassCells.length)];
        var grasseaterCells = this.chooseCell(2);
        var grasseaterCell = grasseaterCells[Math.floor(Math.random() * grasseaterCells.length)];
        var predatorCells = this.chooseCell(3);
        var predatorCell = predatorCells[Math.floor(Math.random() * predatorCells.length)];
        var fireCells = this.chooseCell(5);
        var fireCell = fireCells[Math.floor(Math.random() * fireCells.length)];
        // console.log(emptyCells);
        if(emptyCell && this.multiply >= 7){
            var newX = emptyCell[0];
            var newY = emptyCell[1];
            matrix[newX][newY] = 4;
 
            var water = new Water(newX, newY);
            waterArr.push(water);
            this.multiply = 0;
        }else if(grassCell && this.multiply >= 7){
            var newX = grassCell[0];
            var newY = grassCell[1];
            matrix[newX][newY] = 4;
 
            var water = new Water(newX, newY);
            waterArr.push(water);
            this.multiply = 0;
            for (let i = 0; i < grassArr.length; i++) {
                if(newX == grassArr[i].x && newY == grassArr[i].y){
                        grassArr.splice(i, 1)
                }          
            }
        }else if(grasseaterCell && this.multiply >= 7){
            var newX = grasseaterCell[0];
            var newY = grasseaterCell[1];
            matrix[newX][newY] = 4;
 
            var water = new Water(newX, newY);
            waterArr.push(water);
            this.multiply = 0;
            for (let i = 0; i < grassEaterArr.length; i++) {
                if(newX == grassEaterArr[i].x && newY == grassEaterArr[i].y){
                    grassEaterArr.splice(i, 1)
                }          
            }
        }else if(predatorCell && this.multiply >= 7){
            var newX = predatorCell[0];
            var newY = predatorCell[1];
            matrix[newX][newY] = 4;
 
            var water = new Water(newX, newY);
            waterArr.push(water);
            this.multiply = 0;
            for (let i = 0; i < predatorArr.length; i++) {
                if(newX == predatorArr[i].x && newY == predatorArr[i].y){
                    predatorArr.splice(i, 1)
                }          
            }
        }else if(fireCell && this.multiply >= 7){
            var newX = fireCell[0];
            var newY = fireCell[1];
            matrix[newX][newY] = 4;
 
            var water = new Water(newX, newY);
            waterArr.push(water);
            this.multiply = 0;
            for (let i = 0; i < fireArr.length; i++) {
                if(newX == fireArr[i].x && newY == fireArr[i].y){
                        fireArr.splice(i, 1)
                }          
            }
        }
    }
}