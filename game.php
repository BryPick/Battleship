<?php
    require_once(__DIR__.'/layouts/top_layout.php');

    if(!isset($_SESSION['username'])) {
        $_SESSION['errorMsg'] = "<div class='vertical-center'>
                                        <div class='err-msg'>
                                            <h2 id='err-heading'>Please Login!</h2>
                                            <p id='login-redirect'><a href='login.php'><<< Login</a></p>
                                        </div>
                                    </div>";
        header('Location: errorMsg.php');
    }
?>

<?php
    require_once(__DIR__.'/layouts/bottom_layout.php');
?>
<script type="text/javascript" src="js/objects/game/game.js"></script>
<script>
    let game = new Game(<?php echo $_GET['gameID'];?>);
    console.log(<?php echo $_GET['gameID'];?>)
</script>
