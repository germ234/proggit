let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let waterArr = [];
let fireArr = [];
var matrix = [];
 
function matrixGen(n, gr, grEat, predator, water, fire){
    for(let x = 0; x < n; x++){
        matrix[x] = []
        for(let y = 0; y < n; y++){
            matrix[x][y] = 0
        }
    }

     for(let i = 0; i < gr; i++){
        let x = Math.floor(Math.random() * n)
        let y = Math.floor(Math.random() * n)

        if(matrix[x][y] == 0){
            matrix[x][y] = 1
        }else{
            i--
        }
    }

    for(let i = 0; i < grEat; i++){
        let x = Math.floor(Math.random() * n)
        let y = Math.floor(Math.random() * n)

        if(matrix[x][y] == 0){
            matrix[x][y] = 2
        }else{
            i--
        }
    }

    for(let i = 0; i < predator; i++){
        let x = Math.floor(Math.random() * n)
        let y = Math.floor(Math.random() * n)

        if(matrix[x][y] == 0){
            matrix[x][y] = 3
        }else{
            i--
        }
    }
    
    for(let i = 0; i < water; i++){
        let x = Math.floor(Math.random() * n)
        let y = Math.floor(Math.random() * n)

        if(matrix[x][y] == 0){
            matrix[x][y] = 4
        }else{
            i--
        }
    }
    
    for(let i = 0; i < fire; i++){
        let x = Math.floor(Math.random() * n)
        let y = Math.floor(Math.random() * n)

        if(matrix[x][y] == 0){
            matrix[x][y] = 5
        }else{
            i--
        }
    } 
}



function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

var side = 15;

function setup(){
    matrixGen(45, 1350, 400, 10, 1, 2)
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('pink');
    // var gr = new Grass(1, 2, 1);
    // var emptyCells = gr.chooseCell(0);
    // console.log(emptyCells);
    for(var x = 0; x < matrix.length; x++){
        for(var y = 0; y < matrix[x].length; y++){
            if(matrix[x][y] == 1){
                var gr = new Grass(x, y);
                grassArr.push(gr);
            }else if(matrix[x][y] == 2){
                let great = new GrassEater(x, y);
                grassEaterArr.push(great);
            }else if(matrix[x][y] == 3){
                let predator = new Predator(x, y);
                predatorArr.push(predator);
            }else if(matrix[x][y] == 4){
                let water = new Water(x, y);
                waterArr.push(water);
            }else if(matrix[x][y] == 5){
                let fire = new Fire(x, y);
                fireArr.push(fire);
            }
        }
    }
}

function draw(){
    for(var x = 0; x < matrix.length; x++){
        for(var y = 0; y < matrix[x].length; y++){

            if(matrix[x][y] == 1){
                fill('green');
            }else if(matrix[x][y] == 0){
                fill('grey');
            }else if(matrix[x][y] == 2){
                fill('yellow');
            }else if(matrix[x][y] == 3){
                fill('red');
            }else if(matrix[x][y] == 4){
                fill('blue');
            }else if(matrix[x][y] == 5){
                fill('#4d0000');
            }
            rect(y * side, x * side, side, side)
        }
    }
    for(var i in grassArr){
        grassArr[i].mul();
    }   

    for (const i in grassEaterArr) {
        grassEaterArr[i].eat();
    }

    for (const i in predatorArr) {
        predatorArr[i].eat();
    }

    for (const i in waterArr) {
        waterArr[i].mul();
    }

    for (const i in fireArr) {
        fireArr[i].mul();
    }

    // console.log(grassArr.length);
    // console.log(fireArr.length);
    // console.log(fireArr.length);
    
    // for(const i in matrix){
    //     if(waterArr.length == 2025){
    //         waterArr.length = 0;
    //         setup();
    //     }
    // }


}