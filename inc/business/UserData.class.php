<?php
class UserData {
    function __construct() {
        require_once(__DIR__.'/../data/ExecuteQuery.php');
        $this->ExecuteQuery = new ExecuteQuery();
    }

    function checkCreds($data) {
        $sqlQuery = 'SELECT * FROM users WHERE username = :username';
        $params = array(':username' => $data['username']);
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, 'select');
        if($result) {
            return $result;
        }else {
            return null;
        }
    }//end checkCreds

    function checkExistingUser($data) {
        $sqlQuery = 'SELECT * FROM users WHERE username = :username';
        $params = array(':username' => $data['username']);
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, 'select');
        if($result) {
            return true;
        }else {
            return false;
        }
    }//end checkExistingUser

    function createUser($data) {
        $sqlQuery = 'INSERT INTO users (role, username, password, salt, iconName, loggedIn) VALUES (:role, :username, :password, :salt, :icon, :loggedIn)';
        $params = array(
            ':role' => $data['role'],
            ':username' => $data['username'],
            ':password' => $data['password'],
            ':salt' => $data['salt'],
            ':icon' => $data['icon'],
            ':loggedIn' => $data['loggedIn']
        );
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, 'insert');
        if($result) {
            return $result;
        }else {
            return null;
        }
    }//end createUser

    function deleteUser($data) {

    }//end deleteUser

    function getUser($data) {

    }//end getUser
}