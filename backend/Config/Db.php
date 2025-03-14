<?php
class Db {
  private $host = '127.0.0.1';
  private $dbname = 'gestordiaria';
  private $username = 'root';
  private $password = 'danielsdev!!';
  private $pdo;

  public function __construct() {
      try {
          $this->pdo = new PDO("mysql:host={$this->host};dbname={$this->dbname}", $this->username, $this->password);
          $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      } catch (PDOException $e) {
          echo "Connection failed: " . $e->getMessage();
      }
  }

  public function getConnection() {
      return $this->pdo;
  }
}
