/*
*  User constructor
* */
function User(id, username, iconName) {
    this.id = id;
    this.username = username;
    this.iconName = iconName;
    this.init();
}//end User constructor

//Inherit AjaxFunction
User.prototype = new AjaxFunction();

//User init function
User.prototype.init = function() {
    this.sendChatMsg();
    this.logout();
};//end User.init

//User challenge function
User.prototype.challenge = function() {

};//end User.challenge

User.prototype.logout = function() {
    var User = this;
    $("#logout-menu-option").on("click", function() {
        var data = {username: User.username};
        var logout = User.ajaxCall('post', {service: 'user', func: 'logout', data: data});
        $.when(logout).then(function(logoutRes) {
            if(logoutRes['loggedOut']) {
                window.location.replace("logout.php");
            }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
        });
    });
};

//User sending chat message function
User.prototype.sendChatMsg = function() {
    var User = this;
    $("#chat-input").keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        var msg = $("#chat-input").val();
        if(keycode == '13' && msg !== ''){
            var data = {userID: User.id, username: User.username, msg: msg};
            var chatMsgSent = User.ajaxCall('post', {service: 'lobby', func: 'sendLobbyChatMsg', data: data});
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