/*
*  User constructor
* */
function User() {
    // this.ajaxData = new AjaxData();
    this.init();
}//end User constructor

//Establish constructor
User.prototype.constructor = User;

User.prototype.PWSHOWTEXT = document.getElementsByClassName('pw-toggle-group').getElementsByTagName('a');

//User init function
User.prototype.init = function() {
    'use strict';
    this.showPassText();
};//end User.init

/*//Get user based on ID
User.prototype.getUser = function(id) {
    var data = {id: id};
    var getUser = this.ajaxData.handleData('get', {service: 'user', func: 'getUser', data: data});
    $.when(getUser).then(function(getUserRes) {

    });
};//end User.getUser

//Create new user
User.prototype.createUser = function(username, password, icon, isLoggedIn) {
    var data = {username: username, password: password, icon: icon, loggedIn: isLoggedIn};
    var createUser = this.ajaxData.handleData('post', { service: 'user', func: 'createUser', data: data});
    $.when(createUser).then(function(createUserRes) {

    });
};//end User.createUser

//Delete user based on ID
User.prototype.deleteUser = function(id) {
    var data = {id: id};
    var deleteUser = this.ajaxData.handleData('post', {service: 'user', func: 'deleteUser', data: data});
    $.when(deleteUser).then(function(deleteUserRes) {

    });
};//end User.getUser

//Check the password and username
User.prototype.checkCreds = function(username, password) {
    var data = {username: username, password: password};
    var checkedCreds = this.ajaxData.handleData('get', {service: 'user', func: 'checkCreds', data: data});
    $.when(checkedCreds).then(function(checkedCredsRes) {

    });
};//end User.checkCreds*/

User.prototype.showPassText = function() {
    //password field show/hide listener
    this.PWSHOWTEXT.addEventListener('onclick', function() {
        var current = $(this).html();
        switch (current){
            case ('<i class="fa fa-eye"></i> Show'):
                this.html('<i class="fa fa-eye-slash"></i> Hide').addClass("pw-hide").parent().find("input").attr("type", "text");
                break;
            case ('<i class="fa fa-eye-slash"></i> Hide'):
                this.html('<i class="fa fa-eye"></i> Show').removeClass("pw-hide").parent().find("input").attr("type", "password");
                break;
            default:
                break;
        }
    })
};

