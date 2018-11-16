/*
*  AccountPage constructor
* */
function AccountPage() {
    this.init();
}//end AccountPage constructor

//Inherit AjaxFunction
AccountPage.prototype = new AjaxFunction();

//AccountPage init function
AccountPage.prototype.init = function() {
    this.showPassText();
};//end AccountPage.init

//Show password text for login and create account pages
AccountPage.prototype.showPassText = function() {
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
};//end AccountPage.showPassText

//Show user an alert message
AccountPage.prototype.showUserMsg = function(msg, type) {
    var userErrMsg = $('#user-msg');
    userErrMsg.show();
    userErrMsg.removeClass('alert-danger');
    userErrMsg.removeClass('alert-warning');
    userErrMsg.removeClass('alert-success');
    userErrMsg.addClass(type);

    userErrMsg.text(msg);
};//end AccountPage.showUserError

