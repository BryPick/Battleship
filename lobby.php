<?php
    require_once(__DIR__.'/layouts/top_layout.php');
?>
    <div class="container" id="lobby-container">
        <h1 class="sub-logo">Battleship</h1>
        <div id="user-challenge">
            <p>Stuff</p>
        </div>
        <div id="user-lobby">
            <p>Stuff</p>
        </div>
    </div>
<?php
    require_once(__DIR__.'/layouts/bottom_layout.php');
?>

<script type="text/javascript" src="js/Lobby.js"></script>
<script>
    var lobby = new Lobby();
</script>
