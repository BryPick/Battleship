<?php

class ChallengeData {
    function __construct() {
        require_once(__DIR__ . '/../../data/ExecuteQuery.php');
        $this->ExecuteQuery = new ExecuteQuery();
    }//end __construct ChallengeData

    function acceptChallenge($data) {
        $sqlQuery = "UPDATE challenge SET result = :result WHERE challengeID = :challengeID";
        $params = array(":result" => $data["result"], ":challengeID" => $data['challengeID']);
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, "update");
        if($result > 0) {
            return true;
        }else {
            return false;
        }
    }

    //Check challenger's challenge status
    function checkChallengeStatus($data) {
        $sqlQuery = "SELECT result FROM challenge WHERE challengeID = :challengeID";
        $params = array(":challengeID" => $data['challengeID']);
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, "select");
        if($result) {
            return $result[0]['result'];
        }else {
            return null;
        }
    }//end checkChallengeStatus

    //Insert data to challenge table
    function createChallenge($data) {
        $sqlQuery = "INSERT INTO challenge (challengerID, challengerUsername, challengedID, challengedUsername, result) VALUES (:challengerID, :challengerName, :challengedID, :challengedName, :result)";
        $params = array(":challengerID" => $data['challengerID'],
                        ":challengerName" => $data['challengerUsername'],
                        ":challengedID" => $data['challengedID'],
                        ":challengedName" => $data['challengedUsername'],
                        ":result" => $data['result']);
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, 'insert');
        if($result > 0) {
            $challengeID = $this->getPendingChallengeID($data['challengerUsername'], $data['challengedUsername']);
            if($challengeID) {
                return $challengeID;
            }
        }else {
            return false;
        }
    }//end createChallenge

    function declineChallenge($data) {
        $sqlQuery = "UPDATE challenge SET result = :result WHERE challengeID = :challengeID";
        $params = array(":result" => $data["result"], ":challengeID" => $data['challengeID']);
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, "update");
        if($result > 0) {
            return true;
        }else {
            return false;
        }
    }//end declineChallenge

    //Get a challenge for a specific user
    function getChallenge($data) {
        $sqlQuery = "SELECT * FROM challenge WHERE challengedID = :userID AND result = :result";
        $params = array(":userID" => $data["userID"], ":result" => $data['result']);
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, "select");
        if($result) {
            return $result;
        }else {
            return null;
        }
    }//end getChallenge

    //Get challenge ID of a pending challenge
    function getPendingChallengeID($challenger, $challenged) {
        $sqlQuery = "SELECT challengeID FROM challenge WHERE challengerUsername = :challenger
                                                        AND challengedUsername = :challenged
                                                          AND result = :result";
        $params = array(":challenger" => $challenger,
                        ":challenged" => $challenged,
                        ":result" => "pending");
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, "select");
        if($result) {
            return $result[0]['challengeID'];
        }else {
            return null;
        }
    }//end getPendingChallengeID
}