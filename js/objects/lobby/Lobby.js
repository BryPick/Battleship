/*
*  Lobby constructor
* */
function Lobby() {
    this.init();
}//end Lobby constructor

//Inherit
Lobby.prototype = new AjaxFunction();

Lobby.prototype.init = function() {
    // this.getLoggedInUsers();
    this.getChat();
};//end Lobby.init

Lobby.prototype.getLoggedInUsers = function() {
    var lobby = this;
    var timer = setInterval(function() {
        var getChat = lobby.ajaxCall('get', {service: 'lobby', func: 'getLoggedInUsers'});
        $.when(getChat).then(function(getChatRes) {
            if(getChatRes) {
                var lobbyTableBody = $("#lobby-table").find("table").find("tbody");
                for(var i = 0; i < getChatRes.length; i++) {
                    var newTableRow = $("<tr>");

                    var iconTD = $("<td>");
                    iconTD.append("<img src='svg/"+getChatRes[i]['iconName']+"'/>")
                    newTableRow.append(iconTD);

                    var usernameTD = $("<td>");
                    usernameTD.text(getChatRes[i]['username']);
                    newTableRow.append(usernameTD);

                    var winCountTD = $("<td>");
                    winCountTD.text(getChatRes[i]['winCount']);
                    newTableRow.append(winCountTD);

                    var lossCountTD = $("<td>");
                    lossCountTD.text(getChatRes[i]['lossCount']);
                    newTableRow.append(lossCountTD);

                    lobbyTableBody.append(newTableRow);
                }
            }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
        });
    });
};//end Lobby.getLoggedInUsers

Lobby.prototype.getChat = function() {
    var lobby = this;
    var timer = setInterval(function() {
        var getChatMsgs = lobby.ajaxCall('get',{service: 'lobby', func: 'getChat'});
        $.when(getChatMsgs).then(function(getChatMsgsRes) {
            if(getChatMsgsRes['getChatResponse']) {
                $("#chat-box").append($("<p>").text(getChatMsgsRes['getChatResponse'][0]['username']+": "
                                                        +getChatMsgsRes['getChatResponse'][0]['message']));
            }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            $("#chat-box").append($("<p>").addClass('chat-err-msg').text("Error: Could not get chat"));
        });
    }, 1000);
};