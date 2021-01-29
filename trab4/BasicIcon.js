import { Icon } from "./Icon.js";

// Basic implementation of the Icon interface.
export class BasicIcon{

   // Constructs an icon of the given type.
   // @param type
   //   type for this icon
    constructor(type){
        // Type of this icon.
        this.__type = type;
    }

    // Returns the type of this icon. 
    // @return type of this icon.
    getType(){
        return this.__type;
    }

    // Return whether two icons have the same type. 
    __eq__(obj){
        if( obj == null || this.__type == null || typeof(this) != typeof(this)){
            return false;
        }

        return this.__type == obj.__type;
    }

    // Return a string representaion of this icon.
    __repr__(){
        return str(self.__type);
    }
}