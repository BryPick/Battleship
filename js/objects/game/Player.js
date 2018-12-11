/*
*  Player constructor
* */
function Player(gameID, id, username) {
    this.gameID = gameID;
    this.id = id;
    this.username = username;
    this.init();
}//end Player constructor

//Inherit AjaxFunction
Player.prototype = new AjaxFunction();

//Player init function
Player.prototype.init = function() {
    this.sendChatMsg();
};//end Player.init

//Send chat message inside game chat
Player.prototype.sendChatMsg = function() {
    let Player = this;
    $("#game-chat-input").keypress(function(event) {
        let keycode = (event.keyCode ? event.keyCode : event.which);
        let msg = $("#game-chat-input").val();
        //When user presses enter key
        if(keycode == '13' && msg !== ''){
            let data = {gameID: Player.gameID, playerID: Player.id, playerUsername: Player.username, msg: msg};
            let chatMsgSent = Player.ajaxCall('post', true, {service: 'game', func: 'sendGameChatMsg', data: data});
            $.when(chatMsgSent).then(function(chatMsgSentRes) {
                $("#game-chat-input").val("");
                if(!chatMsgSentRes['chatMsgSent']) {
                    $("#chat-box").append($("<p>").addClass('chat-err-msg').text("Error: Could not send message"));
                }
            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                $("#chat-box").append($("<p>").addClass('chat-err-msg').text("Error: Could not send message"));
            });
        }
    });
};//end Player.sendChatMsg