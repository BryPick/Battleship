<?php
    class CRUD {
        public function __construct() {
            require_once(__DIR__.'/battleshipdbconnect.php');
            $this->Database = new Database();
        }

        //All the CRUD functions

        function select($cols, $tblName, $bindedParams, $bindedParamVals, $orderByVal) {
            //Build select query string
            $sqlQuery = "SELECT ";

            //Check if the columns were selecting from is more than just select all (*)
            if($cols[0] != "*") {
                //Add the columns you want to select from
                for($i = 0; $i < sizeof($cols); $i++) {
                    //Check if the last column you're adding
                    if($i == (sizeof($cols) - 1)) {
                        $sqlQuery .= $cols[$i];
                    }else {
                        $sqlQuery .= $cols[$i].", ";
                    }
                }
            }else {
                $sqlQuery .= $cols[0];
            }

            //Add the table you want to select from
            $sqlQuery .= " FROM ".$tblName." ";

            if(sizeof($bindedParams) != 0) {
                $sqlQuery .= "WHERE ";

                //Add any bindedParams
                end($bindedParams);
                $endKey = key($bindedParams);
                reset($bindedParams);
                foreach ($bindedParams as $key => &$key_value) {
                    //Check if it's the last binded value you're adding
                    if ($key == $endKey) {
                        $sqlQuery .= $key . "=" . $key_value . " ";
                    } else {
                        $sqlQuery .= $key . "=" . $key_value . " AND ";
                    }
                }
            }

            $sqlQuery .= "ORDER BY ".$orderByVal;
            var_dump($sqlQuery);
            if(sizeof($bindedParams) == 0) {
                $conn = $this->Database->getConnection();
                $query = $conn->prepare($sqlQuery);
                if($query->execute()) {
                    $result = $query->fetchAll(PDO::FETCH_ASSOC);
                    $query = null;
                    $conn = null;
                    $params = null;
                    return $result;
                }else {
                    return null;
                }
            }else {
                $conn = $this->Database->getConnection();
                $query = $conn->prepare($sqlQuery);
                foreach ($bindedParamVals as $key => &$key_value) {
                    $query->bindParam($key, $key_value, PDO::PARAM_STR);
                }
                if($query->execute()) {
                    $result = $query->fetchAll(PDO::FETCH_ASSOC);
                    $query = null;
                    $conn = null;
                    $params = null;
                    return $result;
                }else {
                    return null;
                }
            }
        }//end select

        public function insert($tblName, $bindedParams) {

        }//end insert

        public function update($tblName, $bindedParams) {

        }//end update

        public function delete($tblName, $bindedParams) {

        }//end delete

        /* function to set the second param for the executeQuery function as an empty array
         * @return $params - returns an empty array
         */
        function paramsIsZero() {
            $params = array();
            return $params;
        }//end paramsIsZero
    }