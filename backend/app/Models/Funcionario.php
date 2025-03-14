<?php
namespace App\Models;
require_once __DIR__ . '/../../config/Db.php';
use PDO;
use Db;
class Funcionario {
    private $pdo;

    public function __construct(){
        $db = new Db();
        $this->pdo = $db->getConnection();
    }

    // Método para obter todos os funcionários com suas diárias
    public function getAllComDiarias() {
        $query = $this->pdo->prepare("SELECT f.id, f.nome, f.foto, COUNT(d.id) AS diarias
                                      FROM funcionarios f
                                      LEFT JOIN diarias d ON f.id = d.funcionario_id
                                      GROUP BY f.id;");
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    // Método para obter os funcionários pela data
    public function getFuncionariosPorData($data) {
      $query = $this->pdo->prepare("
          SELECT f.id, f.nome, f.foto,
                 (SELECT COUNT(*) FROM diarias d WHERE d.funcionario_id = f.id AND d.data = :data) AS diaria_marcada
          FROM funcionarios f
      ");
      $query->bindParam(':data', $data);
      $query->execute();

      $funcionarios = $query->fetchAll(PDO::FETCH_ASSOC);

      // Converter o resultado para um booleano
      foreach ($funcionarios as &$funcionario) {
          $funcionario['diaria_marcada'] = $funcionario['diaria_marcada'] > 0; // Se > 0, significa que já tem diária
      }

      return $funcionarios;
  }

    // Método para criar uma diária diretamente no FuncionarioModel
    public function criarDiaria($funcionarioId, $data) {
        // Inserir uma nova diária
        $query = $this->pdo->prepare("INSERT INTO diarias (funcionario_id, data) VALUES (:funcionarioId, :data)");
        $query->bindParam(':funcionarioId', $funcionarioId);
        $query->bindParam(':data', $data);

        if ($query->execute()) {
            // Atualiza a quantidade de diárias no funcionário
            $this->atualizarDiariasFuncionario($funcionarioId);
            return true;
        }

        return false;
    }

    // Método para atualizar a quantidade de diárias de um funcionário
    private function atualizarDiariasFuncionario($funcionarioId) {
        $query = $this->pdo->prepare("UPDATE funcionarios
                                      SET diarias = (SELECT COUNT(*) FROM diarias WHERE funcionario_id = :funcionario_id)
                                      WHERE id = :funcionario_id");
        $query->bindParam(':funcionario_id', $funcionarioId);
        $query->execute();
    }
}
