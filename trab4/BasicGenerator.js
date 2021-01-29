import {cell} from "./Cell.js";
import {BasicIcon} from "./BasicIcon.js";

export class BasicGenerator{

    constructor(numtypes, seed = null){
        this.__numtypes = numtypes;
    }

    // função que retorna um icone aleatório
    generate(){
        var icon = new BasicIcon(Math.floor(Math.random() * this.__numtypes));
        return icon;
    }

    // função que recebe uma grid e altera todos os valores para icons aleatórios
    initialize(grid, bool){
        for(var i = 0; i < grid.length; i++){
            for(var j = 0; j < grid[0].length; j++){
                grid[i][j] = this.generate();
            }
        }
    } 
}