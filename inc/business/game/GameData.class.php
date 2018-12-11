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

    /* Function to get the chat for game
     * @return $result - the gamechat messages
     * @return null - return null if no messages were found
     * */
    function getChat() {
        $sqlQuery = "SELECT * FROM gamechat order by timeOfMsg DESC LIMIT 1";
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $this->ExecuteQuery->paramsIsZero(), 'select');
        if($result) {
            return $result;
        }else {
            return null;
        }
    }//end getChat

    /* Function to get the player 1 ID
     * @param $gameID - gameID
     * @return $result[0]['player1ID'] - player 1 ID
     * @return null - return null if no ID was found
     * */
    function getPlayer1ID($gameID) {
        $sqlQuery = "SELECT player1ID FROM game WHERE gameID = :gameID";
        $params = array(":gameID" => $gameID);
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, "select");
        if($result) {
            return $result[0]['player1ID'];
        }else {
            return null;
        }
    }//end getPlayer1ID

    /* Function to get the player 2 ID
     * @param $gameID - gameID
     * @return $result[0]['player2ID'] - player 2 ID
     * @return null - return null if no ID was found
     * */
    function getPlayer2ID($gameID) {
        $sqlQuery = "SELECT player2ID FROM game WHERE gameID = :gameID";
        $params = array(":gameID" => $gameID);
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, "select");
        if($result) {
            return $result[0]['player2ID'];
        }else {
            return null;
        }
    }//end getPlayer2ID

    /* Function to insert chat message to game chat
     * @param $data - necessary data to insert game chat
     * @param $datetime - the time the message will be sent
     * @return boolean - return true or false if message was successfully inserted
     * */
    function insertChatMsg($data, $datetime) {
        $sqlQuery = "INSERT INTO gamechat VALUES (:gameID, :playerID, :playerUsername, :msg, :timeOfMsg)";
        $params = array(
            ":gameID" => $data['gameID'],
            ":playerID" => $data['playerID'],
            ":playerUsername" => $data['playerUsername'],
            ":msg" => $data['msg'],
            ":timeOfMsg" => $datetime
        );
        $result = $this->ExecuteQuery->executeQuery($sqlQuery, $params, 'insert');
        if($result > 0) {
            return true;
        }else {
            return false;
        }
    }//end insertChatMsg

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