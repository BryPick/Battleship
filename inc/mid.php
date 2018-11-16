<?php
    if(isset($_GET['func']) || isset($_POST['func'])) {
        foreach(glob("./service/".$_REQUEST['service']."/*.php") as $filename) {
            require $filename;
        }
        $serviceFunction = $_REQUEST['func'];
        if(isset($_REQUEST['data'])) {
            $request = @call_user_func($serviceFunction,$_REQUEST['data']);
        }else {
            $request = @call_user_func($serviceFunction);
        }

        if($request) {
            echo json_encode($request);
        }
    }