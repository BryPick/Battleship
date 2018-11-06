<?php
    class Database {

        // specify your own database credentials
        private $host = "localhost";
        private $db_name = "battleship";
        private $username = "root";
        private $password = "yukinositaRed21";
        public $conn;

        public function __construct() {

        }

        // Get the database connection
        public function getConnection() {
            $this->conn = null;
            try {
                $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
                $this->conn->exec("set names utf8");
            } catch (PDOException $exception) {
                error_log("Connection error: " . $exception->getMessage(), 0);
            }
            return $this->conn;
        }//end getConnection

    }//end Database