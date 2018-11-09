/*
* A class to handle all post and get requests
*
*
* */

/*
* constructor
* */
function AjaxData() {
    'use strict';
}//end Crud constructor

AjaxData.prototype.constructor = AjaxData;

/* function to handle all get/post requests
 * @param method - 'get' or 'post' request
 * @param data - the data to send -> {}
 * */
AjaxData.prototype.handleData = function(method, data) {
    return $.ajax({
        type: method,
        data: data,
        dataType: 'json',
        url: '/mid.php'
    });
};//end Crud.getData