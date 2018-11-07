/*
* A class to handle all post and get requests
*
*
* */

/*
* constructor
* */
function Crud() {
    'use strict';
}//end Crud constructor

Crud.prototype.constructor = Crud;

/* function to handle all get/post requests
 * @param method - 'get' or 'post' request
 * @param data - the data to send -> {}
 * */
Crud.prototype.handleData = function(method, data) {
    return $.ajax({
        type: method,
        data: data,
        dataType: 'json',
        url: 'mid.php'
    });
};//end Crud.getData