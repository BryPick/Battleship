<?php
    require_once(__DIR__.'/layouts/top_layout.php');
?>
    <div class="container">
        <div class="row vertical-center">
            <div class="user-forms">
                <h1 class="sub-title">Login</h1>
                <div class="forms">
                    <div class="form-group">
                        <input type="text" class="form-control" id="enter-username" placeholder="Username" required/>
                    </div>
                    <div class="form-group">
                        <div class="pw-toggle-group">
                            <input type="password" class="form-control" id="enter-password" placeholder="Password" required/>
                            <a id="regPwToggleLink" onclick=""><i class="fa fa-eye"></i> Show</a>
                        </div>
                    </div>
                    <div class="form-group login-btns">
                        <input type="button" class="btn btn-danger" id="back-home-btn" onclick="location.href='index.php';" value="Back to Home"/>
                        <input type="submit" class="btn btn-success" id="login-btn" value="Login"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php
    require_once(__DIR__.'/layouts/bottom_layout.php');
?>

<script type="text/javascript" src="js/User.js"></script>
<script>
    var user = new User();
</script>
