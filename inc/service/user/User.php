<?php
    require_once(__DIR__.'/../../business/UserData.class.php');
    function createUserDataObj() {
        return $UserData = new UserData();
    }

    function checkCreds($data) {
        $UserData = createUserDataObj();
        $userInfo = $UserData->checkCreds($data);
        if($userInfo) {
            $saltUsed = $userInfo[0]['salt'];
            $currPass = $userInfo[0]['password'];

            $enteredPass = hash('sha256', $data['password'].$saltUsed);
            if($enteredPass == $currPass) {
                return array('credsCorrect' => true);
            }else {
                return array('credsCorrect' => false);
            }
        }else {
            return array('credsCorrect' => false);
        }
    }//end checkCreds

    function checkExistingUser($data) {
        $UserData = createUserDataObj();
        $existingUser = $UserData->checkExistingUser($data);
        if($existingUser) {
            return array('userExists' => true);
        }else {
            array('userExists' => false);
        }
    }//end checkExistingUser

    function createUser($data) {
        $UserData = createUserDataObj();
        $incomingData = $data;

        //Data prep
        //Create salt and hash password
        $bytes = openssl_random_pseudo_bytes ( strlen($data['password']) );
        $salt = bin2hex($bytes);
        $hashedPass = hash('sha256', ($data['password'].$salt));

        $incomingData['salt'] = $salt;
        $incomingData['password'] = $hashedPass;

        return $UserData->createUser($incomingData);
    }//end createUser

    function deleteUser($data) {

    }//end deleteUser

    function getUser($data) {

    }//end getUser