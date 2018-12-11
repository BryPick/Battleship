<?php
class LobbyData {
    function __construct() {
        require_once(__DIR__ . '/../../data/ExecuteQuery.php');
        $this->ExecuteQuery = new ExecuteQuery();
    }//end __construct LobbyData

    function getChat() {
        $sqlQuery = "SELECT * FROM lobbychat order by timeOfMsg DESC LIMIT 1";
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $this->ExecuteQuery->paramsIsZero(), 'select');
        if($result) {
            return $result;
        }else {
            return null;
        }
    }//end getChat

    /* Function to get all logged in users from MySQL
     * return $result - all logged in users
     * return null - return null if no logged in users
     * */
    function getLoggedInUsers() {
        $sqlQuery = "SELECT userID, username, winCount, lossCount, iconName, role FROM users WHERE loggedIn = :loggedIn";
        $params = array(":loggedIn" => 'Yes');
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, 'select');
        if($result) {
            return $result;
        }else {
            return null;
        }
    }//end getLoggedInUsers

    /* Function to insert chat message to lobby chat
     * @param $data - necessary data to insert lobby chat
     * @param $datetime - the time the message will be sent
     * @return boolean - return true or false if message was successfully inserted
     * */
    function insertChatMsg($data, $datetime) {
        $sqlQuery = "INSERT INTO lobbychat VALUES (:userID, :username, :msg, :dateTime)";
        $params = array(
                    ":userID" => $data['userID'],
                    ":username" => $data['username'],
                    ":msg" => $data['msg'],
                    ":dateTime" => $datetime
                );
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, 'insert');
        if($result > 0) {
            return true;
        }else {
            return false;
        }
    }//end insertChatMsg

    function getLoggedOutUsers() {
        $sqlQuery = "SELECT * FROM users WHERE loggedIn = :loggedIn";
        $params = array(":loggedIn" => "No");
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, 'select');
        if($result) {
            return $result;
        }else {
            return null;
        }
    }//end updateLoggedOutUsers
}