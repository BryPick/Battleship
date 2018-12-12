<?php
    require_once(__DIR__.'/layouts/top_layout.php');

    //Check if the user is logged in
    if(!isset($_SESSION['username'])) {
        $_SESSION['errorMsg'] = "<div class='vertical-center'>
                                        <div class='err-msg'>
                                            <h2 id='err-heading'>Please Login!</h2>
                                            <p id='login-redirect'><a href='login.php'><<< Login</a></p>
                                        </div>
                                    </div>";
        header('Location: errorMsg.php');
    }

    //Check if the user is allowed to be on this page
    if(!isset($_SESSION['player1-username']) && !isset($_SESSION['player2-username'])) {
        $_SESSION['errorMsg'] = "<div class='vertical-center'>
                                        <div class='err-msg'>
                                            <h2 id='err-heading'>Not allowed to enter this game!</h2>
                                            <p id='lobby-redirect'><a href='lobby.php'><<< Back to lobby</a></p>
                                        </div>
                                    </div>";
        header('Location: errorMsg.php');
    }

    //Check if the user is allowed to be on this page
    if($_SESSION['player1-username'] != $_SESSION['username'] && $_SESSION['player2-username'] != $_SESSION['username']) {
        $_SESSION['errorMsg'] = "<div class='vertical-center'>
                                        <div class='err-msg'>
                                            <h2 id='err-heading'>Not allowed to enter this game!</h2>
                                            <p id='lobby-redirect'><a href='lobby.php'><<< Back to lobby</a></p>
                                        </div>
                                    </div>";
        header('Location: errorMsg.php');
    }
?>
<div id="game-container">
    <div id="boards-container">
        <div id="game-boards">
            <div id="your-board">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800px" height="600px">
                    <rect x="0px" y="0px" width="200px" height="600px" class="ship-placement" />
                </svg>
            </div>
            <div id="opponents-board">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800px" height="600px">
                    <rect x="0px" y="0px" width="200px" height="600px" class="ship-placement" />
                    <text x="20" y="20" fill="white">Opponent's</text>
                </svg>
            </div>
            <div id="boards-control">
                <button class="btn btn-warning" id="your-board-btn">Your Board</button>
                <button class="btn btn-warning" id="opp-board-btn">Opponent's Board</button>
                <!--<button class="btn btn-danger" id="fire-btn">Fire</button>-->
                <button class="btn btn-success" id="finish-setup-btn">Finish Setup</button>
            </div>
        </div>
        <div id="game-chat">
            <div id="game-chat-box">
            </div>
            <div id="game-input-chat-text">
                <input type="text" class="form-control" id="game-chat-input" placeholder="Enter message (Press enter to send)"/>
            </div>
        </div>
    </div>
    <div id="hud-container">
        <div id="radar-msg-update">
            <img src="img/radar_screen_animation_by_mardoek50-dbsfgid.gif" alt="radar"/>
            <div id="rader-alert-msg">
                <p id="radar-miss-msg">MISS</p>
                <p id="radar-hit-msg">HIT</p>
            </div>
        </div>
        <div id="turn-tracker">
            <p id="<?php
                    if($_SESSION['username'] == $_SESSION['player1-username']){
                        echo "player1";
                    }else {
                        echo "player2";
                    }
                    ?>-username">
                <?php
                    if($_SESSION['username'] == $_SESSION['player1-username']){
                        echo $_SESSION['player1-username']."'s Turn";
                    }else {
                        echo $_SESSION['player2-username']."'s Turn";
                    }
                ?>
            </p>
            <p id="<?php
                    if($_SESSION['username'] != $_SESSION['player1-username']){
                        echo "player1";
                    }else {
                        echo "player2";
                    }
                    ?>-username">
                <?php
                    if($_SESSION['username'] != $_SESSION['player1-username']){
                        echo $_SESSION['player1-username']."'s Turn";
                    }else {
                        echo $_SESSION['player2-username']."'s Turn";
                    }
                ?>
            </p>
        </div>
        <div id="ship-names">
            <div id="ship-names-txt">
                <p>Your Ships</p>
                <hr/>
                <p>Carrier (5)</p>
                <p>Battleship (4)</p>
                <p>Destroyer (3)</p>
                <p>Submarine(3)</p>
                <p>Patrol Boat (2)</p>
            </div>
        </div>
        <div id="hide-chat">
            <button class="btn btn-secondary" id="hide-chat-btn">Hide Chat</button>
        </div>
    </div>
</div>
<div class="modal fade" id="ingame-popup" tabindex="-1" role="dialog" aria-labelledby="ingame-popup" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title col-12 text-center" id="ingame-popup-label"></h5>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" id="close-btn" data-dismiss="modal"></button>
                <button type="button" class="btn btn-success" id="acknowledge-btn" data-dismiss="modal">Ok</button>
            </div>
        </div>
    </div>
</div>

<?php
    require_once(__DIR__.'/layouts/bottom_layout.php');
?>
<script type="text/javascript" src="js/objects/game/Cell.js"></script>
<script type="text/javascript" src="js/objects/game/Game.js"></script>
<script type="text/javascript" src="js/objects/game/Ship.js"></script>
<script type="text/javascript" src="js/objects/game/Player.js"></script>
<script>
    let yourUsername = <?php
                            if($_SESSION['username'] == $_SESSION['player1-username']){
                                echo '\''.$_SESSION['player1-username'].'\'';
                            }else {
                                echo '\''.$_SESSION['player2-username'].'\'';
                            }
                        ?>;
    let oppUsername = <?php
                            if($_SESSION['username'] != $_SESSION['player1-username']){
                                echo '\''.$_SESSION['player1-username'].'\'';
                            }else {
                                echo '\''.$_SESSION['player2-username'].'\'';
                            }
                        ?>;
    let yourPlayerNumber = <?php
                                if($_SESSION['username'] == $_SESSION['player1-username']){
                                    echo '\'1\'';
                                }else {
                                    echo '\'2\'';
                                }
                            ?>;
    let currPlayer = new Player(<?php echo $_GET['gameID'];?>,
                            <?php echo $_SESSION['userID']; ?>,
                            <?php echo '\''.$_SESSION['username'].'\''; ?>, yourPlayerNumber);
    let game = new Game(<?php echo $_GET['gameID'];?>, yourUsername, oppUsername, currPlayer);
</script>
