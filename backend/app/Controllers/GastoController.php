<?php

namespace App\Controllers;
require_once __DIR__ . '/../models/Gasto.php';
use App\Models\GastoModel;

class GastoController {
    private $gastoModel;

    public function __construct() {
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
  public function gerarRelatorioQuinzena() {
    $data = json_decode(file_get_contents("php://input"), true);
    $dataFechamento = $data['data_fechamento'] ?? date('Y-m-d');


    if ($dataFechamento) {
      $relatorio = $this->gastoModel->gerarRelatorioQuinzena($dataFechamento);
      if ($relatorio) {
        echo json_encode($relatorio);

      } else {
        http_response_code(500);
        echo json_encode(["message" => "Erro ao gerar relatório"]);
      }
    } else {
      http_response_code(400);
      echo json_encode(["message" => "Datas de início e fim são obrigatórias"]);
    }
  }
}
