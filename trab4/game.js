import {GameImpl} from "./GameImpl.js"
import {cell} from "./Cell.js"
import {BasicGenerator} from "./BasicGenerator.js"

var colors = ["rgb(255,0,0)", "rgb(0,255,0)", "rgb(0,0,255)", "rgb(255,255,255)", "rgb(120,120,120)" ,"rgb(0,0,0)"]
var grid = []
for(var i=0;i<10;i++){
    grid[i] = []
    for(var j=0;j<10;j++){
        grid[i][j] = null
    }
}
var clicked = false;
var cells = [];

var bd = document.getElementById("bd");
bd.style.cssText = "width:" + screen.width + "px; height:" + screen.height + "px;"

var bg = document.getElementById("bg");

function createSquare(i,j){
    var color;
    try{
        color = colors[game.getIcon(i,j).getType()];
    }catch{color = colors[5]}finally{}

    grid[i][j] = new cell(i,j,game.getIcon(i,j));

    var simbol = document.createElement("div");
    simbol.onclick = function(){
        var col = this.style.left;
            col = parseInt(col.substring(0, col.length-2));
            col = col/50
            var row = this.style.top;
            row = parseInt(row.substring(0, row.length-2));
            row = row/50

        if(!clicked){
            cells = [row,col]
            clicked = true;
        }else{
            swap(cells[0],cells[1], row, col);
            cells = []
            clicked = false;
        }
    }
    simbol.classList.add("shape");
    simbol.style.cssText = 'width:' + 50 + 'px; height:' + 50 + 'px; top:' + i*50 + 'px; left:' + j*50 + 'px; background-color:' + color;
    return simbol;
}

// function Start(){

//     for(var i=0; i<10; i++){
//         for(var j=0; j<10; j++){
//             document.getElementById("bg").appendChild(createSquare(i,j));
//         }
//     }
// }

function swap(i,j,k,l){
    var cond = game.select([grid[i][j], grid[k][l]]);
    console.log(cond)
    if(cond){
        game.removeAllRuns();
    }
    refresh();
}

function initialize(){
    while(game.findRuns(true).length>0){
        for(var i=0; i<game.getWidth();i++){
            game.collapseColumn(i);
            game.fillColumn(i);
        } 
    }
    refresh();
}

function refresh(){
    document.getElementById("bg").innerHTML = "";
    for(var i=0; i<10; i++){
        for(var j=0; j<10; j++){
            document.getElementById("bg").appendChild(createSquare(i,j));
        }
    }
    document.getElementById("score").innerHTML = game.getScore();
}

// Start()

var gen = new BasicGenerator(5);
var game = new GameImpl(10,10,gen);
refresh();






