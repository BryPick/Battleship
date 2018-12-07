<?php

class GameData {
    function __construct() {
        require_once(__DIR__ . '/../../data/ExecuteQuery.php');
        $this->ExecuteQuery = new ExecuteQuery();
    }//end __construct GameData

    //Update game table with a "Cancelled game status"
    function cancelGame($data) {
        $sqlQuery = "UPDATE game SET gameStatus = :gameStatus WHERE gameID = :gameID";
        $params = array(":gameStatus" => $data['gameStatus'], ":gameID" => $data['gameID']);
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, "update");
        if($result > 0) {
            return true;
        }else {
            return false;
        }
    }//end cancelGame

    function checkGameStatus($data) {
        $sqlQuery = "SELECT gameStatus FROM game WHERE gameID = :gameID";
        $params = array(":gameID" => $data['gameID']);
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, "select");
        if($result) {
            return $result[0]['gameStatus'];
        }else {
            return null;
        }
    }//end checkGameStatus

    function createGame($data) {
        $sqlQuery = "INSERT INTO game (gameID, player1ID, player2ID, board1ID, board2ID, board1PlayerID, board2PlayerID, gameStatus) VALUES (:gameID, :play1ID, :play2ID, :board1ID, :board2ID, :board1Player, :board2Player, :status)";
        $params = array(
            ":gameID" => $data['gameID'],
            ":play1ID" => $data['player1ID'],
            ":play2ID" => $data['player2ID'],
            ":board1ID" => $data['board1ID'],
            ":board2ID" => $data['board2ID'],
            ":board1Player" => $data['board1PlayerID'],
            ":board2Player" => $data['board2PlayerID'],
            ":status" => $data['gameStatus']
        );
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, "insert");
        if($result > 0) {
            return true;
        }else {
            return false;
        }
    }//end createGame

    function startGame($data) {
        $sqlQuery = "UPDATE game SET gameStatus = :gameStatus WHERE gameID = :gameID";
        $params = array(":gameStatus" => $data['gameStatus'], ":gameID" => $data['gameID']);
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, "update");
        if($result > 0) {
            return true;
        }else {
            return false;
        }
    }//end startGame
}