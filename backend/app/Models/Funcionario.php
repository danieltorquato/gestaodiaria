<?php
namespace App\Models;

require_once __DIR__ . '/../../config/Db.php';
use PDO;
use Db;
date_default_timezone_set('America/Sao_Paulo');
class Funcionario {
    private $pdo;

    public function __construct() {
        $db = new Db();
        $this->pdo = $db->getConnection();
    }

    // Método para obter todos os funcionários com suas diárias
    public function getAllComDiarias() {
        $query = $this->pdo->prepare("SELECT f.id, f.nome, f.foto, COUNT(d.id) AS diarias
                                      FROM funcionarios f
                                      LEFT JOIN diarias d ON f.id = d.funcionario_id
                                      GROUP BY f.id");
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    // Método para obter os funcionários pela data
    public function getFuncionariosPorData($data) {
        $query = $this->pdo->prepare("
            SELECT f.id, f.nome, f.foto, f.diarias,
                   (SELECT COUNT(*) FROM diarias d WHERE d.funcionario_id = f.id AND d.data = :data) AS diaria_marcada
            FROM funcionarios f
        ");
        $query->bindParam(':data', $data);
        $query->execute();

        $funcionarios = $query->fetchAll(PDO::FETCH_ASSOC);

        // Converter o resultado para um booleano
        foreach ($funcionarios as &$funcionario) {
            $funcionario['diaria_marcada'] = $funcionario['diaria_marcada'] > 0;
        }

        return $funcionarios;
    }

    // Método para criar uma diária
    public function criarDiaria($funcionarioId, $data) {
        $query = $this->pdo->prepare("INSERT INTO diarias (funcionario_id, data) VALUES (:funcionario_id, :data)");
        $query->bindParam(':funcionario_id', $funcionarioId);
        $query->bindParam(':data', $data);
        $resultado = $query->execute();

    if ($resultado) {
      // Incrementar a coluna diarias na tabela funcionarios
      $queryIncremento = $this->pdo->prepare("UPDATE funcionarios SET diarias = diarias + 1 WHERE id = :funcionario_id");
      $queryIncremento->bindParam(':funcionario_id', $funcionarioId);
      $queryIncremento->execute();
  }
  return $resultado;
    }
    // Método para fechar a quinzena
   // Método para fechar a quinzena
   public function fecharQuinzena($dataFechamento) {
    try {
        // Iniciar uma transação para garantir consistência
        $this->pdo->beginTransaction();

        // Passo 1: Mover as diárias para o histórico
        $queryMoverDiarias = $this->pdo->prepare("
            INSERT INTO historico_diarias (funcionario_id, data, valor_diaria, data_fechamento)
            SELECT d.funcionario_id, d.data, f.valor_diaria, :data_fechamento
            FROM diarias d
            INNER JOIN funcionarios f ON d.funcionario_id = f.id
        ");
        $queryMoverDiarias->bindParam(':data_fechamento', $dataFechamento);
        $queryMoverDiarias->execute();

        // Passo 2: Zerar a tabela diarias
        $queryZerarDiarias = $this->pdo->prepare("
            DELETE FROM diarias
        ");
        $queryZerarDiarias->execute();

        // Passo 3: Registrar a quinzena fechada
        $queryQuinzena = $this->pdo->prepare("
            INSERT INTO quinzenas (data_fechamento, fechado)
            VALUES (:data_fechamento, 1)
        ");
        $queryQuinzena->bindParam(':data_fechamento', $dataFechamento);
        $queryQuinzena->execute();

        // Commit da transação
        $this->pdo->commit();

        return true;
    } catch (\Exception $e) {
        // Rollback em caso de erro
        $this->pdo->rollBack();
        throw new \Exception("Erro ao fechar quinzena: " . $e->getMessage());
    }
}

    // Método para obter a última quinzena
    public function getUltimaQuinzena() {
        $query = $this->pdo->prepare("SELECT * FROM quinzenas ORDER BY data_fechamento DESC LIMIT 1");
        $query->execute();
        return $query->fetch(PDO::FETCH_ASSOC);
    }
    // Adiciona um novo gasto
    public function adicionarGasto($categoria, $descricao, $valor, $data) {
      $query = $this->pdo->prepare("
          INSERT INTO gastos (categoria, descricao, valor, data)
          VALUES (:categoria, :descricao, :valor, :data)
      ");
      $query->bindParam(':categoria', $categoria);
      $query->bindParam(':descricao', $descricao);
      $query->bindParam(':valor', $valor);
      $query->bindParam(':data', $data);
      return $query->execute();
  }

  // Retorna todos os gastos
  public function listarGastos() {
      $query = $this->pdo->prepare("SELECT * FROM gastos ORDER BY data DESC");
      $query->execute();
      return $query->fetchAll(PDO::FETCH_ASSOC);
  }
}
