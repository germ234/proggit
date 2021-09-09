class Grass{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.directions = [
            [x - 1, y - 1],
            [x, y-1],
            [x + 1, y - 1],
            [x - 1, y],
            [x + 1, y],
            [x - 1, y + 1],
            [x, y + 1],
            [x + 1, y + 1]
        ];
    }
    chooseCell(char) {
        var found = [];
        for(var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if(matrix[x][y] == char) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul () {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var emptyCell = rand(emptyCells);
 
        // console.log(emptyCells);
        if(emptyCell && this.multiply >= 8){
            var newX = emptyCell[0];
            var newY = emptyCell[1];
            matrix[newX][newY] = 1;
 
            var gr = new Grass(newX, newY);
            grassArr.push(gr);
            this.multiply = 0;
        }
    }
 
}

class GrassEater {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 8
        this.directions = []
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y - 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(char) {
        this.getNewCoordinates()
        let found = [] // [[1, 1], [2, 1]]
        for (const i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[x][y] == char) {
                    found.push(this.directions[i])//[ [x - 1, y - 1],]
                }
            }
        }
        return found
    }

    move() {
        let emptyCells = this.chooseCell(0)
        let emptyCell = rand(emptyCells)
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
        let grassCell = rand(grassCells)

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
        let emptyCells = this.chooseCell(0) // [[x - 1, y],[x + 1, y - 1], [x + 1, y + 1]];
        let emptyCell = rand(emptyCells) // [x - 1, y]
        if (this.energy >= 12 && emptyCell) {
            let newX = emptyCell[0] //x - 1
            let newY = emptyCell[1] // y
            matrix[newX][newY] = 2
            let great = new GrassEater(newX, newY)
            grassEaterArr.push(great)
            this.energy = 8
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


class Predator{
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 12
        this.directions = []
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y - 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(char) {
        this.getNewCoordinates()
        let found = [] // [[1, 1], [2, 1]]
        for (const i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[x][y] == char) {
                    found.push(this.directions[i])//[ [x - 1, y - 1],]
                }
            }
        }
        return found
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

class Fire{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.directions = [
            [x - 1, y - 1],
            [x, y-1],
            [x + 1, y - 1],
            [x - 1, y],
            [x + 1, y],
            [x - 1, y + 1],
            [x, y + 1],
            [x + 1, y + 1]
        ];
    }
    chooseCell(char) {
        var found = [];
        for(var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if(matrix[x][y] == char) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul () {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var emptyCell = rand(emptyCells);
        var grassCells = this.chooseCell(1);
        var grassCell = rand(grassCells);
        var grasseaterCells = this.chooseCell(2);
        var grasseaterCell = rand(grasseaterCells);
        var predatorCells = this.chooseCell(3);
        var predatorCell = rand(predatorCells);
        // console.log(emptyCells);
        if(emptyCell && this.multiply >= 12){
            var newX = emptyCell[0];
            var newY = emptyCell[1];
            matrix[newX][newY] = 5;
 
            var fire = new Fire(newX, newY);
            fireArr.push(fire);
            this.multiply = 0;
        }else if(grassCell && this.multiply >= 12){
            
            var newX = grassCell[0];
            var newY = grassCell[1];
            matrix[newX][newY] = 5;
 
            var fire = new Fire(newX, newY);
            fireArr.push(fire);
            this.multiply = 0;
            for (let i = 0; i < grassArr.length; i++) {
                if(newX == grassArr[i].x && newY == grassArr[i].y){
                        grassArr.splice(i, 1)
                }          
            }
        }else if(grasseaterCell && this.multiply >= 12){
            var newX = grasseaterCell[0];
            var newY = grasseaterCell[1];
            matrix[newX][newY] = 5;
 
            var fire = new Fire(newX, newY);
            fireArr.push(fire);
            this.multiply = 0;
            for (let i = 0; i < grassEaterArr.length; i++) {
                if(newX == grassEaterArr[i].x && newY == grassEaterArr[i].y){
                    grassEaterArr.splice(i, 1)
                }          
            }
        }else if(predatorCell && this.multiply >= 12){
            var newX = predatorCell[0];
            var newY = predatorCell[1];
            matrix[newX][newY] = 5;
 
            var fire = new Fire(newX, newY);
            fireArr.push(fire);
            this.multiply = 0; 
            for (let i = 0; i < predatorArr.length; i++) {
                if(newX == predatorArr[i].x && newY == predatorArr[i].y){
                    predatorArr.splice(i, 1)
                }          
            }
        }
    }

    
}

class Water{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.directions = [
            [x - 1, y - 1],
            [x, y-1],
            [x + 1, y - 1],
            [x - 1, y],
            [x + 1, y],
            [x - 1, y + 1],
            [x, y + 1],
            [x + 1, y + 1]
        ];
    }
    chooseCell(char) {
        var found = [];
        for(var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if(matrix[x][y] == char) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul () {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var emptyCell = rand(emptyCells);
        var grassCells = this.chooseCell(1);
        var grassCell = rand(grassCells);
        var grasseaterCells = this.chooseCell(2);
        var grasseaterCell = rand(grasseaterCells);
        var predatorCells = this.chooseCell(3);
        var predatorCell = rand(predatorCells);
        var fireCells = this.chooseCell(5);
        var fireCell = rand(fireCells);
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





