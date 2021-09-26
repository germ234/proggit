let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature{
    constructor(x, y, index){
        super(x, y, index);
        this.mulyiply = 0;
    }

     
    mul () {
        this.multiply++;
        var emptyCells = super.chooseCell(0);
        var emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
 
        // console.log(emptyCells);
        if(emptyCell && this.multiply >= 8){
            var newX = emptyCell[0];
            var newY = emptyCell[1];
            matrix[newX][newY] = 1;
 
            var gr = new Grass(newX, newY);
            grassArr.push(gr);
            this.multiply = 0;
        }
        if (weath == "winter") {
            this.energy -= 2;
            this.multiply -= 2;
        }
        if (weath == "spring") {
            this.energy += 5;
            this.multiply += 5;
        }
        if (weath == "summer") {
            this.energy += 3;
            this.multiply += 3;
        }
        if (weath == "autumn") {
            this.energy--;
            this.multiply--;
        }
    }
 
}
