<?php
    require_once(__DIR__.'/layouts/top_layout.php');
?>
    <div class="container">
        <div class="row vertical-center">
            <div class="user-forms">
                <h1 class="sub-title">Login</h1>
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" id="enter-username" placeholder="Username" required/>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="enter-password" placeholder="Password" required/>
                    </div>
                    <div class="form-group submit-btn">
                        <input type="button" class="btn btn-primary" id="back-home-btn" onclick="location.href='index.php';" value="Back to Home"/>
                        <input type="submit" class="btn btn-success" value="Login"/>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="js/User.js"></script>
<?php
    require_once(__DIR__.'/layouts/bottom_layout.php');
?>
