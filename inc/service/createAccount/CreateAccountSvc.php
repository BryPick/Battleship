<?php
    require_once(__DIR__.'/../../business/user/UserData.class.php');

    function createUserDataObj() {
        return $UserData = new UserData();
    }//end createUserDataObj

    function checkExistingUser($data) {
        $UserData = createUserDataObj();
        $existingUser = $UserData->getUser($data);
        if($existingUser) {
            return array('userExists' => true);
        }else {
            return array('userExists' => false);
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