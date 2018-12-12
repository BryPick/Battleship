/*
*  Game constructor
* */
function Game(id, yourUsername, oppUsername, currPlayer) {
    this.xhtmlns = "http://www.w3.org/1999/xhtml";
    this.svgns = "http://www.w3.org/2000/svg";
    this.id = id;
    this.BOARDX = 200;
    this.BOARDY = 0;
    this.BOARDWIDTH = 10;
    this.BOARDHEIGHT = 10;
    this.yourBoardArray = new Array();
    this.oppBoardArray = new Array();
    this.CELLSIZE = 60;
    this.currPlayer = currPlayer;
    if(this.currPlayer.playerNumber === "1") {
        this.oppPlayerNum = 2;
    }else {
        this.oppPlayerNum = 1;
    }
    this.numberOfShips = 5;
    this.yourUsername = yourUsername;
    this.yourShipArray = new Array();
    this.oppUsername = oppUsername;
    this.oppShipArray = new Array();
    this.currPlayersTurn = '';

    //Drag related variables
    this.mover = '';
    this.movingShip;
    this.movingShipIndex = 0;
    this.shipShape = '';
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
    this.showInitialSetupMsg();
    this.hideChat();
    this.finishSetup();
    this.finishSetupInsert();
    /*this.checkIfOurTurn();
    this.checkIfNotOurTurn();*/
    this.fire();

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
    $("#battleship-ellipse-ship").on("mousedown", function() {
        Game.startDrag(this.id);
    });
    $("#submarine-ellipse-ship").on("mousedown", function() {
        Game.startDrag(this.id);
    });
    $("#destroyer-rect-ship").on("mousedown", function() {
        Game.startDrag(this.id);
    });
    $("#patrol-rect-ship").on("mousedown", function() {
        Game.startDrag(this.id);
    });
};//end Game.init

//User choosing square
Game.prototype.chooseSquare = function(evt) {
    let Game = this;
    $("#ingame-popup").modal('show');
    $("#ingame-popup").find(".modal-footer").empty();
    $("#ingame-popup").find(".modal-body").empty();

    $("#ingame-popup").find(".modal-footer").append($("<button>").addClass("btn btn-secondary").attr({"id":"cancel-hit-btn", "data-dismiss":"modal"}).text("Cancel"));
    $("#ingame-popup").find(".modal-footer").append($("<button>").addClass("btn btn-danger").attr({"id":"conf-hit-btn"}).text("Fire"));
    $("#ingame-popup").find(".modal-body").text("x: "+evt.offsetX+" y: "+evt.offsetY);
    $("#ingame-popup-label").text("Fire on this spot?").css("color","white");
};//end Game.chooseSquare

//Check, when initially placing ships, if the ship is on top of another ship
Game.prototype.checkIfOnTopOfShip = function(x, y) {
    let Game = this;

    let onTopOfShip = false;
    //Loop through each ship and see if the moving ship is going to be on top of another ship
    $.each(Game.yourShipArray, function(key, value) {
        //Get the top, middle, and bottom point of a rectangle ship

        //Check if the current dragging ship is an ellipse or a rectangle
        if(Game.movingShip.type !== value.type) {
            if(Game.shipShape === "rect") {
                let topY = y;
                let midY = y + (Game.movingShip.height/2);
                let bottomY = y + (Game.movingShip.height*.87);

                //Check which shape you're placing on top of
                if(value.shipShape === "rect") {
                    let valuesMinX = value.x;
                    let valuesMaxX = value.x + value.width;

                    let valuesMinY = value.y;
                    let valuesMaxY = value.y + value.height;

                    //Check the top, mid, and bottom points to see if they are on top of a ship
                    if((valuesMinX <= x && x <= valuesMaxX) && (valuesMinY <= topY && topY <= valuesMaxY)) {
                        onTopOfShip = true;
                        return false;
                    }
                    if((valuesMinX <= x && x <= valuesMaxX) && (valuesMinY <= midY && midY <= valuesMaxY)) {
                        onTopOfShip = true;
                        return false;
                    }
                    if((valuesMinX <= x && x <= valuesMaxX) && (valuesMinY <= bottomY && bottomY <= valuesMaxY)) {
                        onTopOfShip = true;
                        return false;
                    }
                }else if(value.shipShape === "ellipse") {
                    let valuesMinX = value.x - value.width;
                    let valuesMaxX = value.x + value.width;

                    let valuesMinY = value.y - value.height;
                    let valuesMaxY = value.y + value.height;

                    //Check the top, mid, and bottom points to see if they are on top of a ship
                    if((valuesMinX <= x && x <= valuesMaxX) && (valuesMinY <= topY && topY <= valuesMaxY)) {
                        onTopOfShip = true;
                        return false;
                    }
                    if((valuesMinX <= x && x <= valuesMaxX) && (valuesMinY <= midY && midY <= valuesMaxY)) {
                        onTopOfShip = true;
                        return false;
                    }
                    if((valuesMinX <= x && x <= valuesMaxX) && (valuesMinY <= bottomY && bottomY <= valuesMaxY)) {
                        onTopOfShip = true;
                        return false;
                    }
                }
            }else if(Game.shipShape === "ellipse") {
                //Get the top, middle, and bottom point of an ellipse ship
                //The .87 is to move top point check down and move the bottom point check up slightly
                //Allows the player to move ships next to each other
                let topY = y - (Game.movingShip.height*.87);
                let midY = y;
                let bottomY = y + (Game.movingShip.height*.87);

                //Check which shape you're placing on top of
                if(value.shipShape === "rect") {
                    let valuesMinX = value.x;
                    let valuesMaxX = value.x + value.width;

                    let valuesMinY = value.y;
                    let valuesMaxY = value.y + value.height;

                    //Check the top, mid, and bottom points to see if they are on top of a ship
                    if((valuesMinX <= x && x <= valuesMaxX) && (valuesMinY <= topY && topY <= valuesMaxY)) {
                        onTopOfShip = true;
                        return false;
                    }
                    if((valuesMinX <= x && x <= valuesMaxX) && (valuesMinY <= midY && midY <= valuesMaxY)) {
                        onTopOfShip = true;
                        return false;
                    }
                    if((valuesMinX <= x && x <= valuesMaxX) && (valuesMinY <= bottomY && bottomY <= valuesMaxY)) {
                        onTopOfShip = true;
                        return false;
                    }
                }else if(value.shipShape === "ellipse") {
                    let valuesMinX = value.x - value.width;
                    let valuesMaxX = value.x + value.width;

                    let valuesMinY = value.y - value.height;
                    let valuesMaxY = value.y + value.height;

                    //Check the top, mid, and bottom points to see if they are on top of a ship
                    if((valuesMinX <= x && x <= valuesMaxX) && (valuesMinY <= topY && topY <= valuesMaxY)) {
                        onTopOfShip = true;
                        return false;
                    }
                    if((valuesMinX <= x && x <= valuesMaxX) && (valuesMinY <= midY && midY <= valuesMaxY)) {
                        onTopOfShip = true;
                        return false;
                    }
                    if((valuesMinX <= x && x <= valuesMaxX) && (valuesMinY <= bottomY && bottomY <= valuesMaxY)) {
                        onTopOfShip = true;
                        return false;
                    }
                }
            }
        }
    });
    return onTopOfShip;
};//end Game.checkIfOnTopOfShip

//If it's our turn, make the opponent's board guessable (hittable)
Game.prototype.checkIfOurTurn = function() {
    let Game = this;
    // let timer = setInterval(function() {
        if(Game.currPlayersTurn !== '') {
            // clearInterval(timer);
            let ourPlayerNum = "Player"+Game.currPlayer.playerNumber;
            if(ourPlayerNum === Game.currPlayersTurn) {
                $("#gId_"+Game.id+"_"+Game.oppUsername).on("click", function() {
                    Game.chooseSquare(event);
                });
            }
        }
    // }, 1000);
};//end Game.checkIfOurTurn

//If not our turn, wait for a guess
Game.prototype.checkIfNotOurTurn = function() {
    let Game = this;
    $("#gId_"+Game.id+"_"+Game.oppUsername).off();
    let timer = setInterval(function() {
        console.log("hello");
        let data = {gameID: Game.id};
        let waitForGuess = Game.ajaxCall('get', true, {service: "game", func: "getGuess", data: data});
        $.when(waitForGuess).then(function(guess) {
            if(guess['guess']) {
                clearInterval(timer);
                let guessString = guess['guess'].split(" ");
                let guessX = guessString[1];
                let guessY = guessString[3];

                let isGuessHit = false;
                //Loop through each ship and see if the guess was a hit
                for(i=0;i<Game.yourShipArray.length;i++) {
                    if(Game.yourShipArray[i].shipShape === "rect") {
                        if(Game.yourShipArray[i].x <= guessX && guessX <= (Game.yourShipArray[i].x+Game.yourShipArray[i].width) &&
                            Game.yourShipArray[i].y <= guessY && guessY <= Game.yourShipArray[i].y+Game.yourShipArray[i].height) {
                            isGuessHit = true;
                        }
                    }else if(Game.yourShipArray[i].shipShape === "ellipse"){
                        if((Game.yourShipArray[i].x - Game.yourShipArray[i].width) <= guessX && guessX <= (Game.yourShipArray[i].x+Game.yourShipArray[i].width) &&
                            (Game.yourShipArray[i].y - Game.yourShipArray[i].height) <= guessY && guessY <= Game.yourShipArray[i].y+Game.yourShipArray[i].height) {
                            isGuessHit = true;
                        }
                    }
                }
                if(isGuessHit) {
                    $("#ingame-popup").modal('show');
                    $("#ingame-popup").find(".modal-body").hide();
                    $("#ingame-popup").find(".modal-footer").hide();
                    $("#ingame-popup-label").text(Game.oppUsername+" landed a hit!").css("color", "red");
                    setTimeout(function () {
                        let data = {result: "Hit", gameID: Game.id};
                        let sendResult = Game.ajaxCall('post',true,{service: 'game', func: "sendResult", data: data});
                        $.when(sendResult).then(function(sendResult) {
                            if(sendResult['sendResult']) {
                                let newRect = document.createElementNS(Game.svgns,'rect');
                                let newRectX;
                                let newRectY;
                                for(i=0;i<Game.BOARDHEIGHT;i++) {
                                    for (j = 0; j < Game.BOARDWIDTH; j++) {
                                        let myBox = document.getElementById('cell_' + j + '|' + i).getBBox();
                                        if(guessX>myBox.x && guessX<(myBox.x+myBox.width) && guessY>myBox.y && guessY<(myBox.y+myBox.height)){
                                            newRectX = myBox.x;
                                            newRectY = myBox.y;
                                        }
                                    }
                                }

                                newRect.setAttributeNS(null,'x',newRectX+'px');
                                newRect.setAttributeNS(null,'y',newRectY+'px');
                                newRect.setAttributeNS(null,'width',Game.CELLSIZE+'px');
                                newRect.setAttributeNS(null,'height',Game.CELLSIZE+'px');
                                newRect.setAttributeNS(null,'id',"hit-square");
                                $("svg")[0].append(newRect);
                                $("#ingame-popup").modal('hide');
                                Game.checkTurn();
                            }
                        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                            console.log(textStatus);
                        });
                    },2000);
                }else {
                    $("#ingame-popup").modal('show');
                    $("#ingame-popup").find(".modal-body").hide();
                    $("#ingame-popup").find(".modal-footer").hide();
                    $("#ingame-popup-label").text(Game.oppUsername+" missed!").css("color", "white");
                    setTimeout(function () {
                        let data = {result: "Miss", gameID: Game.id};
                        let sendResult = Game.ajaxCall('post',true,{service: 'game', func: "sendResult", data: data});
                        $.when(sendResult).then(function(sendResult) {
                            if(sendResult['sendResult']) {
                                let newRect = document.createElementNS(Game.svgns,'rect');
                                let newRectX;
                                let newRectY;
                                for(i=0;i<Game.BOARDHEIGHT;i++) {
                                    for (j = 0; j < Game.BOARDWIDTH; j++) {
                                        let myBox = document.getElementById('cell_' + j + '|' + i).getBBox();
                                        if(guessX>myBox.x && guessX<(myBox.x+myBox.width) && guessY>myBox.y && guessY<(myBox.y+myBox.height)){
                                            newRectX = myBox.x;
                                            newRectY = myBox.y;
                                        }
                                    }
                                }

                                newRect.setAttributeNS(null,'x',newRectX+'px');
                                newRect.setAttributeNS(null,'y',newRectY+'px');
                                newRect.setAttributeNS(null,'width',Game.CELLSIZE+'px');
                                newRect.setAttributeNS(null,'height',Game.CELLSIZE+'px');
                                newRect.setAttributeNS(null,'id',"miss-square");
                                $("svg")[0].append(newRect);
                                $("#ingame-popup").modal('hide');
                                Game.checkTurn();
                            }
                        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                            console.log(textStatus);
                        });
                    },2000);
                }
            }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
        });
    }, 1000);
};//end Game.checkIfNotOurTurn

//Function to check who's turn it is
Game.prototype.checkTurn = function() {
    let Game = this;
    let currPlayersNum = "Player"+Game.currPlayer.playerNumber;
    let oppPlayersNum = "Player"+Game.oppPlayerNum;

    let timer = setInterval(function() {
        let data = {gameID: Game.id};
        let currPlayersRes = Game.ajaxCall('get',true,{service:"game",func:"checkTurn",data:data});
        $.when(currPlayersRes).then(function(currPlayers) {
            if(currPlayers['currPlayersTurn'] && currPlayers['currPlayersTurn'] !== Game.currPlayersTurn) {
                clearInterval(timer);
                Game.currPlayersTurn = currPlayers['currPlayersTurn'];
                if(currPlayers['currPlayersTurn'] === currPlayersNum) {
                    Game.checkIfOurTurn();
                }else {
                    Game.checkIfNotOurTurn();
                }

                if(currPlayers['currPlayersTurn'] === "Player1") {
                    if($("#player2-username").css("color") === "#e0a93d") {
                        $("#player2-username").css("color","white");
                        $("#player1-username").css("color","#e0a93d");
                    }else {
                        $("#player1-username").css("color","#e0a93d");
                    }
                }else {
                    if($("#player1-username").css("color") === "#e0a93d") {
                        $("#player1-username").css("color","white");
                        $("#player2-username").css("color","#e0a93d");
                    }else {
                        $("#player2-username").css("color","#e0a93d");
                    }
                }
            }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
        });
    },1000);
};//end Game.checkTurn

//Create the opponent's board
Game.prototype.createOpponentsBoard = function() {
    let Game = this;
    //Create parent to stick board in
    let gEle = document.createElementNS(Game.svgns, 'g');
    gEle.setAttributeNS(null,'id','gId_'+Game.id+"_"+Game.oppUsername);
    //Add board to SVG div
    $("#opponents-board").find("svg").find("rect:nth-child(1)").after(gEle);

    //Create cells
    for(i = 0; i < Game.BOARDWIDTH; i++) {
        Game.oppBoardArray[i] = new Array();
        for(j = 0; j < Game.BOARDHEIGHT; j++) {
            Game.oppBoardArray[i][j] = new Cell(Game,$("#gId_"+Game.id+"_"+Game.oppUsername),'cell_'+j+'|'+i,Game.CELLSIZE,j,i);
        }
    }

    //Create ships for "opponent's" board
    Game.oppShipArray[0] = new Ship('Carrier',20,30,60,300,false,"rect","carrier-rect-ship","cls-1",Game, "opponents");
    Game.oppShipArray[1] = new Ship('Battleship',47,475,30,120,false,"ellipse","battleship-ellipse-ship","cls-1",Game, "opponents");
    Game.oppShipArray[2] = new Ship('Submarine',150,120,30,90,false,"ellipse","submarine-ellipse-ship","cls-1",Game, "opponents");
    Game.oppShipArray[3] = new Ship('Destroyer',122,250,60,180,false,"rect","destroyer-rect-ship","cls-1",Game, "opponents");
    Game.oppShipArray[4] = new Ship('PatrolBoat',122,470,60,120,false,"rect","patrol-rect-ship","cls-1",Game, "opponents");
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
        Game.yourBoardArray[i] = new Array();
        for(j = 0; j < Game.BOARDHEIGHT; j++) {
            Game.yourBoardArray[i][j] = new Cell(Game,$("#gId_"+Game.id+"_"+Game.yourUsername),'cell_'+j+'|'+i,Game.CELLSIZE,j,i);
        }
    }

    //Create ships for "your" board
    Game.yourShipArray[0] = new Ship('Carrier',20,30,60,300,false,"rect","carrier-rect-ship","cls-1",Game, "yours");
    Game.yourShipArray[1] = new Ship('Battleship',47,475,30,120,false,"ellipse","battleship-ellipse-ship","cls-1",Game, "yours");
    Game.yourShipArray[2] = new Ship('Submarine',150,120,30,90,false,"ellipse","submarine-ellipse-ship","cls-1",Game, "yours");
    Game.yourShipArray[3] = new Ship('Destroyer',122,250,60,180,false,"rect","destroyer-rect-ship","cls-1",Game, "yours");
    Game.yourShipArray[4] = new Ship('PatrolBoat',122,470,60,120,false,"rect","patrol-rect-ship","cls-1",Game, "yours");
};//end Game.createYourBoard

//Handles when you finish the setup of the ships
Game.prototype.finishSetup = function() {
    let Game = this;
    $("#finish-setup-btn").on("click", function () {
        $("#close-btn").show();
        $("#close-btn").text("No");
        $("#ingame-popup").find(".modal-body").hide();
        $("#yes-setup-btn").remove();
        $("#acknowledge-btn").remove();

        $("#ingame-popup").find(".modal-footer").append($("<button>").addClass("btn btn-success").attr({"id":"yes-setup-btn"}).text("Yes"));

        $("#ingame-popup").modal('show');
        $("#ingame-popup-label").text("Finish setup?");
    });
};//end Game.finishSetup

Game.prototype.finishSetupInsert = function() {
    let Game = this;
    $("body").on("click","#yes-setup-btn",function () {
        let data = {gameID: Game.id, playerNumber: Game.currPlayer.playerNumber, setupStatus: 'Ready'};
        let finishSetupRes = Game.ajaxCall('post', true, {service: 'game', func: 'finishSetup', data: data});
        $.when(finishSetupRes).then(function(finishSetup) {
            if(finishSetup['setupStatus']) {
                $("#ingame-popup-label").addClass("loading").text("Waiting for other player");
                $("#ingame-popup").find(".modal-footer").hide();
                //The status of the other player
                let timer = setInterval(function() {
                    let data = {gameID: Game.id, oppPlayerNum: Game.oppPlayerNum};
                    let oppPlayerStatus = Game.ajaxCall('get', true, {service: "game", func: "checkOppSetupStatus", data: data});
                    $.when(oppPlayerStatus).then(function(oppPlayer) {
                        //Change modal if the other player is ready
                        if(oppPlayer["oppStatus"] === "Ready") {
                            clearInterval(timer);
                            $("#ingame-popup-label").text("");
                            $("#ingame-popup-label").removeClass("loading");
                            $("#ingame-popup-label").addClass("good-msg").text("Opponent is ready!");
                            setTimeout(function () {
                                $("#finish-setup-btn").hide();
                                // $("#fire-btn").show(); <--Fire button planned to be used for later update
                                //Remove all dragging handlers from ships
                                $("svg").off();
                                Game.showGameInstructionMsg();
                            }, 1000);
                        }
                    }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(textStatus);
                    });
                }, 1000);
            }else {
                $("#ingame-popup-label").addClass("chat-err-msg").text("Could not finish setup");
                setTimeout(function () {
                    $("#ingame-popup").modal('hide');
                    $("#ingame-popup").find(".modal-footer").show();
                }, 2000);
            }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            $("#ingame-popup-label").addClass("chat-err-msg").text("Could not finish setup");
        });
    });
};//end Game.finishSetupInsert

//Handle firing from one player
//Wait for result of fired shot
Game.prototype.fire = function() {
    let Game = this;
    //Clicking the "fire" button on the modal
    $("body").on("click","#conf-hit-btn", function () {
        let guess = $(".modal-body").text();

        $("#ingame-popup-label").addClass("loading").text("Firing shot");
        $("#ingame-popup").find(".modal-footer").hide();
        $("#ingame-popup").find(".modal-body").hide();
        let data = {currentGuess: guess, gameID: Game.id};
        let fireShot = Game.ajaxCall('post', true, {service: "game", func: "fireShot", data: data});
        $.when(fireShot).then(function(fireShotResult) {
            if(fireShotResult["fireShotResult"]) {
                $("#ingame-popup-label").text("Shot successfully fired")

                //Wait for result from opponent
                setTimeout(function () {
                    $("#ingame-popup-label").text("Waiting for result");
                    let timer = setInterval(function () {
                        let data = {gameID: Game.id};
                        let waitForResult = Game.ajaxCall('get', true, {service: "game", func: "getResult", data: data});
                        $.when(waitForResult).then(function(result) {
                            if(result['result']) {
                                clearInterval(timer);
                                if(result['result'] === "Hit") {
                                    $("#ingame-popup-label").text("");
                                    $("#ingame-popup-label").removeClass("loading");
                                    $("#ingame-popup-label").text("Shot hit!");
                                    $("#rader-alert-msg").css("background","rgba(222,26,26,.2)");
                                    $("#radar-hit-msg").show();
                                    //Update database, reset the turn
                                    let data = {currPlayersTurn: Game.currPlayersTurn, gameID: Game.id};
                                    let guessResultUpdate = Game.ajaxCall('post', true, {service: "game", func: "updateGuessResult", data: data});
                                    $.when(guessResultUpdate).then(function(guessUpdate) {
                                        if(guessUpdate['updateResult']) {
                                            $("#ingame-popup").modal('hide');
                                            setTimeout(function() {
                                                //Create new rectangle to put on opponents board
                                                let guessX = guess.split(" ")[1];
                                                let guessY = guess.split(" ")[3];

                                                let newRect = document.createElementNS(Game.svgns,'rect');
                                                let newRectX;
                                                let newRectY;
                                                for(i=0;i<Game.BOARDHEIGHT;i++) {
                                                    for (j = 0; j < Game.BOARDWIDTH; j++) {
                                                        let myBox = document.getElementById('cell_' + j + '|' + i).getBBox();
                                                        if(guessX>myBox.x && guessX<(myBox.x+myBox.width) && guessY>myBox.y && guessY<(myBox.y+myBox.height)){
                                                            newRectX = myBox.x;
                                                            newRectY = myBox.y;
                                                        }
                                                    }
                                                }

                                                newRect.setAttributeNS(null,'x',newRectX+'px');
                                                newRect.setAttributeNS(null,'y',newRectY+'px');
                                                newRect.setAttributeNS(null,'width',Game.CELLSIZE+'px');
                                                newRect.setAttributeNS(null,'height',Game.CELLSIZE+'px');
                                                newRect.setAttributeNS(null,'id',"hit-square");
                                                $("svg")[1].append(newRect);

                                                $("#rader-alert-msg").css("background","");
                                                $("#radar-hit-msg").hide();
                                                Game.checkTurn();
                                            },1000);
                                        }
                                    }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                                        console.log(textStatus);
                                    });
                                }else {
                                    $("#ingame-popup-label").text("");
                                    $("#ingame-popup-label").removeClass("loading");
                                    $("#ingame-popup-label").text("Shot missed!");
                                    $("#rader-alert-msg").css("background","rgba(255,255,255,.2)");
                                    $("#radar-miss-msg").show();
                                    //Update the database, reset the turn
                                    let data = {currPlayersTurn: Game.currPlayersTurn, gameID: Game.id};
                                    let guessResultUpdate = Game.ajaxCall('post', true, {service: "game", func: "updateGuessResult", data: data});
                                    $.when(guessResultUpdate).then(function(guessUpdate) {
                                        if(guessUpdate['updateResult']) {
                                            $("#ingame-popup").modal('hide');
                                            setTimeout(function() {
                                                //Create new rectangle to put on opponents board
                                                let guessX = guess.split(" ")[1];
                                                let guessY = guess.split(" ")[3];

                                                let newRect = document.createElementNS(Game.svgns,'rect');
                                                let newRectX;
                                                let newRectY;
                                                for(i=0;i<Game.BOARDHEIGHT;i++) {
                                                    for (j = 0; j < Game.BOARDWIDTH; j++) {
                                                        let myBox = document.getElementById('cell_' + j + '|' + i).getBBox();
                                                        if(guessX>myBox.x && guessX<(myBox.x+myBox.width) && guessY>myBox.y && guessY<(myBox.y+myBox.height)){
                                                            newRectX = myBox.x;
                                                            newRectY = myBox.y;
                                                        }
                                                    }
                                                }

                                                newRect.setAttributeNS(null,'x',newRectX+'px');
                                                newRect.setAttributeNS(null,'y',newRectY+'px');
                                                newRect.setAttributeNS(null,'width',Game.CELLSIZE+'px');
                                                newRect.setAttributeNS(null,'height',Game.CELLSIZE+'px');
                                                newRect.setAttributeNS(null,'id',"miss-square");
                                                $("svg")[1].append(newRect);

                                                $("#rader-alert-msg").css("background","");
                                                $("#radar-miss-msg").hide();
                                                Game.checkTurn();
                                            },1000);
                                        }
                                    }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                                        console.log(textStatus);
                                    });
                                }
                            }
                        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                            console.log(textStatus);
                        });
                    },1000);
                },1000);
            }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
        });
    });
};//end Game.fire

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

//Click on "Hide Chat" button to hide the chat
Game.prototype.hideChat = function() {
    $("#hide-chat-btn").on("click", function() {
        if($(this).text() === "Show Chat") {
            $(this).text("Hide Chat");
            $("#game-chat").show();
        }else {
            $(this).text("Show Chat");
            $("#game-chat").hide();
        }
    });
};//end Game.hideChat

//Check if the ship being place on the board is on a spot
//"Length" used for ellipse ships
Game.prototype.isSpot = function(x, y, length) {
    let Game = this;

    //Number of rows
    for(i=0;i<Game.BOARDHEIGHT;i++) {
        for(j=0;j<Game.BOARDWIDTH;j++) {
            let myBox = document.getElementById('cell_'+j+'|'+i).getBBox();
            //how do I know if the cursor is within this BBox()?
            if(x>myBox.x && x<(myBox.x+myBox.width) && y>myBox.y && y<(myBox.y+myBox.height)){
                //maxY is the highest Y value for the board
                let maxY = (Game.CELLSIZE * Game.BOARDHEIGHT);
                if(Game.shipShape === "rect") {
                    //Check to make sure the ship fits inside the board
                    if(Game.yourBoardArray[i][j].y+length <= maxY && Game.yourBoardArray[i][j].y >= 0){
                        //Check if the ship is going to be place on top of another ship
                        if(!Game.checkIfOnTopOfShip(x, y)) {
                            //Lock the rectangle to the top of the cell
                            document.getElementById(Game.mover).setAttributeNS(null,'x',Game.yourBoardArray[i][j].x);
                            document.getElementById(Game.mover).setAttributeNS(null,'y',Game.yourBoardArray[i][j].y);

                            //Reset x and y values for ship object inside of the "yourShipArray"
                            Game.yourShipArray[Game.movingShipIndex].x = Game.yourBoardArray[i][j].x;
                            Game.yourShipArray[Game.movingShipIndex].y = Game.yourBoardArray[i][j].y;
                            return true
                        }
                    }
                }else if(Game.shipShape === "ellipse") {
                    let evenOddLength = (length / 60) % 2;

                    //Determine if ellipse ship length is even or odd
                    //Even or odd ship lengths change how you place the ship

                    //Even
                    if(evenOddLength === 0) {
                        //Check to make sure the ship fits inside the board
                        if(Game.yourBoardArray[i][j].y+(length/2) <= maxY && Game.yourBoardArray[i][j].y - (length/2) >= 0) {
                            //Check if the ship is going to be place on top of another ship
                            if(!Game.checkIfOnTopOfShip(x, y)) {
                                document.getElementById(Game.mover).setAttributeNS(null, 'cx', Game.yourBoardArray[i][j].getCenterX());
                                document.getElementById(Game.mover).setAttributeNS(null, 'cy', Game.yourBoardArray[i][j].y);

                                //Reset x and y values for ship object inside of the "yourShipArray"
                                Game.yourShipArray[Game.movingShipIndex].x = Game.yourBoardArray[i][j].getCenterX();
                                Game.yourShipArray[Game.movingShipIndex].y = Game.yourBoardArray[i][j].y;

                                return true;
                            }
                        }
                    }else {
                        //Odd

                        //Check to make sure the ship fits inside the board
                        if(Game.yourBoardArray[i][j].getCenterY()+(length/2) <= maxY && Game.yourBoardArray[i][j].y > 0){
                            //Check if the ship is going to be place on top of another ship
                            if(!Game.checkIfOnTopOfShip(x, y)) {
                                document.getElementById(Game.mover).setAttributeNS(null, 'cx', Game.yourBoardArray[i][j].getCenterX());
                                document.getElementById(Game.mover).setAttributeNS(null, 'cy', Game.yourBoardArray[i][j].getCenterY());

                                //Reset x and y values for ship object inside of the "yourShipArray"
                                Game.yourShipArray[Game.movingShipIndex].x = Game.yourBoardArray[i][j].getCenterX();
                                Game.yourShipArray[Game.movingShipIndex].y = Game.yourBoardArray[i][j].getCenterY();

                                return true;
                            }
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
        } else if (shipShape === "ellipse") {
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

//Tell the user the instruction messages of the game
Game.prototype.showGameInstructionMsg = function() {
    let Game = this;
    $("#ingame-popup").modal('show');
    $("#ingame-popup").find(".modal-body").show();
    $("#ingame-popup").find(".modal-footer").show().empty();
    $("#ingame-popup").find(".modal-footer").append($("<button>").addClass("btn btn-success").attr({"id":"ok-btn","data-dismiss":"modal"}).text("Ok"));
    $("#ingame-popup-label").text("Instructions");
    $("#ingame-popup").find(".modal-body").text("Begin by clicking on a square in the opponent's board and click 'Fire'. " +
        "                                       The goal is to sink all 5 of the opponent's ships before they sink yours. Good luck! :)");

    $("body").on("click","#ok-btn",function() {
        Game.checkTurn();
    });
};//end Game.showGameInstructionMsg

//Tell the user about initial setup of the game
Game.prototype.showInitialSetupMsg = function() {
    $("#close-btn").hide();
    $("#ingame-popup").modal('show');
    $("#ingame-popup-label").text("Instructions");
    $("#ingame-popup").find(".modal-body").text("Begin placing ships on the board. When done, click 'Finish setup'.");
};//eng Game.showInitialSetupMsg

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
    Game.shipShape = id.split('-')[1];

    if(Game.shipShape === "rect") {
        Game.myX = document.getElementById(id).getAttributeNS(null, 'x');
        Game.myY = document.getElementById(id).getAttributeNS(null, 'y');
        Game.mover = id;
        $.each(Game.yourShipArray, function(key, value) {
            if(value.id === id) {
                Game.movingShip = value;
                Game.movingShipIndex = key;
            }
        });
    }else if(Game.shipShape === "ellipse") {
        Game.myCX = document.getElementById(id).getAttributeNS(null, 'cx');
        Game.myCY = document.getElementById(id).getAttributeNS(null, 'cy');
        Game.mover = id;
        //If the id grabbed is same as one of the ships in the ship array,
        //set ship as a "moving" (dragging) ship
        $.each(Game.yourShipArray, function(key, value) {
            if(value.id === id) {
                Game.movingShip = value;
                Game.movingShipIndex = key;
            }
        });
    }
};//end Game.startDrag

//Handle dropping the ship on the board
Game.prototype.stopDrag = function() {
    let Game = this;
    if(Game.mover != '') {
        let thisShip = document.getElementById(Game.mover);

        //Determine the shape of the ship first
        if(Game.shipShape === "rect") {
            let currX = parseInt(thisShip.getAttributeNS(null,'x'));
            let currY = parseInt(thisShip.getAttributeNS(null,'y'));
            let lengthOfShip = parseInt(thisShip.getAttributeNS(null,'height').split("px")[0]);

            //Check if spot is droppable
            let isSpot = Game.isSpot(currX, currY, lengthOfShip);
            if(isSpot) {

            }else {
                //Reset back to original position
                thisShip.setAttributeNS(null,'x',Game.myX);
                thisShip.setAttributeNS(null,'y',Game.myY)
            }
            //Reset temporary moving variables
            Game.mover = '';
            Game.movingShip = null;
            Game.movingShipIndex = 0;
        }else if(Game.shipShape === "ellipse"){
            let currX = parseInt(thisShip.getAttributeNS(null,'cx'));
            let currY = parseInt(thisShip.getAttributeNS(null,'cy'));
            let lengthOfShip = parseInt(thisShip.getAttributeNS(null,'ry').split("px")[0]) * 2;

            //Check if spot is droppable
            let isSpot = Game.isSpot(currX, currY, lengthOfShip);
            if(isSpot) {
                //Reset x and y values for ship object inside of the "yourShipArray"
                Game.yourShipArray[Game.movingShipIndex].x = currX;
                Game.yourShipArray[Game.movingShipIndex].y = currY;
            }else {
                //Reset back to original position
                thisShip.setAttributeNS(null,'cx',Game.myCX);
                thisShip.setAttributeNS(null,'cy',Game.myCY);
            }
            //Reset temporary moving variables
            Game.mover = '';
            Game.movingShip = null;
            Game.movingShipIndex = 0;
        }
    }
};//end Game.stopDrag