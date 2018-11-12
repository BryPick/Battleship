<?php
    require_once(__DIR__.'/layouts/top_layout.php');
?>
    <div class="container">
        <div class="row vertical-center">
            <div class="user-forms">
                <h1 class="sub-title">Create Account</h1>
                <div class="alert" id="user-msg" role="alert">
                </div>
                <div class="forms">
                    <div class="form-group">
                        <input type="text" class="form-control" id="create-username" placeholder="Create Username" required/>
                    </div>
                    <div class="form-group">
                        <div class="pw-toggle-group">
                            <input type="password" class="form-control" id="create-password" placeholder="Create Password" required/>
                            <a id="regPwToggleLink" onclick=""><i class="fa fa-eye"></i> Show</a>
                        </div>
                        <div id="pwd-char-req">
                            <p class="pwd-chars-msg" id="eight-chars-msg"><strong>Password at least 8 characters long</strong><span class="done-word" id="done-eight"><strong>: DONE!</strong></span><br></p>
                            <p class="pwd-chars-msg" id="spec-chars-msg"><strong>Password contains one special character: !@#$%&</strong><span class="done-word" id="done-spec"><strong>: DONE!</strong></span></p>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="conf-password" placeholder="Confirm Password" required/>
                    </div>
                    <div class="form-group create-acct-btns">
                        <input type="button" class="btn btn-danger" id="back-home-btn" onclick="location.href='index.php';" value="Back to Home"/>
                        <input type="submit" class="btn btn-success" id="create-acct-btn" value="Create Account"/>
                    </div>
                </div>
            </div>
        </div>
    </div>

<?php
    require_once(__DIR__.'/layouts/bottom_layout.php');
?>

<script src="js/User.js"></script>
<script>var user = new User();</script>