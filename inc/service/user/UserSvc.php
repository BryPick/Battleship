<?php
    require_once(__DIR__ . '/../../business/user/UserData.class.php');

    function createUserDataObj() {
        return $UserData = new UserData();
    }//end createUserDataObj

    function logout($data) {
        $UserData = createUserDataObj();
        $loggedOut = $UserData->logout($data);
        if($loggedOut) {
            return array("loggedOut" => true);
        }else {
            return array("loggedOut" => false);
        }
    }//end logout