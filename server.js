var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

grassArr = [];
grassEaterArr = [];
predatorArr = [];
waterArr = [];
fireArr = [];
matrix = [];

var n = 50;

weath = "winter";
Grass = require("./grass")
GrassEater = require("./grasseater")
Predator = require("./predator")
Fire = require("./fire")
Water = require("./water")

function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 3))
        
    }  
}

io.sockets.emit("send matrix", matrix)



function createObject() {
    for (var x = 0; x < matrix.length; x++) {
        for (var y = 0; y < matrix[x].length; y++) {
            if (matrix[x][y] == 1) {
                matrix[x][y] = 1 
                grassArr.push(new Grass(x, y, 1))
            }
            else if (matrix[y][x] == 2) {
                matrix[y][x] = 2
                grassEaterArr.push(new GrassEater(x, y, 2))
            }
            else if (matrix[x][y] == 3) {
                matrix[x][y] = 3
                predatorArr.push(new Predator(x, y, 3))
            }
            else if (matrix[x][y] == 4) {
                matrix[x][y] = 4
                waterArr.push(new Water(x, y, 4))
            }
            else if (matrix[x][y] == 5) {
                matrix[x][y] = 5
                fireArr.push(new Fire(x, y, 5))
            }
        }
    }
    io.sockets.emit('send matrix', matrix)
}

function game() {
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var i in grassEaterArr) {
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
    io.sockets.emit("send matrix", matrix);
}


setInterval(game, 1000)

function kill() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    waterArr = [];
    fireArr = []
    for (var x = 0; x < matrix.length; x++) {
        for (var y = 0; y < matrix[x].length; y++) {
            matrix[x][y] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGrass() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix.length)
    var y = Math.floor(Math.random() * matrix[0].length)
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix.length)
    var y = Math.floor(Math.random() * matrix[0].length)
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2
            grassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addPredator() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix.length)
    var y = Math.floor(Math.random() * matrix[0].length)
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3
            predatorArr.push(new Predator(x, y, 3))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addWater() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix.length)
    var y = Math.floor(Math.random() * matrix[0].length)
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4
            waterArr.push(new Water(x, y, 4))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addFire() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix.length)
    var y = Math.floor(Math.random() * matrix[0].length)
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5
            fireArr.push(new Fire(x, y, 5))
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);


////

io.on('connection', function (socket) {
    createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add predator", addPredator);
    socket.on("add water", addWater);
    socket.on("add fire", addFire)
});

var statistics = {};

setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.water = waterArr.length;
    statistics.fire = fireArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send")
    })
},1000)
