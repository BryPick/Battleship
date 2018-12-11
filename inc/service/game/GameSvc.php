<?php
    session_start();
    require_once(__DIR__.'/../../business/game/GameData.class.php');
    require_once(__DIR__ . '/../../business/user/UserData.class.php');

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