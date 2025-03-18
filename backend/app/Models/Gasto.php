<?php

namespace App\Models;
require_once __DIR__ . '/../../config/Db.php';
use PDO;
use Db;

class GastoModel {
    private $pdo;

    public function __construct() {
      $db = new Db();
      $this->pdo = $db->getConnection();
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

// Retorna todos os gastos atuais
public function listarGastos() {
    $query = $this->pdo->prepare("SELECT * FROM gastos ORDER BY data DESC");
    $query->execute();
    return $query->fetchAll(PDO::FETCH_ASSOC);
}

// Move os gastos para o histórico e limpa a tabela de gastos
public function fecharQuinzena($dataFechamento) {
    try {
        $this->pdo->beginTransaction();

        // Passo 1: Mover gastos para o histórico
        $queryMoverGastos = $this->pdo->prepare("
            INSERT INTO historico_gastos (categoria, descricao, valor, data, data_fechamento)
            SELECT categoria, descricao, valor, data, :data_fechamento
            FROM gastos
        ");
        $queryMoverGastos->bindParam(':data_fechamento', $dataFechamento);
        $queryMoverGastos->execute();

        // Passo 2: Limpar a tabela de gastos
        $queryLimparGastos = $this->pdo->prepare("DELETE FROM gastos");
        $queryLimparGastos->execute();

        $this->pdo->commit();
        return true;
    } catch (\Exception $e) {
        $this->pdo->rollBack();
        throw new \Exception("Erro ao fechar quinzena: " . $e->getMessage());
    }
}
  // Gera o relatório da quinzena fechada
  public function gerarRelatorioQuinzena($dataFechamento) {
    try {
        // Passo 1: Buscar os gastos do histórico com base na data de fechamento
        $query = $this->pdo->prepare("
            SELECT categoria, descricao, valor, data
            FROM historico_gastos
            WHERE data_fechamento = :data_fechamento
            ORDER BY data DESC
        ");
        $query->bindParam(':data_fechamento', $dataFechamento);
        $query->execute();
        $gastos = $query->fetchAll(PDO::FETCH_ASSOC);

        // Depuração: Verifique os dados retornados
        if (empty($gastos)) {
            throw new \Exception("Nenhum gasto encontrado para a data de fechamento: " . $dataFechamento);
        }

        // Passo 2: Calcular o total gasto na quinzena
        $totalGasto = 0;
        foreach ($gastos as &$gasto) {
            // Certifique-se de que o valor é numérico
            if (!is_numeric($gasto['valor'])) {
                throw new \Exception("Valor do gasto não é numérico: " . print_r($gasto, true));
            }
            // Converta o valor para float
            $gasto['valor'] = (float) $gasto['valor'];
            $totalGasto += $gasto['valor'];
        }

        // Passo 3: Retornar o relatório com os gastos e o total
        return [
            'gastos' => $gastos,
            'total_gasto' => $totalGasto
        ];
    } catch (\Exception $e) {
        throw new \Exception("Erro ao gerar relatório quinzenal: " . $e->getMessage());
    }
}
}
