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
    <div class="container" id="lobby-container">
        <h1 class="sub-logo">Battleship</h1>
        <div id="user-challenge">
            <p class="lobby-heading">Create Match</p>
            <div id="challenge-table">
                <table class="table table-hover table-dark">
                    <tbody>
                        <tr>
                            <td><img src="svg/<?php echo $_SESSION['icon'];?>"/></td>
                            <td id="current-user"><span id="curr-user-username"><?php echo $_SESSION['username'];?></span> (You)</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td id="challenged-player"><span id="chall-player-username">(Select a player)</span></td>
                            <td id="remove-btn"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="challenge-btns">
                <input type="button" class="btn btn-secondary" id="settings-btn" value="Match Settings"/>
                <input type="button" class="btn btn-danger" id="start-match-btn" data-toggle="modal" data-target="#game-popup" value="Start Match"/>
            </div>
        </div>
        <div id="user-lobby">
            <div id="lobby-top">
                <p class="lobby-heading">Lobby</p>
                <button class="btn btn-secondary" id="user-menu-btn" data-toggle="modal" data-target="#user-menu">User Menu</button>
            </div>
            <div id="lobby-table">
                <table class="table table-hover table-dark">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Username</th>
                            <th scope="col">Win</th>
                            <th scope="col">Loss</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
        <div id="lobby-chat">
            <p class="lobby-heading">Chat</p>
            <div id="chat-box">

            </div>
            <div id="input-chat-text">
                <input type="text" class="form-control" id="chat-input" placeholder="Enter message"/>
            </div>
        </div>
    </div>
    <div class="modal fade" id="user-menu" tabindex="-1" role="dialog" aria-labelledby="user-menu-label" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title col-12 text-center" id="user-menu-label">User Menu</h5>
                </div>
                <div class="modal-body" id="user-menu-body">
                    <p class="user-menu-option">Edit User Icon</p>
                    <p class="user-menu-option" data-dismiss="modal">Exit User Menu</p>
                    <p class="user-menu-option" id="logout-menu-option">Logout</p>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="cancel-game-popup" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title col-12 text-center" id="cancel-game-popup-label"></h5>
                </div>
                <div class="modal-footer">
                    <button type="button" id="cancel-game-cancel" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" id="cancel-game-confirm" class="btn btn-danger">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="challenge-popup" tabindex="-1" role="dialog" aria-labelledby="challenge-label" aria-hidden="true" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title col-12 text-center" id="challenge-label"></h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="close-chall-btn" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" id="challenge-btn">Challenge</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="game-popup" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title col-12 text-center" id="game-popup-label"></h5>
                </div>
                <div class="modal-body">

                </div>
                <div class="modal-footer">
                    <button type="button" id="conf-cancel-game" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" id="conf-start-game" class="btn btn-danger">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="new-challenge" tabindex="-1" role="dialog" aria-labelledby="new-challenge" aria-hidden="true" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title col-12 text-center" id="new-challenge-label"></h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" id="decline-chall-btn" data-dismiss="modal">Decline</button>
                    <button type="button" class="btn btn-success" id="accept-chall-btn">Accept</button>
                </div>
            </div>
        </div>
    </div>
<?php
    require_once(__DIR__.'/layouts/bottom_layout.php');
?>
<script type="text/javascript" src="js/objects/user/User.js"></script>
<script type="text/javascript" src="js/objects/lobby/Lobby.js"></script>
<script>
    let user = new User(<?php echo $_SESSION['userID'].',\''.$_SESSION['username'].'\',\''.$_SESSION['icon'].'\''?>);
    let lobby = new Lobby();
</script>
