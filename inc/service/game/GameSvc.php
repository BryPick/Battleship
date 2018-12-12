<?php
    session_start();
    require_once(__DIR__.'/../../business/game/GameData.class.php');
    require_once(__DIR__ . '/../../business/user/UserData.class.php');

    //Assign turn to a player
    function assignTurn($gameID) {
        $GameData = createGameDataObj();
        $players = array("Player1","Player2");
        //Random choice between player 1 and 2
        $playerNum = $players[rand(1, 100) > 50 ? 1 : 0];
        $assignTurnRes = $GameData->assignTurn($playerNum, $gameID);
        if($assignTurnRes) {
            return true;
        }else {
            return false;
        }
    }//end assignTurn

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

    /* Function to check opponent's setup status
     * @param $data - data necessary to check opponent's status
     * @return array - associative array containing
     * */
    function checkOppSetupStatus($data) {
        $GameData = createGameDataObj();
        $oppStatus = $GameData->checkOppSetupStatus($data);
        if($oppStatus == "Ready") {
            $assignTurnRes = assignTurn($data['gameID']);
            if($assignTurnRes) {
                return array("oppStatus" => $oppStatus);
            }else {
                return array("oppStatus" => "Error");
            }
        }else {
            return array("oppStatus" => $oppStatus);
        }
    }//end checkOppSetupStatus

    /* Function to check who's turn it is
     * @param $data - the data necessary to check the turn
     * @return array - associative indicating if a player's turn was found
     * */
    function checkTurn($data) {
        $GameData = createGameDataObj();
        $currPlayersTurn = $GameData->checkTurn($data);
        if($currPlayersTurn) {
            return array("currPlayersTurn" => $currPlayersTurn);
        }else {
            return array("currPlayersTurn" => null);
        }
    }//end checkTurn

    //Create the GameData object to use throughout the file
    function createGameDataObj() {
        return $GameData = new GameData();
    }//end createGameDataObj

    //Create UserData object
    function createUserDataObj() {
        return $UserData = new UserData();
    }//end createUserDataObj

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

    //Create session variables to use in game
    function createUserSessionVars($data) {
        $UserData = createUserDataObj();
        $GameData = createGameDataObj();

        //Create session variables to use in game
        if(isset($data['player1ID'])) {
            $_SESSION['player1-username'] = $UserData->getUsername($data['player1ID']);

            //Get player2ID for player 1 since they may not know it
            //Create session vars
            $player2ID = $GameData->getPlayer2ID($data['gameID']);
            $_SESSION['player2-username'] = $UserData->getUsername($player2ID);

            if($_SESSION['player1-username'] && $_SESSION['player2-username']) {
                return array("sessionsSet" => true);
            }else {
                return array("sessionsSet" => false);
            }
        }elseif($data['player2ID']) {
            $_SESSION['player2-username'] = $UserData->getUsername($data['player2ID']);

            //Get player1ID for player 2 since they may not know it
            //Create session vars
            $player1ID = $GameData->getPlayer1ID($data['gameID']);
            $_SESSION['player1-username'] = $UserData->getUsername($player1ID);

            if($_SESSION['player1-username'] && $_SESSION['player2-username']) {
                return array("sessionsSet" => true);
            }else {
                return array("sessionsSet" => false);
            }
        }
    }//end createUserSessionVars

    /* Function to tell the database that the user is done setting up ships
     * @param $data - data necessary to finish setup
     * @return array - associative array saying if the update was successful
     * */
    function finishSetup($data) {
        $GameData = createGameDataObj();
        $setupStatus = $GameData->finishSetup($data);
        if($setupStatus) {
            return array("setupStatus" => $setupStatus);
        }else {
            return array("setupStatus" => $setupStatus);
        }
    }//end finishSetup

    function fireShot($data) {
        $GameData = createGameDataObj();
        $shotResult = $GameData->fireShot($data);
        if($shotResult) {
            return array("fireShotResult" => $shotResult);
        }else {
            return array("fireShotResult" => $shotResult);
        }
    }//end fireShot

    /* Function to get the game chat messages
     * @return array - associative array with chat messages or null
     * */
    function getChat() {
        $GameData = createGameDataObj();
        $getChatMsgs = $GameData->getChat();
        if($getChatMsgs) {
            if(isset($_SESSION['timeOfLastGameMsg'])) {
                //Check to see if message in DB is the same as last message fetched from the database
                //If it is the same, don't return anything
                if($_SESSION['timeOfLastGameMsg'] == $getChatMsgs[0]['timeOfMsg']) {
                    return array("getChatResponse"  => null);
                }else {
                    //If it isn't the same, set session variable and send response
                    $_SESSION['timeOfLastGameMsg'] = $getChatMsgs[0]['timeOfMsg'];
                    return array("getChatResponse"  => $getChatMsgs);
                }
            }else {
                $_SESSION['timeOfLastGameMsg'] = $getChatMsgs[0]['timeOfMsg'];
                return array("getChatResponse"  => null);
            }
        }else {
            return array("getChatResponse" => null);
        }
    }//end getChat

    function getGuess($data) {
        $GameData = createGameDataObj();
        $getGuess = $GameData->getGuess($data);
        if($getGuess) {
            return array("guess" => $getGuess);
        }else {
            return array("guess" => null);
        }
    }//end getGuess

    function getResult($data) {
        $GameData = createGameDataObj();
        $getResult = $GameData->getResult($data);
        if($getResult) {
            return array("result" => $getResult);
        }else {
            return array("result" => null);
        }
    }//end getResult

    /* Function to send game chat msg
     * @param $data - the data necessary to send game message
     * @return array - return associative array with true or false
     * */
    function sendGameChatMsg($data) {
        $GameData = createGameDataObj();
        date_default_timezone_set('America/New_York');
        $datetime = date('Y-m-d H:i:s', time());
        $insertResult =  $GameData->insertChatMsg($data, $datetime);
        if($insertResult) {
            return array('chatMsgSent' => true);
        }else {
            return array('chatMsgSent' => false);
        }
    }//end sendGameChatMsg

    function sendResult($data) {
        $GameData = createGameDataObj();
        $sendResult = $GameData->sendResult($data);
        if($sendResult) {
            return array("sendResult" => true);
        }else {
            return array("sendResult" => false);
        }
    }//end sendResult

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

    //Update the guess result to null
    function updateGuessResult($data) {
        $GameData = createGameDataObj();
        $updateResult = $GameData->updateGuessResult($data);
        if($updateResult) {
            return array("updateResult" => $updateResult);
        }else {
            return array("updateResult" => $updateResult);
        }
    }//end updateGuessResult