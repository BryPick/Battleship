<?php

class ExecuteQuery {

    function __construct() {
        $this->Database = new Database();
    }//end ExecuteQuery constructor

    /* function to call all types of SQL queries (DELETE, UPDATE, SELECT, etc...)
     * @param $sqlQuery - the desired MySQL query to be called
     * @param $params - an associative array if there is one
     * @params $type - identify type of query (DELETE, UPDATE, SELECT, etc...), helps when identifying a successful update/delete query
     * @return $result - either the data fetched from select query or status of update/delete query (i.e number of rows of affected)
     */
    public function executeQuery($sqlQuery, $params, $type) {
        try {
            if (sizeof($params) == 0) {
                $conn = $this->Database->getConnection();
                $query = $conn->prepare($sqlQuery);
                if ($query->execute()) {
                    if ($type == "select") {
                        $result = $query->fetchAll(PDO::FETCH_ASSOC);
                        $conn = null;
                        $params = null;
                        return $result;
                    } else {
                        $result = $query->rowCount();
                        $conn = null;
                        $params = null;
                        return $result;
                    }
                }
            } else {
                $conn = $this->Database->getConnection();
                $query = $conn->prepare($sqlQuery);
                foreach ($params as $key => &$key_value) {
                    $query->bindParam($key, $key_value, PDO::PARAM_STR);
                }
                if ($query->execute()) {
                    if ($type == "select") {
                        $result = $query->fetchAll(PDO::FETCH_ASSOC);
                        $query = null;
                        $conn = null;
                        $params = null;
                        return $result;
                    } else {
                        $result = $query->rowCount();
                        $query = null;
                        $conn = null;
                        $params = null;
                        return $result;
                    }
                }
            }
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }//end executeQuery

    /* function to set the second param for the executeQuery function as an empty array
     * @return $params - returns an empty array
     */
    function paramsIsZero() {
        $params = array();
        return $params;
    }//end paramsIsZero
}