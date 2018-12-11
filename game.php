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
                    <rect class="cls-1" x="20px" y="30px" width="60px" height="300px" id="carrier-rect-ship"/>
                    <ellipse class="cls-1" cx="47px" cy="475px" rx="30px" ry="120px" id="battleship-oval-ship"/>
                    <ellipse class="cls-1" cx="150px" cy="120px" rx="30px" ry="90px" id="submarine-oval-ship"/>
                    <rect class="cls-1" x="122px" y="250px" width="60px" height="180px" id="destroyer-rect-ship"/>
                    <rect class="cls-1" x="122px" y="470px" width="60px" height="120px" id="patrol-rect-ship"/>
                </svg>
            </div>
            <div id="opponents-board">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800px" height="600px">
                    <rect x="0px" y="0px" width="200px" height="600px" class="ship-placement" />
                    <text x="20px" y="20px" id="youPlayer" fill="white">
                        2
                    </text>

                </svg>
            </div>
            <div id="boards-control">
                <button class="btn btn-warning" id="your-board-btn">Your Board</button>
                <button class="btn btn-warning" id="opp-board-btn">Opponent's Board</button>
                <!--<button class="btn btn-danger">Fire</button>-->
                <button class="btn btn-success">Finish Setup</button>
            </div>
        </div>
        <div id="game-chat">
            <div id="game-chat-box">
            </div>
            <div id="game-input-chat-text">
                <input type="text" class="form-control" id="game-chat-input" placeholder="Enter message"/>
            </div>
        </div>
    </div>
    <div id="hud-container">
        <div id="radar-msg-update">
            <img src="img/radar_screen_animation_by_mardoek50-dbsfgid.gif" alt="radar"/>
            <div id="rader-alert-msg">
                <!--<p id="radar-miss-msg">MISS</p>-->
                <!--<p id="radar-hit-msg">HIT</p>-->
            </div>
        </div>
        <div id="turn-tracker">
            <p id="player1-username">
                <?php
                    if($_SESSION['username'] == $_SESSION['player1-username']){
                        echo $_SESSION['player1-username']."'s Turn";
                    }else {
                        echo $_SESSION['player2-username']."'s Turn";
                    }
                ?>
            </p>
            <p id="player2-username">
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
                <p>Ships</p>
                <hr/>
                <p>Carrier (5)</p>
                <p>Battleship (4)</p>
                <p>Destroyer (3)</p>
                <p>Submarine(3)</p>
                <p>Patrol Boat (2)</p>
            </div>
        </div>
    </div>
</div>

<?php
    require_once(__DIR__.'/layouts/bottom_layout.php');
?>
<script type="text/javascript" src="js/objects/game/Cell.js"></script>
<script type="text/javascript" src="js/objects/game/Game.js"></script>
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
    let game = new Game(<?php echo $_GET['gameID'];?>, yourUsername, oppUsername);
    let player = new Player(<?php echo $_GET['gameID'];?>,
                            <?php echo $_SESSION['userID']; ?>,
                            <?php echo '\''.$_SESSION['username'].'\''; ?>);
</script>
