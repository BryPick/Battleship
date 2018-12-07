/*
*  Game constructor
* */
function Game(id) {
    this.id = id;
    this.init();
}//end Game constructor

//Inherit AjaxFunction
Game.prototype = new AjaxFunction();

//Game init function
Game.prototype.init = function() {

};//end Game.init