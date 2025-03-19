<?php

namespace App\Controllers;
require_once __DIR__ . '/../models/Gasto.php';
require_once __DIR__ . '/../../config/Db.php';
use App\Models\GastoModel;
use PDO;
use Db;

class GastoController {
    private $gastoModel;
    private $pdo;

    public function __construct() {
      $db = new Db();
      $this->pdo = $db->getConnection();
        $this->gastoModel = new GastoModel();
    }

     // Adiciona um novo gasto
     public function adicionarGasto() {
      $data = json_decode(file_get_contents("php://input"), true);

      $categoria = $data['categoria'] ?? null;
      $descricao = $data['descricao'] ?? null;
      $valor = $data['valor'] ?? null;
      $dataGasto = $data['data'] ?? null;

      if ($categoria && $valor && $dataGasto) {
          $resultado = $this->gastoModel->adicionarGasto($categoria, $descricao, $valor, $dataGasto);
          if ($resultado) {
              echo json_encode(["message" => "Gasto adicionado com sucesso"]);
          } else {
              http_response_code(500);
              echo json_encode(["message" => "Erro ao adicionar gasto"]);
          }
      } else {
          http_response_code(400);
          echo json_encode(["message" => "Dados incompletos"]);
      }
  }

  // Retorna todos os gastos
  public function listarGastos() {
      $gastos = $this->gastoModel->listarGastos();
      echo json_encode($gastos);
  }

  // Fecha a quinzena e move os gastos para o histórico
  public function fecharQuinzena() {
      $data = json_decode(file_get_contents("php://input"), true);
      $dataFechamento = $data['data_fechamento'] ?? null;

      if ($dataFechamento) {
          $resultado = $this->gastoModel->fecharQuinzena($dataFechamento);

          if ($resultado) {
              echo json_encode(["message" => "Quinzena fechada com sucesso"]);
          } else {
              http_response_code(500);
              echo json_encode(["message" => "Erro ao fechar quinzena"]);
          }
      } else {
          http_response_code(400);
          echo json_encode(["message" => "Data de fechamento faltando"]);
      }
  }
  // Gera um relatório da quinzena
  // No seu Controller (ex: GastoController.php ou QuinzenaController.php)
// No GastoController.php
public function gerarRelatorioQuinzena() {
  $dataFechamento = $_GET['data_fechamento'] ?? null;

  if (!$dataFechamento) {
      http_response_code(400);
      echo json_encode(["message" => "Parâmetro data_fechamento é obrigatório"]);
      return;
  }

  $relatorio = $this->gastoModel->getRelatorioPorData($dataFechamento);

  if ($relatorio) {
      echo json_encode($relatorio);
  } else {
      http_response_code(404);
      echo json_encode(["message" => "Nenhum gasto encontrado para a quinzena"]);
  }
}


public function listarQuinzenas() {


  $quinzenas = $this->gastoModel->listarQuinzenas();

  if ($quinzenas) {
      echo json_encode($quinzenas);
  } else {
      echo json_encode([]);
  }
}

}
