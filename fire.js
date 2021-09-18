class Fire extends LivingCreature {

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