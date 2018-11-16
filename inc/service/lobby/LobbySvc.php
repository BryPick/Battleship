<?php
    require_once(__DIR__ . '/../../business/lobby/LobbyData.class.php');
    session_start();
    /* Function to create lobby data object
     * Will help when calling LobbyData object in other functions
     * @return $LobbyData - LobbyData object
     * */
    function createLobbyDataObj() {
        return $LobbyData = new LobbyData();
    }//end createLobbyDataObj

    function getChat() {
        $LobbyData = createLobbyDataObj();
        $datetime = date('Y-m-d H:i:s', time());;
        $getChat = $LobbyData->getChat($datetime);
        if($getChat) {
            //Check if session variable is set (helps see if the user just logged to the lobby)
            if(isset($_SESSION['timeOfLastMsg'])) {
                //Check to see if message in DB is the same as last message fetched from the database
                //If it is the same, don't return anything
                if($_SESSION['timeOfLastMsg'] == $getChat[0]['timeOfMsg']) {
                    return array("getChatResponse"  => null);
                }else {
                    //If it isn't the same, set session variable and send response
                    $_SESSION['timeOfLastMsg'] = $getChat[0]['timeOfMsg'];
                    return array("getChatResponse"  => $getChat);
                }
            }else {
                $_SESSION['timeOfLastMsg'] = $getChat[0]['timeOfMsg'];
                return array("getChatResponse"  => null);
            }
        }else {
            return array("getChatResponse"  => null);
        }
    }//end getChat

    /* Function to get all logged in users
     * @return $loggedInUser - all logged in users
     * @return array("loggedIn" => "none") - array indicating no users logged in
     * */
    function getLoggedInUsers() {
        $LobbyData = createLobbyDataObj();
        $loggedInUsers = $LobbyData->getLoggedInUsers();
        if($loggedInUsers) {
            return $loggedInUsers;
        }else {
            return null;
        }
    }//end getLoggedInUsers

    /* Function to send user lobby chat msg
     * */
    function sendLobbyChatMsg($data) {
        $LobbyData = createLobbyDataObj();
        date_default_timezone_set('America/New_York');
        $datetime = date('Y-m-d H:i:s', time());
        $insertResult =  $LobbyData->insertChatMsg($data, $datetime);
        if($insertResult) {
            return array('chatMsgSent' => true);
        }else {
            return array('chatMsgSent' => false);
        }
    }//end sendLobbyChatMsg