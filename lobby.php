<?php
    require_once(__DIR__.'/layouts/top_layout.php');
?>
    <div class="container" id="lobby-container">
        <h1 class="sub-logo">Battleship</h1>
        <div id="user-challenge">
            <p class="lobby-heading">Create Match</p>
            <div id="challenge-table">
                <table class="table table-hover">
                    <tbody>
                        <tr>
                            <td>A</td>
                            <td>bryanp21</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>(Select a player)</td>
                            <td><!--<input type="button" class="btn btn-danger rmve-player-btn" value="Remove"/>--></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="challenge-btns">
                <input type="button" class="btn btn-secondary" id="settings-btn" value="Match Settings"/>
                <input type="button" class="btn btn-danger" id="start-match-btn" value="Start Match"/>
            </div>
        </div>
        <div id="user-lobby">
            <p class="lobby-heading">Lobby</p>
            <div id="lobby-table">
                <table class="table table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Username</th>
                            <th scope="col">Win</th>
                            <th scope="col">Loss</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>A</td>
                            <td>bryan</td>
                            <td>90</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>A</td>
                            <td>bryan</td>
                            <td>90</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="lobby-chat">
            <p class="lobby-heading">Chat</p>
            <div id="chat-box">
                <p>bryanp21: There is nothing in here</p>
                <p>bryanp21: what the duck?!</p>
                <p>bryanp21: what the duck?!</p>
                <p>bryanp21: what the duck?!</p>
                <p>bryanp21: what the duck?!</p>
                <p>bryanp21: what the duck?!</p>
                <p>bryanp21: what the duck?!</p>
                <p>bryanp21: what the duck?!</p>
            </div>
            <div id="input-chat-text">
                <input type="text" class="form-control" placeholder="Enter message"/>
            </div>
        </div>
    </div>
<?php
    require_once(__DIR__.'/layouts/bottom_layout.php');
?>

<script type="text/javascript" src="js/Lobby.js"></script>
<script>
    var lobby = new Lobby();
</script>
