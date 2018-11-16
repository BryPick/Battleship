/*
*  CreateAccount constructor
* */
function CreateAccount() {
    this.init();
}//end CreateAccount constructor

//Inherit AccountPage
CreateAccount.prototype = new AccountPage();

//User init function
CreateAccount.prototype.init = function() {
    this.checkEightChars();
    this.checkSpecialChars();
    this.createUser();
    this.showCharMsgs();
};//end CreateAccount.init

//Check if the password has at least eight characters
CreateAccount.prototype.checkEightChars = function() {
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
};//end CreateAccount.checkEightChars

//Check if the password contains at least one special character
CreateAccount.prototype.checkSpecialChars = function() {
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
};//end CreateAccount.checkSpecialChars

//Create new user
CreateAccount.prototype.createUser = function() {
    var CreateAccount = this;
    $('#create-acct-btn').on('click', function() {
        var username = $("#create-username").val();
        var password = $("#create-password").val();
        var confPass = $("#conf-password").val();
        if(username === '' || password === '' || confPass === '') {
            CreateAccount.showUserMsg('Not all fields were entered', 'alert-warning');
        }else {
            if($('#eight-chars-msg').css('color') == 'rgb(222, 26, 26)' || $('#spec-chars-msg').css('color') == 'rgb(222, 26, 26)') {
                CreateAccount.showUserMsg('Password does not meet all requirements!', 'alert-danger');
            }else {
                if (password !== confPass) {
                    CreateAccount.showUserMsg('Passwords don\'t match!', 'alert-danger');
                } else {
                    var usernameData = {username: username};
                    var checkExistingUser = CreateAccount.ajaxCall('post', {service: 'createAccount', func: 'checkExistingUser', data: usernameData});
                    $('.user-forms').hide();
                    $('#battleship-load').show();
                    $.when(checkExistingUser).then(function (checkExistingUser) {
                        $('#battleship-load').hide();
                        $('.user-forms').show();
                        if (checkExistingUser['userExists'] == false) {
                            var role = 'user';
                            var username = $('#create-username').val();
                            var password = $('#create-password').val();
                            var confPass = $('#conf-password').val();
                            var icon = 'anchor.svg';
                            var isLoggedIn = 'Yes';

                            var data = {
                                role: role,
                                username: username,
                                password: password,
                                icon: icon,
                                loggedIn: isLoggedIn
                            };
                            var createUser = CreateAccount.ajaxCall('post', {service: 'createAccount', func: 'createUser', data: data});
                            $.when(createUser).then(function (createUserRes) {
                                if (createUserRes) {
                                    CreateAccount.showUserMsg('Success! User created!', 'alert-success');
                                    window.location.replace("lobby.php");
                                } else {
                                    CreateAccount.showUserMsg('Fail! Contact admin!', 'alert-danger');
                                }
                            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                                CreateAccount.showUserMsg('Fail! Contact admin!', 'alert-danger');
                            });

                        } else {
                            CreateAccount.showUserMsg('Username taken!', 'alert-warning');
                        }
                    }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                        CreateAccount.showUserMsg('Fail! Contact admin!', 'alert-danger');
                    });
                }
            }
        }
    });
};//end CreateAccount.createUser

CreateAccount.prototype.showCharMsgs = function() {
    //If the user clicks inside the "create password" field, show message
    $("#create-password").focus(function() {
        $(".pwd-chars-msg").css("display", "inline");
    });

    //If the user clicks outside the "create password" field, hide message
    $("#create-password").focusout(function() {
        $(".pwd-chars-msg").css("display", "none");
    });
};//end CreateAccount.showCharMsgs

