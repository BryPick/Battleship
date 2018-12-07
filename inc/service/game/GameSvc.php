<?php
    require_once(__DIR__.'/../../business/game/GameData.class.php');

    //Cancel game by updating game table
    function cancelGame($data) {
        $GameData = createGameDataObj();
        $cancelGameStatus = $GameData->cancelGame($data);
        if($cancelGameStatus) {
            return array("cancelGameStatus" => $cancelGameStatus);
        }else {
            return array("cancelGameStatus" => $cancelGameStatus);
        }
    }//end cancelGame

    //Get the status of any game
    function checkGameStatus($data) {
        $GameData = createGameDataObj();
        $gameStatus = $GameData->checkGameStatus($data);
        if($gameStatus) {
            return array("gameStatus" => $gameStatus);
        }else {
            return array("gameStatus" => null);
        }
    }//end checkGameStatus

    //Create the GameData object to use throughout the file
    function createGameDataObj() {
        return $GameData = new GameData();
    }//end createGameDataObj

    //Creates new game entry
    function createGame($data) {
        $GameData = createGameDataObj();
        $createGameRes = $GameData->createGame($data);
        if($createGameRes) {
            return array("createGameRes" => true);
        }else {
            return array("createGameRes" => false);
        }
    }//end createGame

    //Start game by changing game status to "Started"
    function startGame($data) {
        $GameData = createGameDataObj();
        $startGameRes = $GameData->startGame($data);
        if($startGameRes) {
            return array("startGameRes" => $startGameRes);
        }else {
            return array("startGameRes" => $startGameRes);
        }
    }//end startGame