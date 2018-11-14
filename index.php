<?php
    require_once(__DIR__.'/layouts/top_layout.php');
?>
    <div class="container">
        <div class="row vertical-center">
            <div class="col-12" id="main-landing">
                <h1 class="main-logo">Battleship</h1>
                <div id="account-buttons">
                    <input type="button" class="btn btn-danger" id="login-btn" onclick="location.href='login.php';" value="Login"/>
                    <input type="button" class="btn btn-danger" id="acct-btn" onclick="location.href='createAccount.php';" value="Create New Account"/>
                </div>
            </div>
        </div>
    </div>
<?php
    require_once(__DIR__.'/layouts/bottom_layout.php');
?>
