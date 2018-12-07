/*
*  Login constructor
* */
function Login() {
    this.init();
}//end Login constructor

//Inherit AccountPage
Login.prototype = new AccountPage();

//Login init function
Login.prototype.init = function() {
    this.checkCreds();
};//end Login.init

//Check the password and username
Login.prototype.checkCreds = function() {
    var Login = this;
    $('#login-btn').on('click', function() {
        var username = $('#enter-username').val();
        var password = $('#enter-password').val();
        if(username === '' || password == '') {
            Login.showUserMsg('Not all fields were entered', 'alert-warning');
        }else {
            var data = {username: username, password: password};
            var checkedCreds = Login.ajaxCall('get', true, {service: 'login', func: 'checkCreds', data: data});
            $('.user-forms').hide();
            $('#battleship-load').show();
            $.when(checkedCreds).then(function (checkedCredsRes) {
                $('#battleship-load').hide();
                $('.user-forms').show();
                if (checkedCredsRes['credsCorrect'] == true) {
                    Login.showUserMsg('Success! Logging you in!', 'alert-success');
                    window.location.replace("lobby.php");
                } else if(checkedCredsRes['credsCorrect'] === 'Error'){
                    Login.showUserMsg('Error Logging In! Contact Admin!', 'alert-danger');
                } else {
                    Login.showUserMsg('Username or password incorrect!', 'alert-danger');
                }
            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                Login.showUserMsg('Fail! Contact Admin!', 'alert-danger');
            });
        }
    });
};//end Login.checkCreds

