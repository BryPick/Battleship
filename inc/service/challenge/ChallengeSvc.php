<?php
    require_once(__DIR__ . '/../../business/challenge/ChallengeData.class.php');

    //Accept challenge from user
    function acceptChallenge($data) {
        $ChallengeData = createChallengeDataObj();
        $acceptStatus = $ChallengeData->acceptChallenge($data);
        if($acceptStatus) {
            return array("acceptStatus" => true);
        }else {
            return array("acceptStatus" => false);
        }
    }//end acceptChallenge

    function createChallengeDataObj() {
        return $ChallengeData = new ChallengeData();
    }//end createChallengeDataObj

    //Checks the status of a challenger's challenge
    function checkChallengeStatus($data) {
        $ChallengeData = createChallengeDataObj();
        $challStatus = $ChallengeData->checkChallengeStatus($data);
        if($challStatus) {
            return array("challStatus" => $challStatus);
        }else {
            return array("challStatus" => "error");
        }
    }//end checkChallengeStatus

    function declineChallenge($data) {
        $ChallengeData = createChallengeDataObj();
        $declineStatus = $ChallengeData->declineChallenge($data);
        if($declineStatus) {
            return array("declineStatus" => true);
        }else {
            return array("declineStatus" => false);
        }
    }//end declineChallenge

    function getChallenge($data) {
        $ChallengeData = createChallengeDataObj();
        $challenge = $ChallengeData->getChallenge($data);
        if($challenge) {
            return array("challenge" => $challenge);
        }else {
            return array("challenge" => null);
        }
    }//end getChallenge

    //Sends user challenge to the database
    function sendChallenge($data) {
        $ChallengeData = createChallengeDataObj();
        $challengeID = $ChallengeData->createChallenge($data);
        if($challengeID) {
            return array("challengeID" => $challengeID);
        }else {
            return array("challengeID" => "error");
        }
    }//end sendChallenge