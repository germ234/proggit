class Grass extends LivingCreature{
    constructor(x, y, index){
        super(x, y, index);
        this.mulyiply = 0;
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
