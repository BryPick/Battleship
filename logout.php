<?php
    session_start();
    session_destroy();
    unset($_SESSION['userID']);
    unset($_SESSION['username']);
    unset($_SESSION['icon']);
    header('Location: index.php');