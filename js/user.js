/*
*  User constructor
* */
var defaultIcon = 'ship.jpg';
var isLoggedIn = 'Yes';

function User() {
    'use strict';
    this.init();
    this.crud = new Crud();
}//end User constructor

//Establish constructor
User.prototype.constructor = User;

//User init function
User.prototype.init = function() {
    'use strict';
};//end User.init

//Get user based on ID
User.prototype.getUser = function(id) {
    this.crud.handleData('get', {id: id});
};//end User.getUser

//Create new user
User.prototype.createUser = function(username, password, defaultIcon, isLoggedIn) {
    this.crud.handleData('post', {username: username, password: password, icon: defaultIcon, loggedIn: isLoggedIn});
};//end User.createUser

//Get user based on ID
User.prototype.deleteUser = function(id) {
    this.crud.handleData('post', {id: id});
};//end User.getUser

