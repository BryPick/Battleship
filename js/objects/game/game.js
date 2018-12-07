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
    $("body").css("background","url(img/battleshipbackground.jpg)");
};//end Game.init