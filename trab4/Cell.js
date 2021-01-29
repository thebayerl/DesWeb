 import {BasicIcon} from "./BasicIcon.js"
 // Class that represents a grid position with an
 // icon. Optionally, it is possible to record a previous
 // row for the icon.
 export class cell{

    // Constructs a Cell with the given row, column, and Icon.
    // The previous row is the same as the given row.
    // 
    // @param row row for this cell.
    // @param col column for this cell.
    // @param icon the Icon in this cell.
    constructor(row, col, icon){
        // Row for this cell.
        this.__row = row;
        // Column for this cell.
        this.__col = col;
        // Icon in this cell.
        this.__icon = icon;
        // Previous row for this cell, if applicable.
        this.__previousRow = row;
    }
  
  
   // Returns the previous row for this cell.
   // @return
   //   previous row for this cell
    previousRow(){
        return this.__previousRow;
    }

    // Sets the previous row for this cell.
    // @param row
    //   previous row for this cell
    previousRow(row){
        this.__previousRow = row;
    }

    // Returns the Icon in this cell.
    // @return
    //   the Icon in this cell
    getIcon(){
        return this.__icon;
    }

    // Returns the row of this cell
    // @return
    //   row of this cell
    row(){
        return this.__row;
    }
  
    // Returns the column of this cell
    // @return
    //   column of this cell
    col(){
        return this.__col;
    }
  
    // Determines whether this cell has the same position
    // as a given cell.
    // @param other
    //   the cell to compare with this one
    // @return
    //   True if the given cell has the same row and column
    //   as this one
    samePosition(other){
        return this.__row == other.__row && this.__col == other.__col;
    }   

   // Determines whether this cell is adjacent by row or column
   // to a given cell.
   // @param other
   //   the cell to test with this one.
   // @return
   //   True if the given cell is adjacent to this one.
    isAdjacent(other){
        return  (this.col() == other.col() && Math.abs(this.row() - other.row()) == 1) || (this.row() == other.row() && Math.abs(this.col() - other.col()) == 1); 
    }

    // Cell in grid testing. 
    //
    // @param w right limit.
    // @param h bottom limit.
    inGrid(w,h){
        return this.row() >= 0 && this.row() < h && this.col() >= 0 && this.col() < w;
    }
    // Return whether two cells have the same content. 
    //
    // @param other cell to test with this one.
    // @return True if this cell is at the same position 
    //         and has the same icon type of other. 
    __eq__(other){
        return this.samePosition(other) && this.getIcon() == other.getIcon();
    }

    // Returns a String representation of this Cell in the form:
    // <pre>
    // [(row, column) icon]
    // </pre>
    // if row is the same as the previous row, or
    // <pre>
    // [(row, column) icon (previous row)]
    // </pre>
    // otherwise.
    __repr__(){
        if( this.getIcon() == null){
            icon = '*' 
        }else{
            str(this.getIcon().getType());
        }
        stx = "(" + this.row() + "," + this.col() + ") "  + icon;
        if (this.row() != this.previousRow){
            stx += "(" + this.previousRow + ")";
        }
        return "[" + stx + "]";
    }
}