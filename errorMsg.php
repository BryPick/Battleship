<?php
    require_once(__DIR__.'/layouts/top_layout.php');
?>

<?php
    if(isset($_SESSION['errorMsg'])) {
        echo $_SESSION['errorMsg'];
    }
?>

<?php
    require_once(__DIR__.'/layouts/bottom_layout.php');
?>
