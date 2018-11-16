<?php
    session_start();
    require_once(__DIR__.'/../../business/user/UserData.class.php');

    function createUserDataObj() {
        return $UserData = new UserData();
    }//end createUserDataObj

    function checkCreds($data) {
        $UserData = createUserDataObj();
        $userInfo = $UserData->getUser($data);
        if($userInfo) {
            $saltUsed = $userInfo[0]['salt'];
            $currPass = $userInfo[0]['password'];

            $enteredPass = hash('sha256', $data['password'].$saltUsed);
            if($enteredPass == $currPass) {
                $data['username'] = $userInfo[0]['username'];
                $loginUser = $UserData->loginUser($data);
                if($loginUser) {
                    $_SESSION['userID'] = $userInfo[0]['userID'];
                    $_SESSION['username'] = $userInfo[0]['username'];
                    $_SESSION['icon'] = $userInfo[0]['iconName'];
                    return array('credsCorrect' => true);
                }
            }else {
                return array('credsCorrect' => false);
            }
        }else {
            return array('credsCorrect' => false);
        }
    }//end checkCreds