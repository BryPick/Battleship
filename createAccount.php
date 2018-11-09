<?php
    require_once(__DIR__.'/layouts/top_layout.php');
?>
    <div class="container">
        <div class="row vertical-center">
            <div class="user-forms">
                <h1 class="sub-title">Create Account</h1>
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" id="create-username" placeholder="Create Username" required/>
                    </div>
                    <div class="form-group">
                        <div class="pw-toggle-group">
                            <input type="password" class="form-control" id="create-password" placeholder="Create Password" required/>
                            <a id="regPwToggleLink" onclick=""><i class="fa fa-eye"></i> Show</a>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="conf-password" placeholder="Confirm Password" required/>
                    </div>
                    <div class="form-group submit-btn">
                        <input type="button" class="btn btn-primary" id="back-home-btn" onclick="location.href='index.php';" value="Back to Home"/>
                        <input type="submit" class="btn btn-success" value="Create Account"/>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="js/User.js"></script>
    <script>var user = new User();</script>
<?php
    require_once(__DIR__.'/layouts/bottom_layout.php');
?>
