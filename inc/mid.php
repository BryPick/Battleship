<?php
    if($_GET['func'] || $_POST['func']) {
        foreach(glob("./service/".$_REQUEST['service']."/*.php") as $filename) {
            require $filename;
        }
        $serviceFunction = $_REQUEST['func'];
        $request = @call_user_func($serviceFunction,$_REQUEST['data']);

        if($request) {
            echo json_encode($request);
        }
    }