<?php
class UserData {
    function __construct() {
        require_once(__DIR__ . '/../../data/ExecuteQuery.php');
        $this->ExecuteQuery = new ExecuteQuery();
    }//end __construct UserData

    /* Function to get the user with specified username
     * @param $data - necessary data to do MySQL query
     * @return $result - specified user
     * @return null - return null if no user exists
     * */
    function getUser($data) {
        $sqlQuery = 'SELECT * FROM users WHERE username = :username';
        $params = array(':username' => $data['username']);
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, 'select');
        if($result) {
            return $result;
        }else {
            return null;
        }
    }//end getUser

    /* Function to get the username based on the userID
     * @param $id - the userID
     * @return $result[0]['username'] - the desired username
     * @return null - return null if no username exists
     * */
    function getUsername($id) {
        $sqlQuery = 'SELECT * FROM users WHERE userID = :ID';
        $params = array(':ID' => $id);
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, 'select');
        if($result) {
            return $result[0]['username'];
        }else {
            return null;
        }
    }//end getUsername

    /* Function to create a new user
     * @param $data - necessary data to do MySQL query
     * @return $result - specifying if user was inserted
     * @return null - return null if no user inserted
     * */
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
        if($result > 0) {
            return $result;
        }else {
            return null;
        }
    }//end createUser

    function loginUser($data) {
        $sqlQuery = "UPDATE users SET loggedIn = :loggedIn WHERE username = :username";
        $params = array(':loggedIn' => 'Yes',
                        ':username' => $data['username']
                    );
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, 'update');
        if($result > 0) {
            return true;
        }else {
            return false;
        }
    }//end loginUser

    function logout($data) {
        $sqlQuery = "UPDATE users SET loggedIn = :loggedIn WHERE username = :username";
        $params = array(':loggedIn' => 'No',
                        ':username' => $data['username']
                    );
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, 'update');
        if($result > 0) {
            return true;
        }else {
            return false;
        }
    }//end logout
}