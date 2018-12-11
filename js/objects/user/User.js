/*
*  User constructor
* */
function User(id, username, iconName) {
    this.id = id;
    this.username = username;
    this.iconName = iconName;
    this.challengeID;
    this.challengedID;
    this.challengedUsername;
    this.init();
}//end User constructor

//Inherit AjaxFunction
User.prototype = new AjaxFunction();

//User init function
User.prototype.init = function() {
    this.acceptChallenge();
    this.awaitChallenge();
    this.cancelMatch();
    this.challengeUser();
    this.declineChallenge();
    this.logout();
    //this.logoutOnExit();
    this.sendChallenge();
    this.sendChatMsg();
    this.startMatch();
};//end User.init

//Handle accepting user challenges
User.prototype.acceptChallenge = function() {
    var User = this;
    $("#accept-chall-btn").on("click", function() {
        let challengeID = $("#new-challenge").find(".modal-title").attr("id").split("-");

        let data = {result: 'Accepted', challengeID: challengeID[2]};
        let acceptChallenge = User.ajaxCall('post', true, {service: 'challenge', func: 'acceptChallenge', data: data});
        $.when(acceptChallenge).then(function(acceptChall) {
            if(!acceptChall['acceptStatus']) {
                $("#new-challenge").find(".modal-title").attr("id","chall-err-msg").text("Error: Could not accept challenge");
                setTimeout(function() {
                    $("#new-challenge").modal('hide');
                    //Start looking for new challenges
                    User.awaitChallenge();
                }, 2000);
            }else {
                $("#new-challenge").find(".modal-title").addClass("loading").text("Waiting for user to setup match");
                $("#new-challenge").find(".modal-footer").hide();
                User.challengeID = challengeID[2];
                //Check if the game has set up by the challenger
                let timer = setInterval(function() {
                    let data2 = {gameID: challengeID[2]};
                    let checkGameStatus = User.ajaxCall('get', true, {service: 'game', func: 'checkGameStatus', data: data2});
                    $.when(checkGameStatus).then(function(gameStatus) {
                        if(gameStatus['gameStatus'] === "Started") {
                            //If the game has been setup and started
                            clearInterval(timer);
                            $("#new-challenge").find(".modal-title").text("");
                            $("#new-challenge").find(".modal-title").removeClass("loading");
                            $("#new-challenge").find(".modal-title").append($("<span>").addClass("good-msg").text("Match started"));
                            //Create session variables for game
                            let data2 = {player2ID: User.id, gameID: User.challengeID};
                            let userSessions = User.ajaxCall('post', true, {service: "game", func: "createUserSessionVars", data: data2});
                            $.when(userSessions).then(function(sessions) {
                                if(sessions['sessionsSet']) {
                                    setTimeout(function() {
                                        window.location.replace("game.php?gameID="+User.challengeID);
                                    }, 1000);
                                }else {
                                    $("#game-popup-label").text("");
                                    $("#game-popup-label").append($("<span>").addClass("bad-msg").text("Game could not be started"));
                                }
                            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                                $("#game-popup-label").text("");
                                $("#game-popup-label").append($("<span>").addClass("bad-msg").text("Game could not be started"));
                            });
                        }else if(gameStatus['gameStatus'] === "Cancelled") {
                            //If the game has been cancelled
                            clearInterval(timer);
                            User.challengeID = null;
                            $("#new-challenge").find(".modal-title").text("");
                            $("#new-challenge").find(".modal-title").removeClass("loading");
                            $("#new-challenge").find(".modal-title").append($("<span>").addClass("bad-msg").text("Match has been cancelled"));
                            setTimeout(function() {
                                $("#new-challenge").modal('hide');
                                $("#new-challenge").find(".modal-footer").show();
                                //Start looking for new challenges
                                User.awaitChallenge();
                            }, 2000);
                        }
                    });
                }, 1000);
            }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            $("#new-challenge").find(".modal-title").attr("id","chall-err-msg").text("Error: Could not accept challenge");
        });
    });
};//end User.acceptChallenge

//User will wait for a challenge request every second
User.prototype.awaitChallenge = function() {
    var User = this;
    let timer = setInterval(function() {
        let data = {userID: User.id, result: "pending"};
        let waitForChallenge = User.ajaxCall('get', true, {service: 'challenge', func: 'getChallenge', data: data});
        $.when(waitForChallenge).then(function (newChallenge) {
            if(newChallenge['challenge'] !== null) {
                if(newChallenge['challenge'][0]['challengedID'] == User.id) {
                    //Create unique title with unique ID for a sent challenge
                    let newChallengeModal = $("#new-challenge");
                    newChallengeModal.find(".modal-title").attr("id","challenge-id-"+newChallenge['challenge'][0]['challengeID']).text("Challenged By: "+newChallenge['challenge'][0]['challengerUsername']);
                    newChallengeModal.modal('show');
                    clearInterval(timer);
                }
            }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
        });
    }, 1000);
};//end User.awaitChallenge

//Cancel a match with a challenged user
User.prototype.cancelMatch = function() {
    var User = this;
    $("body").on("click", "#rmve-player-btn", function() {
        $("#cancel-game-popup-label").text("Remove player and cancel match?");
    });

    $("#cancel-game-cancel").on("click", function() {
        $("#cancel-game-confirm").show();
    });

    $("#cancel-game-confirm").on("click", function() {
        let data = {gameStatus: 'Cancelled', gameID: User.challengeID};
        let cancelGameStatus = User.ajaxCall('post', true, {service: 'game', func: 'cancelGame', data: data});
        $.when(cancelGameStatus).then(function(cancelGame) {
            console.log(cancelGame['cancelGameStatus']);
            if(cancelGame['cancelGameStatus']) {
                User.challengeID = null;
                //Remove challenged user from create match table
                $("#chall-player-username").text("(Select a player)");
                $("#remove-btn").empty();
                $("#cancel-game-confirm").hide();
                $("#cancel-game-cancel").text("Ok");
                $("#cancel-game-popup-label").text("");
                $("#cancel-game-popup-label").append($("<span>").addClass("good-msg").text("Match successfully cancelled"));
            }else {
                $("#cancel-game-confirm").hide();
                $("#cancel-game-cancel").text("Ok");
                $("#cancel-game-popup-label").text("");
                $("#cancel-game-popup-label").append($("<span>").addClass("bad-msg").text("Error: match could not be cancelled"));
            }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            $("#cancel-game-confirm").hide();
            $("#cancel-game-cancel").text("Ok");
            $("#cancel-game-popup-label").text("");
            $("#cancel-game-popup-label").append($("<span>").addClass("bad-msg").text("Error: match could not be cancelled"));
        });
    });
};//end User.cancelMatch

//Clicking on a user besides yourself triggers a modal
//Modal asks user if they're sure they want to challenge
User.prototype.challengeUser = function() {
    var User = this;
    $(document).on("click", '.user-row', function() {
        if($("#chall-player-username").text() !== "(Select a player)") {
            $("#challenge-btn").hide();
            $("#challenge-popup").modal('show');
            var modalHeaderText = $("<span>").text("Can't challenge another user right now");
            $("#challenge-label").append(modalHeaderText);
        }else {
            var username = $('.username');
            var challengedUsername = $(this).find(username).text();
            var challengedID = $(this).attr('id');
            if(challengedUsername !== User.username) {
                $("#challenge-btn").show();
                $("#challenge-popup").modal('show');
                var modalHeaderText = $("<span>").attr("id",challengedUsername+"-"+challengedID).text("Challenge User "+challengedUsername+"?");
                $("#challenge-label").append(modalHeaderText);
            }
        }
    });

    $("#close-chall-btn").on("click", function() {
        $("#challenge-label").empty();
    });
};//end User.challengeUser

//Handle declining user challenges
User.prototype.declineChallenge = function() {
    var User = this;
    $("#decline-chall-btn").on("click", function() {
        let challengeID = $("#new-challenge").find(".modal-title").attr("id").split("-");

        let data = {result: 'Declined', challengeID: challengeID[2]};
        let declineChallenge = User.ajaxCall('post', true, {service: 'challenge', func: 'declineChallenge', data: data});
        $.when(declineChallenge).then(function(declineChall) {
            if(!declineChall['declineStatus']) {
                $("#new-challenge").find(".modal-title").attr("id","chall-err-msg").text("Error: Could not decline challenge");
            }else {
                //Continue to wait for challenges after declining
                User.awaitChallenge();
            }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            $("#new-challenge").find(".modal-title").attr("id","chall-err-msg").text("Error: Could not decline challenge");
        });
    });
};//end User.declineChallenge

//Handle user logout
User.prototype.logout = function() {
    var User = this;
    $("#logout-menu-option").on("click", function() {
        var data = {username: User.username};
        var logout = User.ajaxCall('post', true, {service: 'user', func: 'logout', data: data});
        $.when(logout).then(function(logoutRes) {
            if(logoutRes['loggedOut']) {
                window.location.replace("logout.php");
            }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
        });
    });
};//end User.logout

//Handle logging out a user if they close the browser
User.prototype.logoutOnExit = function() {
    var User = this;
    $(window).on('beforeunload', function() {
        var data = {username: User.username};
        var logout = User.ajaxCall('post', false, {service: 'user', func: 'logout', data: data});
        $.when(logout).then(function(logoutRes) {
            if(logoutRes['loggedOut']) {
                window.location.replace("logout.php");
            }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
        });
    });
};//end User.logoutOnExit

//Send challenge to the database so the challenged user sees they have been challenged
User.prototype.sendChallenge = function() {
    var User = this;
    //When clicking challenge button modal
    $("#challenge-btn").on("click", function() {
        var labelSplit = $("#challenge-label").find("span").attr("id").split("-");
        var challengedUsername = labelSplit[0];
        var challengedID = labelSplit[1];

        //Set global variables for later
        User.challengedUsername = challengedUsername;
        User.challengedID = challengedID;

        var data = {challengerID: User.id, challengerUsername: User.username, challengedID: challengedID, challengedUsername: challengedUsername, result: 'pending'};
        var challengeID = User.ajaxCall('post', true,{service: 'challenge', func: 'sendChallenge', data: data});
        $.when(challengeID).then(function(challengeIDRes) {
            //If the challenge was successfully made
            if(challengeIDRes['challengeID']) {
                $("#challenge-label").addClass("loading").text("Waiting for response");
                $("#challenge-popup").find(".modal-footer").hide();

                //Check if the user has accepted the challenge
                let timer = setInterval(function() {
                    //Global challenge ID used to track a challenge between two users
                    //Used throughout User.js
                    User.challengeID = challengeIDRes['challengeID'];

                    var data = {challengeID: challengeIDRes['challengeID']};
                    var checkChallengeStatus = User.ajaxCall('get', true, {service: 'challenge', func: 'checkChallengeStatus', data: data});
                    $.when(checkChallengeStatus).then(function(challengeStatus) {
                        if(challengeStatus['challStatus'] === "Accepted") {
                            clearInterval(timer);
                            //Create new game entry with challenger and challenged player
                            let data = {gameID: challengeIDRes['challengeID'], player1ID: User.id, player2ID: User.challengedID, board1ID: 1 ,board2ID: 1, board1PlayerID: User.id, board2PlayerID: User.challengedID, gameStatus: 'Setting Up'};
                            let createGame = User.ajaxCall('post', true, {service: 'game', func: 'createGame', data: data});
                            $.when(createGame).then(function(createdGame) {
                                if(createdGame) {
                                    $("#challenge-label").removeClass("loading");
                                    $("#challenge-popup").find(".modal-footer").show();
                                    $("#challenge-btn").hide();
                                    //Show that user has accepted challenge
                                    $("#challenge-label").text(User.challengedUsername+" accepted. "+User.challengedUsername+" is waiting for you to start the match");

                                    //Display user inside create match table in the lobby
                                    $("#chall-player-username").text(User.challengedUsername);
                                    $("#remove-btn").append($("<button>").attr({"type": "button", "id": "rmve-player-btn","data-toggle": "modal","data-target": "#cancel-game-popup"}).addClass("btn btn-danger").text("Remove"));
                                }
                            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                                console.log(textStatus);
                            });
                        }else if(challengeStatus['challStatus'] === "Declined") {
                            User.challengeID = null;
                            $("#challenge-label").removeClass("loading");
                            $("#challenge-popup").find(".modal-footer").show();
                            $("#challenge-label").text("Challenge has been declined");
                            $("#challenge-btn").hide();
                            clearInterval(timer);
                        }
                    }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(textStatus);
                    });
                }, 1000);
            }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
        });
    });

    //When clicking the close button for the modal
    $("#close-chall-btn").on("click", function() {
        $("#challenge-label").text("");
        $("#challenge-btn").show();
    });
};//end User.sendChallenge

//User sending chat message function
User.prototype.sendChatMsg = function() {
    var User = this;
    $("#chat-input").keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        var msg = $("#chat-input").val();
        //When user presses enter key
        if(keycode == '13' && msg !== ''){
            var data = {userID: User.id, username: User.username, msg: msg};
            var chatMsgSent = User.ajaxCall('post', true, {service: 'lobby', func: 'sendLobbyChatMsg', data: data});
            $.when(chatMsgSent).then(function(chatMsgSentRes) {
                $("#chat-input").val("");
                if(!chatMsgSentRes['chatMsgSent']) {
                    $("#chat-box").append($("<p>").addClass('chat-err-msg').text("Error: Could not send message"));
                }
            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                $("#chat-box").append($("<p>").addClass('chat-err-msg').text("Error: Could not send message"));
            });
        }
    });
};//end User.sendChatMsg

//Handles starting Battleship match
User.prototype.startMatch = function() {
    var User = this;
    $("#conf-start-game").on("click", function() {
        let data = {gameStatus: "Started", gameID: User.challengeID};
        let startGameStatus = User.ajaxCall('post', true, {service: "game", func: "startGame", data: data});
        $.when(startGameStatus).then(function(startGame) {
            if(startGame['startGameRes']) {
                $("#game-popup-label").text("");
                $("#game-popup").find(".modal-body").hide();
                $("#game-popup").find(".modal-footer").hide();
                $("#game-popup-label").append($("<span>").addClass("good-msg").text("Match started!"));

                //Create session variables for game
                let data2 = {player1ID: User.id, gameID: User.challengeID};
                let userSessions = User.ajaxCall('post', true, {service: "game", func: "createUserSessionVars", data: data2});
                $.when(userSessions).then(function(sessions) {
                    if(sessions['sessionsSet']) {
                        setTimeout(function() {
                            window.location.replace("game.php?gameID="+User.challengeID);
                        }, 1000);
                    }else {
                        $("#game-popup-label").text("");
                        $("#game-popup-label").append($("<span>").addClass("bad-msg").text("Game could not be started"));
                    }
                }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                    $("#game-popup-label").text("");
                    $("#game-popup-label").append($("<span>").addClass("bad-msg").text("Game could not be started"));
                });
            }else {
                $("#game-popup-label").text("");
                $("#game-popup-label").append($("<span>").addClass("bad-msg").text("Game could not be started"));
            }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            $("#game-popup-label").text("");
            $("#game-popup-label").append($("<span>").addClass("bad-msg").text("Game could not be started"));
        });
    });

    //Click the "start match" button on the lobby
    $("#start-match-btn").on("click", function() {
        if(!User.challengeID) {
            $("#game-popup").find(".modal-body").hide();
            $("#conf-start-game").hide();
            $("#game-popup-label").text("No player selected");
        }else {
            $("#game-popup").find(".modal-body").show();
            $("#conf-start-game").show();
            $("#game-popup-label").text("Start match?");
        }
    });

    $("#conf-cancel-game").on("click", function() {
        $("#conf-start-game").show();
    });
};//end User.startMatch