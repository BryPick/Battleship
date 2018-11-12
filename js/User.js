/*
*  User constructor
* */
function User() {
    const user = this;
    this.init();
}//end User constructor

//Establish constructor
User.prototype.constructor = User;

//User init function
User.prototype.init = function() {
    this.checkEightChars();
    this.checkSpecialChars();
    this.createUser();
    this.showCharMsgs();
    this.showPassText();
};//end User.init

/* function to handle all get/post requests
 * @param method - 'get' or 'post' request
 * @param data - the data to send -> {}
 * */
User.prototype.ajaxCall = function(method, data) {
    return $.ajax({
        type: method,
        data: data,
        dataType: 'json',
        url: 'inc/mid.php'
    });
};//end Ajax.handleData

//Check if the password has at least eight characters
User.prototype.checkEightChars = function() {
    //While the user is typing inside the "create password" field
    $("#create-password").keyup(function() {
        var newPass = $("#create-password").val();
        if(newPass.length >= 8) {
            $("#eight-chars-msg").css("color","#008148");
            $("#done-eight").css({"display":"inline", "color":"#008148"});
        }else {
            $("#eight-chars-msg").css("color","#DE1A1A");
            $("#done-eight").css("display","none");
        }
    });
};//end User.checkEightChars

//See if a username that a user is trying to create already exists
User.prototype.checkExistingUser = function() {


};//end User.checkExistingUser

//Check the password and username
User.prototype.checkCreds = function(username, password) {
    var data = {username: username, password: password};
    var checkedCreds = user.ajaxCall('get', {service: 'user', func: 'checkCreds', data: data});
    $.when(checkedCreds).then(function(checkedCredsRes) {

    });
};//end User.checkCreds

//Check if the password contains at least one special character
User.prototype.checkSpecialChars = function() {
    $("#create-password").keyup(function() {
        var format = /[!@#%&$]/;
        var newPass = $("#create-password").val();
        if(format.test(newPass)) {
            $("#spec-chars-msg").css("color","#008148");
            $("#done-spec").css({"display":"inline", "color":"#008148"});
        }else {
            $("#spec-chars-msg").css("color","#DE1A1A");
            $("#done-spec").css("display","none");
        }
    });
};//end User.checkSpecialChars

//Create new user
User.prototype.createUser = function() {
    $('#create-acct-btn').on('click', function() {
        var username = $("#create-username").val();

        var usernameData = {username: username};
        var checkExistingUser = user.ajaxCall('post', {service: 'user', func: 'checkExistingUser', data: usernameData});
        $.when(checkExistingUser).then(function(checkExistingUser) {
            if(checkExistingUser['userExists'] == false) {
                var role = 'user';
                var username = $('#create-username').val();
                var password = $('#create-password').val();
                var confPass = $('#conf-password').val();
                var icon = 'anchor.svg';
                var isLoggedIn = 'Yes';

                if($('#eight-chars-msg').css('color') == 'rgb(222, 26, 26)' || $('#spec-chars-msg').css('color') == 'rgb(222, 26, 26)') {
                    user.showUserMsg('Password does not meet all requirements!', 'alert-danger');
                }else {
                    if(password !== confPass) {
                        user.showUserMsg('Passwords don\'t match!','alert-danger');
                    }else {
                        var data = {role: role, username: username, password: password, icon: icon, loggedIn: isLoggedIn};
                        var createUser = user.ajaxCall('post', {service: 'user', func: 'createUser', data: data});
                        $.when(createUser).then(function(createUserRes) {
                            if(createUserRes) {
                                user.showUserMsg('Success! User Created!', 'alert-success');
                            }else {
                                user.showUserMsg('Fail! Contact Admin!', 'alert-danger');
                            }
                        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                            user.showUserMsg('Fail! Contact Admin!', 'alert-danger');
                        });
                    }
                }
            }else {
                user.showUserMsg('Username Taken!', 'alert-warning');
            }
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            user.showUserMsg('Fail! Contact Admin!', 'alert-danger');
        });
    });
};//end User.createUser

//Delete user based on ID
User.prototype.deleteUser = function(id) {
    var data = {id: id};
    var deleteUser = user.ajaxCall('post', {service: 'user', func: 'deleteUser', data: data});
    $.when(deleteUser).then(function(deleteUserRes) {

    });
};//end User.getUser

//Get user based on ID
User.prototype.getUser = function(id) {
    var data = {id: id};
    var getUser = user.ajaxCall('get', {service: 'user', func: 'getUser', data: data});
    $.when(getUser).then(function(getUserRes) {

    });
};//end User.getUser

User.prototype.showCharMsgs = function() {
    //If the user clicks inside the "new password" field, show message
    $("#create-password").focus(function() {
        $(".pwd-chars-msg").css("display", "inline");
    });

    //If the user clicks outside the "new password" field, hide message
    $("#create-password").focusout(function() {
        $(".pwd-chars-msg").css("display", "none");
    });
};

//Show password text for login and create account pages
User.prototype.showPassText = function() {
    //password field show/hide listener
    $(".pw-toggle-group a").click(function() {
        var current = $(this).html();
        switch (current){
            case ('<i class="fa fa-eye"></i> Show'):
                $(this).html('<i class="fa fa-eye-slash"></i> Hide').addClass("pw-hide").parent().find("input").attr("type", "text");
                break;
            case ('<i class="fa fa-eye-slash"></i> Hide'):
                $(this).html('<i class="fa fa-eye"></i> Show').removeClass("pw-hide").parent().find("input").attr("type", "password");
                break;
            default:
                break;
        }
    });
};//end User.showPassText

User.prototype.showUserMsg = function(msg, type) {
    var userErrMsg = $('#user-msg');
    userErrMsg.show();
    userErrMsg.addClass(type);
    userErrMsg.text(msg);
};//end User.showUserError

