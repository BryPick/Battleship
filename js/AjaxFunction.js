/*
*  Ajax constructor
* */
function AjaxFunction() {}//end AjaxFunction constructor

/* function to handle all get/post requests
 * @param method - 'get' or 'post' request
 * @param data - the data to send -> {}
 * */
AjaxFunction.prototype.ajaxCall = function(method, data) {
    return $.ajax({
        type: method,
        data: data,
        dataType: 'json',
        url: 'inc/mid.php'
    });
};//end AjaxFunction.ajaxCall