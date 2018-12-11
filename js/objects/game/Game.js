/*
*  Game constructor
* */
function Game(id, yourUsername, oppUsername) {
    this.xhtmlns = "http://www.w3.org/1999/xhtml";
    this.svgns = "http://www.w3.org/2000/svg";
    this.id = id;
    this.BOARDX = 200;
    this.BOARDY = 0;
    this.BOARDWIDTH = 10;
    this.BOARDHEIGHT = 10;
    this.boardArray = new Array();
    this.CELLSIZE = 60;
    this.yourUsername = yourUsername;
    this.oppUsername = oppUsername;

    //Drag related variables
    this.mover = '';
    this.myCX;
    this.myCY;
    this.myX;
    this.myY;
    this.init();
}//end Game constructor

//Inherit AjaxFunction
Game.prototype = new AjaxFunction();

//Game init function
Game.prototype.init = function() {
    let Game = this;

    $("body").css("background","url(img/battleshipbackground.png)");
    this.createYourBoard();
    this.createOpponentsBoard();
    this.getChat();
    this.keepScrollBottom();
    this.showOppenentsBoard();
    this.showYourBoard();

    /* Set drag functions */

    //Add event listener to SVG tag on mouse move
    // document.getElementsByTagName('svg')[0].addEventListener('mousemove',Game.moveShip,false);
    $('svg').on("mousemove", function() {
        Game.moveShip(event);
    });

    //Add event listener to SVG body to drop ship
    $('svg').on("mouseup", function() {
        Game.stopDrag();
    });


    //Add mouse down actions for each ship
    $("#carrier-rect-ship").on("mousedown", function() {
        Game.startDrag(this.id);
    });
    $("#battleship-oval-ship").on("mousedown", function() {
        Game.startDrag(this.id);
    });
    $("#submarine-oval-ship").on("mousedown", function() {
        Game.startDrag(this.id);
    });
    $("#destroyer-rect-ship").on("mousedown", function() {
        Game.startDrag(this.id);
    });
    $("#patrol-rect-ship").on("mousedown", function() {
        Game.startDrag(this.id);
    });
};//end Game.init

//Create the opponent's board
Game.prototype.createOpponentsBoard = function() {
    let Game = this;
    //Create parent to stick board in
    let gEle = document.createElementNS(Game.svgns, 'g');
    gEle.setAttributeNS(null,'transform','translate('+Game.BOARDX+','+Game.BOARDY+')');
    gEle.setAttributeNS(null,'id','gId_'+Game.id+"_"+Game.oppUsername);
    //Add board to SVG div
    $("#opponents-board").find("svg").find("rect:nth-child(1)").after(gEle);

    //Create cells
    for(i = 0; i < Game.BOARDWIDTH; i++) {
        Game.boardArray[i] = new Array();
        for(j = 0; j < Game.BOARDHEIGHT; j++) {
            Game.boardArray[i][j] = new Cell(Game,$("#gId_"+Game.id+"_"+Game.oppUsername),'cell_'+j+'|'+i,Game.CELLSIZE,j,i);
        }
    }
};//end Game.createOpponentsBoard

//Create "your board"
Game.prototype.createYourBoard = function () {
    let Game = this;
    //Create parent to stick board in
    let gEle = document.createElementNS(Game.svgns, 'g');
    // gEle.setAttributeNS(null,'transform','translate('+Game.BOARDX+','+Game.BOARDY+')');
    gEle.setAttributeNS(null,'id','gId_'+Game.id+"_"+Game.yourUsername);
    //Add board to SVG div
    $("#your-board").find("svg").find("rect:nth-child(1)").after(gEle);

    //Create cells
    for(i = 0; i < Game.BOARDWIDTH; i++) {
        Game.boardArray[i] = new Array();
        for(j = 0; j < Game.BOARDHEIGHT; j++) {
            Game.boardArray[i][j] = new Cell(Game,$("#gId_"+Game.id+"_"+Game.yourUsername),'cell_'+j+'|'+i,Game.CELLSIZE,j,i);
        }
    }
};//end Game.createYourBoard

//Get the chat for the game
Game.prototype.getChat = function() {
    let Game = this;
    let timer = setInterval(function() {
        let getChatMsgs = Game.ajaxCall('get', true, {service: 'game', func: 'getChat'});
        $.when(getChatMsgs).then(function(getChatMsgsRes) {
            if(getChatMsgsRes['getChatResponse']) {
                $("#game-chat-box").append($("<p>").text(getChatMsgsRes['getChatResponse'][0]['playerUsername']+": "
                    +getChatMsgsRes['getChatResponse'][0]['msg']));
            }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            $("#game-chat-box").append($("<p>").addClass('chat-err-msg').text("Error: Could not get chat"));
        });
    }, 1000);
};//end Game.getChat

//Check if the ship being place on the board is on a spot
//"Length" used for oval ellipse ships
Game.prototype.isSpot = function(x, y, shipShape, length) {
    let Game = this;

    //Number of rows
    for(i=0;i<Game.BOARDHEIGHT;i++) {
        for(j=0;j<Game.BOARDWIDTH;j++) {
            let myBox = document.getElementById('cell_'+j+'|'+i).getBBox();
            //how do I know if the cursor is within this BBox()?
            if(x>myBox.x && x<(myBox.x+myBox.width) && y>myBox.y && y<(myBox.y+myBox.height)){
                let maxY = (Game.CELLSIZE * Game.BOARDHEIGHT);
                if(shipShape === "rect") {
                    //Check to make sure the ship fits inside the board
                    if(Game.boardArray[i][j].y+length <= maxY){
                        //Lock the rectangle to the top of the cell
                        document.getElementById(Game.mover).setAttributeNS(null,'x',Game.boardArray[i][j].x);
                        document.getElementById(Game.mover).setAttributeNS(null,'y',Game.boardArray[i][j].y);

                        return true
                    }
                }else if(shipShape === "oval") {
                    let evenOddLength = (length / 60) % 2;

                    //Determine if ellipse ship length is even or odd
                    //Even or odd ship lengths change how you place the ship
                    if(evenOddLength === 0) {
                        if(Game.boardArray[i][j].y+(length/2) <= maxY) {
                            document.getElementById(Game.mover).setAttributeNS(null,'cx',Game.boardArray[i][j].getCenterX());
                            document.getElementById(Game.mover).setAttributeNS(null,'cy',Game.boardArray[i][j].y);
                            return true;
                        }
                    }else {
                        if(Game.boardArray[i][j].getCenterY()+(length/2) <= maxY){
                            document.getElementById(Game.mover).setAttributeNS(null,'cx',Game.boardArray[i][j].getCenterX());
                            document.getElementById(Game.mover).setAttributeNS(null,'cy',Game.boardArray[i][j].getCenterY());
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
};//end Game.isSpot

//Keeps overflow scrollbar at the bottom when new messages are added
Game.prototype.keepScrollBottom = function () {
    let gameChatBox = document.querySelector("#game-chat-box");
    gameChatBox.scrollTop = gameChatBox.scrollHeight - gameChatBox.clientHeight;
};//end Game.keepScrollBottom

//Handle getting the coordinates of moving ship
Game.prototype.moveShip = function(evt) {
    let Game = this;
    if(Game.mover !== '') {
        let thisShip = document.getElementById(Game.mover);
        let shipShape = Game.mover.split('-')[1];
        if (shipShape === "rect") {
            if(evt.offsetX) {
                thisShip.setAttributeNS(null,'x',evt.offsetX+"px");
                thisShip.setAttributeNS(null,'y',evt.offsetY+"px");
            }else {
                thisShip.setAttributeNS(null,'x',evt.layerX+"px");
                thisShip.setAttributeNS(null,'y',evt.layerY+"px");
            }
        } else if (shipShape === "oval") {
            if(evt.offsetX) {
                thisShip.setAttributeNS(null,'cx',evt.offsetX+"px");
                thisShip.setAttributeNS(null,'cy',evt.offsetY+"px");
            }else {
                thisShip.setAttributeNS(null,'cx',evt.layerX+"px");
                thisShip.setAttributeNS(null,'cy',evt.layerY+"px");
            }
        }
    }
};//end Game.moveShip

//Click "Your Board" button to show your board
Game.prototype.showYourBoard = function() {
    $("#your-board-btn").on("click", function() {
        $("#opponents-board").hide();
        $("#your-board").show();
    });
};//end Game.showYourBoard

//Click "Opponents Board" button to show opponents board
Game.prototype.showOppenentsBoard = function() {
    $("#opp-board-btn").on("click", function() {
        $("#your-board").hide();
        $("#opponents-board").show();
    });
};//end Game.showOppenentsBoard

//Set drag attributes on the start of dragging a ship
Game.prototype.startDrag = function(id) {
    let Game = this;
    let shipShape = id.split('-')[1];

    if(shipShape === "rect") {
        Game.myX = document.getElementById(id).getAttributeNS(null, 'x');
        Game.myY = document.getElementById(id).getAttributeNS(null, 'y');
        Game.mover = id;
    }else if(shipShape === "oval") {
        Game.myCX = document.getElementById(id).getAttributeNS(null, 'cx');
        Game.myCY = document.getElementById(id).getAttributeNS(null, 'cy');
        Game.mover = id;
    }
};//end Game.startDrag

//Handle dropping the ship on the board
Game.prototype.stopDrag = function() {
    let Game = this;
    if(Game.mover != '') {
        let thisShip = document.getElementById(Game.mover);
        let shipShape = Game.mover.split('-')[1];
        //Determine the shape of the ship first
        if(shipShape === "rect") {
            let currX = parseInt(thisShip.getAttributeNS(null,'x'));
            let currY = parseInt(thisShip.getAttributeNS(null,'y'));
            let lengthOfShip = parseInt(thisShip.getAttributeNS(null,'height').split("px")[0]);

            //Check if spot is droppable
            let isSpot = Game.isSpot(currX, currY, shipShape, lengthOfShip);
            if(isSpot) {

            }else {
                //Reset back to original position
                thisShip.setAttributeNS(null,'x',Game.myX);
                thisShip.setAttributeNS(null,'y',Game.myY)
            }
            Game.mover = '';
        }else if(shipShape === "oval"){
            let currX = parseInt(thisShip.getAttributeNS(null,'cx'));
            let currY = parseInt(thisShip.getAttributeNS(null,'cy'));
            let lengthOfShip = parseInt(thisShip.getAttributeNS(null,'ry').split("px")[0]) * 2;

            //Check if spot is droppable
            let isSpot = Game.isSpot(currX, currY, shipShape, lengthOfShip);
            if(isSpot) {

            }else {
                //Reset back to original position
                thisShip.setAttributeNS(null,'cx',Game.myCX);
                thisShip.setAttributeNS(null,'cy',Game.myCY);
            }
            Game.mover = '';
        }
    }
};//end Game.stopDrag