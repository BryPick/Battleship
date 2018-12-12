/*
*  Lobby constructor
* */
function Lobby() {
    this.init();
}//end Lobby constructor

//Inherit
Lobby.prototype = new AjaxFunction();

Lobby.prototype.init = function() {
    this.getLoggedInUsers();
    this.getChat();
    this.keepScrollBottom();
    this.updateLoggedOutUsers();
};//end Lobby.init

//Create lobby table with all the users that are logged in
Lobby.prototype.getLoggedInUsers = function() {
    var lobby = this;
    var timer = setInterval(function() {
        var getLoggedInUsers = lobby.ajaxCall('get', true, {service: 'lobby', func: 'getLoggedInUsers'});
        $.when(getLoggedInUsers).then(function(loggedInUsers) {
            if(loggedInUsers) {
                var lobbyTableBody = $("#lobby-table").find("table").find("tbody");
                //Check to see if the lobby table already has users inside of it
                if($('.user-row').length > 0) {
                    //Create array for all users logged in on the front end
                    var loggedInFromFront = [];
                    var users = $(".user-row");
                    users.each(function() {
                        var username = $(".username");
                        loggedInFromFront.push($(this).find(username).text());
                    });
                    //Add logged in users to lobby table
                    for(let i = 0; i < loggedInUsers.length; i++) {
                        //Get users that are inside create match table
                        //If they are inside create match table, don't add them to lobby table
                        if(loggedInUsers[i]['username'] !== $("#curr-user-username").text()) {
                            //If user that is found to be logged in is not already in the lobby table, add them
                            if(jQuery.inArray(loggedInUsers[i]['username'], loggedInFromFront) === -1 ) {
                                var newTableRow = $("<tr>").addClass('user-row').attr('id',loggedInUsers[i]['userID']);

                                var iconTD = $("<td>");
                                iconTD.append("<img src='svg/"+loggedInUsers[i]['iconName']+"'/>")
                                newTableRow.append(iconTD);

                                var usernameTD = $("<td>").addClass('username');
                                usernameTD.text(loggedInUsers[i]['username']);
                                newTableRow.append(usernameTD);

                                var winCountTD = $("<td>");
                                winCountTD.text(loggedInUsers[i]['winCount']);
                                newTableRow.append(winCountTD);

                                var lossCountTD = $("<td>");
                                lossCountTD.text(loggedInUsers[i]['lossCount']);
                                newTableRow.append(lossCountTD);

                                lobbyTableBody.append(newTableRow);
                            }
                        }
                    }
                }else {
                    for(let i = 0; i < loggedInUsers.length; i++) {
                        //Get users that are inside create match table
                        //If they are inside create match table, don't add them to lobby table
                        if(loggedInUsers[i]['username'] !== $("#curr-user-username").text()) {
                            var newTableRow = $("<tr>").addClass('user-row').attr('id', loggedInUsers[i]['userID']);

                            var iconTD = $("<td>");
                            iconTD.append("<img class='user-icon' src='svg/" + loggedInUsers[i]['iconName'] + "'/>");
                            newTableRow.append(iconTD);

                            var usernameTD = $("<td>").addClass('username');
                            usernameTD.text(loggedInUsers[i]['username']);
                            newTableRow.append(usernameTD);

                            var winCountTD = $("<td>");
                            winCountTD.text(loggedInUsers[i]['winCount']);
                            newTableRow.append(winCountTD);

                            var lossCountTD = $("<td>");
                            lossCountTD.text(loggedInUsers[i]['lossCount']);
                            newTableRow.append(lossCountTD);

                            lobbyTableBody.append(newTableRow);
                        }
                    }
                }
            }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
        });
    }, 1000);
};//end Lobby.getLoggedInUsers

Lobby.prototype.getChat = function() {
    var lobby = this;
    var timer = setInterval(function() {
        var getChatMsgs = lobby.ajaxCall('get', true, {service: 'lobby', func: 'getChat'});
        $.when(getChatMsgs).then(function(getChatMsgsRes) {
            if(getChatMsgsRes['getChatResponse']) {
                $("#chat-box").append($("<p>").text(getChatMsgsRes['getChatResponse'][0]['username']+": "
                                                        +getChatMsgsRes['getChatResponse'][0]['message']));
            }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            $("#chat-box").append($("<p>").addClass('chat-err-msg').text("Error: Could not get chat"));
        });
    }, 1000);
};//end Lobby.getChat

//Keeps overflow scrollbar at the bottom when new messages are added
Lobby.prototype.keepScrollBottom = function() {
    let lobbyChatBox = document.querySelector("#chat-box");
    lobbyChatBox.scrollTop = lobbyChatBox.scrollHeight - lobbyChatBox.clientHeight;
};//end Game.keepScrollBottom

Lobby.prototype.updateLoggedOutUsers = function() {
    var lobby = this;
    var timer = setInterval(function() {
        var getLoggedOutUsers = lobby.ajaxCall('get', true, {service: 'lobby', func: 'loggedOutUsers'});
        $.when(getLoggedOutUsers).then(function(loggedOutUsers) {
            if(loggedOutUsers['loggedOutUsers']) {
                var loggedOuts = [];
                for(var i = 0; i < loggedOutUsers['loggedOutUsers'].length; i++) {
                    loggedOuts.push(loggedOutUsers['loggedOutUsers'][i]['username']);
                }
                var users = $(".user-row");
                users.each(function() {
                    var username = $(".username");
                    var usernameText = $(this).find(username).text();
                    if(jQuery.inArray(usernameText, loggedOuts) !== -1 ) {
                        $(this).remove();
                    }
                });
            }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
        });
    }, 1000);
};//end Lobby.updateLoggedOutUsers

