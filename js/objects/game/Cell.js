/*
*  Cell constructor
* */
function Cell(game,parent,id,size,row,col) {
    this.Game = game;
    this.parent=parent;
    this.id=id;
    this.size=size;
    this.row=row;
    this.col=col;

    this.x=200+(this.size*this.col);
    this.y=this.size*this.row;

    this.init();
    this.myBBox = this.getMyBBox();
}//end Player constructor

//Inherit AjaxFunction
Cell.prototype = new AjaxFunction();

//Cell init function
Cell.prototype.init = function() {
    this.object = this.create();
    this.parent.append(this.object);
};//end Cell.init

//Create the board
Cell.prototype.create = function() {
    let Cell = this;
    let rectEle = document.createElementNS(Cell.Game.svgns,'rect');
    rectEle.setAttributeNS(null,'x',Cell.x+'px');
    rectEle.setAttributeNS(null,'y',Cell.y+'px');
    rectEle.setAttributeNS(null,'width',Cell.size+'px');
    rectEle.setAttributeNS(null,'height',Cell.size+'px');
    rectEle.setAttributeNS(null,'class','battleship_cell');
    rectEle.setAttributeNS(null,'id',Cell.id);
    return rectEle;
};//end Cell.create

//Get Cell BBox
Cell.prototype.getMyBBox = function() {
    return this.object.getBBox();
};//end Cell.getMyBBox

//Get Cell center X
Cell.prototype.getCenterX = function() {
    return (this.x+(this.size/2));
};//end Cell.getCenterX

//Get Cell center Y
Cell.prototype.getCenterY = function() {
    return (this.y+(this.size/2));
};//end Cell.getCenterY