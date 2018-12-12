/*
*  Ship constructor
* */
function Ship(type, x, y, width, height, isSunk, shipShape,id, className, Game, yoursOrOpp) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isSunk = isSunk;
    this.shipShape = shipShape;
    this.id = id;
    this.className = className;
    this.Game = Game;
    this.yoursOrOpp = yoursOrOpp;
    this.orientation;
    this.init();
}//end Ship.constructor

Ship.prototype.init = function() {
    //Get different types of ships created
    this.object = new window[this.type](this);
    if(this.yoursOrOpp === "yours") {
        document.getElementsByTagName("svg")[0].appendChild(this.object.ship);
    }else {
        document.getElementsByTagName("svg")[1].appendChild(this.object.ship);
    }
    return this.object.ship;
};//end Ship.init

function Carrier(parent) {
    this.parent = parent;
    this.ship = document.createElementNS(this.parent.Game.svgns, "rect");
    this.ship.setAttributeNS(null,"x",this.parent.x+"px");
    this.ship.setAttributeNS(null,"y",this.parent.y+"px");

    this.ship.setAttributeNS(null,"width",this.parent.width+"px");
    this.ship.setAttributeNS(null,"height",this.parent.height+"px");
    this.ship.setAttributeNS(null,"id",this.parent.id);
    this.ship.setAttributeNS(null,"class",this.parent.className);

    return this;
}//end Carrier.constructor

function Battleship(parent) {
    this.parent = parent;
    this.ship = document.createElementNS(this.parent.Game.svgns, "ellipse");
    this.ship.setAttributeNS(null,"cx",this.parent.x+"px");
    this.ship.setAttributeNS(null,"cy",this.parent.y+"px");

    this.ship.setAttributeNS(null,"rx",this.parent.width+"px");
    this.ship.setAttributeNS(null,"ry",this.parent.height+"px");
    this.ship.setAttributeNS(null,"id",this.parent.id);
    this.ship.setAttributeNS(null,"class",this.parent.className);

    return this;
}//end Battleship.constructor

function Submarine(parent) {
    this.parent = parent;
    this.ship = document.createElementNS(this.parent.Game.svgns, "ellipse");
    this.ship.setAttributeNS(null,"cx",this.parent.x+"px");
    this.ship.setAttributeNS(null,"cy",this.parent.y+"px");

    this.ship.setAttributeNS(null,"rx",this.parent.width+"px");
    this.ship.setAttributeNS(null,"ry",this.parent.height+"px");
    this.ship.setAttributeNS(null,"id",this.parent.id);
    this.ship.setAttributeNS(null,"class",this.parent.className);

    return this;
}//end Submarine.constructor

function Destroyer(parent) {
    this.parent = parent;
    this.ship = document.createElementNS(this.parent.Game.svgns, "rect");
    this.ship.setAttributeNS(null,"x",this.parent.x+"px");
    this.ship.setAttributeNS(null,"y",this.parent.y+"px");

    this.ship.setAttributeNS(null,"width",this.parent.width+"px");
    this.ship.setAttributeNS(null,"height",this.parent.height+"px");
    this.ship.setAttributeNS(null,"id",this.parent.id);
    this.ship.setAttributeNS(null,"class",this.parent.className);

    return this;
}//end Destroyer.constructor

function PatrolBoat(parent) {
    this.parent = parent;
    this.ship = document.createElementNS(this.parent.Game.svgns, "rect");
    this.ship.setAttributeNS(null,"x",this.parent.x+"px");
    this.ship.setAttributeNS(null,"y",this.parent.y+"px");

    this.ship.setAttributeNS(null,"width",this.parent.width+"px");
    this.ship.setAttributeNS(null,"height",this.parent.height+"px");
    this.ship.setAttributeNS(null,"id",this.parent.id);
    this.ship.setAttributeNS(null,"class",this.parent.className);

    return this;
}//end PatrolBoat.constructor


