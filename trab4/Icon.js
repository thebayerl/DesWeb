// Interface representing an icon or block in a 
// Bejeweled-like matching game. At a minimum, each
// icon encapsulates an integer, referred to as its "type".
export class Icon{
     
    // Returns the type of this icon.
    // @return
    // type of this icon
    constructor(type){
        this.__type = type;
    }

    getType(){
        this.__type = type;
    }
}
