import {GameImpl} from "./GameImpl.js"
import {cell} from "./Cell.js"
import {BasicGenerator} from "./BasicGenerator.js"

// colors and figures to fill the grid
var colors = ["rgb(255,0,0)", "rgb(0,255,0)", "rgb(0,0,255)", "rgb(255,255,255)", "rgb(120,120,120)" ,"rgb(0,0,0)"]
var img = ["url(gemas/red.png)", "url(gemas/blue.png)", "url(gemas/green.png)", "url(gemas/yellow.png)", "url(gemas/purple.png)"]
var grid = []

// grid to simulate the game
for(var i=0;i<10;i++){
    grid[i] = []
    for(var j=0;j<10;j++){
        grid[i][j] = null
    }
}

// var to treat the clicked cells to swap positions
var clicked = false;
var cells = [];

// element that include all cells
var bd = document.getElementById("bd");
bd.style.cssText = "width:" + 1300 + "px; height:" + 470 + "px;"

// function to create a Icon in the screen
// receive i = row and j column
function createSquare(i,j){
    var color;
    var image = "";

    // get the color 
    try{
        color = colors[game.getIcon(i,j).getType()];
        image = img[game.getIcon(i,j).getType()];
    }catch{}finally{}
    
    // create the cell to this position
    grid[i][j] = new cell(i,j,game.getIcon(i,j));

    // create the element to represent the icon and aplly some styles
    var simbol = document.createElement("div");
    simbol.onclick = function(){
        var col = this.style.left;
            col = parseInt(col.substring(0, col.length-2));
            col = col/50
            var row = this.style.top;
            row = parseInt(row.substring(0, row.length-2));
            row = row/50

        if(!clicked){
            var _cell = new cell(i, col, game.getIcon(row,col))
            cells = [_cell]
            clicked = true;
        }else{
            var _cell = new cell(i, col, game.getIcon(row,col))
            swap(cells[0],_cell);
            cells = []
            clicked = false;
        }
    }
    simbol.classList.add("shape");
    simbol.style.cssText = 'width:' + 50 + 'px; height:' + 50 + 'px; top:' + i*50 + 'px; left:' + j*50 + 'px; background-color:' + "" + '; display: block; background-image: ' + image + ';';
    return simbol;
}

// function that move one element to another position
function move(element, dest) {
    //get the current position and remove the "px" in the end
    var pos = element.style.top;
    pos = parseInt(pos.substring(0, pos.length-2));
    var id = setInterval(frame, 0.5);

    // move the element to the position
    function frame() {
      if (pos >= dest) {
        clearInterval(id);
      } else {
        pos++;
        element.style.top = pos + 'px';
      }
    }
}

// function that move two elements to swap position
function move_swp(element1,element2) {
    // get the current position of elements
    var pos1 = element.style.left;
    pos1 = parseInt(pos1.substring(0, pos1.length-2));
    var pos2 = element.style.left;
    pos2 = parseInt(pos2.substring(0, pos2.length-2));
    
    // move the both eklements together
    var id = setInterval(frame, 1);
    function frame() {
      if (pos >= dest) {
        clearInterval(id);
      } else {
        pos1++;
        pos2--;
        element1.style.left = pos1 + 'px';
        element2.style.left = pos2 + 'px';
      }
    }
}

// function that clear cells in a given list
async function destroy(changed){
    var c = bg.childNodes;
    // just set the display to none
    for(i = 0; i<changed.length; i++){
        var cell = changed[i];
        // desapear(c[cell.row()*10 + cell.col()]);
        c[cell.row()*10 + cell.col()].style.display = "none";
    }
    console.log('finish destroy');
}

// function that drop a list of given cells
function drop(changed){
    var c = bg.childNodes;

    // set the position to the start of movement and calls the move function
    for(i = 0; i<changed.length; i++){
        var cell = changed[i];
        if(cell.row() != cell.getpreviousRow()){
            var cell = changed[i];
            var elem = c[cell.row()*10 + cell.col()];
            elem.style.backgroundImage = img[cell.getIcon().getType()];
            elem.style.top = cell.getpreviousRow()*50 + "px";
            elem.style.display = "block";
            move(elem, cell.row()*50);
        }else{
            c[cell.row()*10 + cell.col()].style.display = "none";
        }
    }
    console.log('finish drop');
}

//fill the grid based on a given cells list
async function fill(changed){
    var c = bg.childNodes;
    
    //set the start position and calls move function
    for(i = 0; i<changed.length; i++){
        var cell = changed[i];
        var elem = c[cell.row()*10 + cell.col()];
        elem.style.backgroundImage = img[cell.getIcon().getType()];
        elem.style.top = cell.getpreviousRow()*50 + "px";
        elem.style.display = "block";
        elem.style.zIndex =-2;
        move(elem, cell.row()*50);
    }
    console.log('finish fill');
}

//function sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function swap_pos(i,j,k,l, uns){
    var c = bg.childNodes;
    var iconA = game.getIcon(i,j);
    var iconB = game.getIcon(k,l);
    var A = c[i*10 + j];
    var B = c[k*10 + l];

    A.style.backgroundImage = img[game.getIcon(i,j).getType()];
    B.style.backgroundImage = img[game.getIcon(k,l).getType()];

    if(uns){
        A.style.backgroundImage = img[game.getIcon(k,l).getType()];
        B.style.backgroundImage = img[game.getIcon(i,j).getType()];
    }
    
    
    if(i==k){
        var a = 1;
        var b = -1;
        A.style.left = l*50 + "px";
        B.style.left = j*50 + "px";
        if(j<l){
            a = -1;
            b = 1;
        }
        var posA = A.style.left;
        posA = parseInt(posA.substring(0, posA.length-2));
        var posB = B.style.left;
        posB = parseInt(posB.substring(0, posB.length-2));  
        
        var id = setInterval(frame, 1);
        function frame() {
            if (posA == j*50) {
                clearInterval(id);
            } else {
                posA += a;
                posB += b;
                A.style.left = posA + 'px';
                B.style.left = posB + 'px';
            }
        }
    }else{
        var a = 1;
        var b = -1;
        A.style.top = k*50 + "px";
        B.style.top = i*50 + "px";

        if(i<k){
            a = -1;
            b = 1;
        }

        var posA = A.style.top;
        posA = parseInt(posA.substring(0, posA.length-2));
        var posB = B.style.top;
        posB = parseInt(posB.substring(0, posB.length-2));  

        var id = setInterval(frame, 1);
        function frame() {
            if (posA == i*50) {
                clearInterval(id);
            } else {
                posA += a;
                posB += b;
                A.style.top = posA + 'px';
                B.style.top = posB + 'px';
            }
        }
    }
}

async function swap(cellA,cellB){

    // get the cells coords
    var i = cellA.row();
    var j = cellA.col();
    var k = cellB.row();
    var l = cellB.col();

    //get the changed cells
    var changed  = []

    //dont try the change if isnt adjacent
    if(!cellA.isAdjacent(cellB)){
        return 0;
    }

    //use to the icons only apear in the grid, and the player dont swap other icons during the animations
    bg.style.zIndex = "-1";

    // change the cells location
    swap_pos(i,j,k,l,true);

    //check if the create any run
    var cond = game.select([grid[i][j], grid[k][l]]);

    await sleep(500);

    if(cond){
        // if yes, destroy, drop and fill the icons based on changed return from remove all runs
        while(game.findRuns(false).length>0){
            changed = game.removeAllRuns();
            console.log(changed);
            destroy(changed[0])
            await sleep(1000);
            drop(changed[1]);
            // await sleep(500);
            fill(changed[2]);
            await sleep(1000);
            refresh();
        }
    }else{
        //unchange positions if none run was created
        swap_pos(i,j,k,l,false)
        await sleep(500);
    }
    refresh();
    // reset index to let the player click and swap the next icons
    bg.style.zIndex = "0";
}

// refresh the game screen based on game grid
function refresh(){
    //clear all the icons
    document.getElementById("bg").innerHTML = "";
    for(var i=0; i<10; i++){
        for(var j=0; j<10; j++){
            //create new icons based on the game grid
            document.getElementById("bg").appendChild(createSquare(i,j));
        }
    }
    //refresh the score board
    document.getElementById("score").innerHTML = game.getScore();
}

// restart the game
function reset(){
    gen = new BasicGenerator(5);
    game = new GameImpl(10,10,gen);
    refresh();
}

// create reset button
var resetbt = document.getElementById("resetbt");
resetbt.addEventListener("click", reset);

//start a new game
var gen = new BasicGenerator(5);
var game = new GameImpl(10,10,gen);
refresh();






