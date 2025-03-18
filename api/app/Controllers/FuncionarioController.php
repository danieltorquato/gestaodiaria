<?php
namespace App\Controllers;
date_default_timezone_set('America/Sao_Paulo');

// Verificar se a requisição é do tipo OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../models/Funcionario.php';
use App\Models\Funcionario;

class FuncionarioController {
    private $funcionarioModel;

    public function __construct() {

        $this->funcionarioModel = new Funcionario();
    }

    // Método para retornar os funcionários com diárias
    public function getFuncionariosComDiarias() {
        try {
            $funcionarios = $this->funcionarioModel->getAllComDiarias();
            $this->responderJson($funcionarios);
        } catch (\Exception $e) {
            $this->responderErro("Erro ao buscar funcionários: " . $e->getMessage(), 500);
        }
    }

    // Método para filtrar os funcionários por data
    public function getFuncionariosPorData() {
        try {
          date_default_timezone_set('America/Sao_Paulo');

            $data = $_GET['data'] ?? date('Y-m-d');
            $funcionarios = $this->funcionarioModel->getFuncionariosPorData($data);
            $this->responderJson($funcionarios);
        } catch (\Exception $e) {
            $this->responderErro("Erro ao filtrar funcionários: " . $e->getMessage(), 500);
        }
    }

    // Método para criar uma diária
    public function criarDiaria() {
      $dados = json_decode(file_get_contents("php://input"), true);

      if (!isset($dados['funcionario_id']) || !isset($dados['data'])) {
          http_response_code(400);
          echo json_encode(["message" => "Campos obrigatórios ausentes"]);
          return;
      }

      $resultado = $this->funcionarioModel->adicionarDiaria($dados['funcionario_id'], $dados['data']);

      if ($resultado) {
          // Buscar a quantidade de diárias atualizada
          $query = "SELECT diarias FROM funcionarios WHERE id = :funcionario_id";
          $stmt = $this->funcionarioModel->pdo->prepare($query);
          $stmt->bindParam(':funcionario_id', $dados['funcionario_id'], \PDO::PARAM_INT);
          $stmt->execute();
          $diariasAtualizadas = $stmt->fetchColumn();

          // Retorna a resposta com as diárias atualizadas
          echo json_encode([
              "message" => "Diária marcada com sucesso",
              "diarias" => $diariasAtualizadas
          ]);
      } else {
          http_response_code(500);
          echo json_encode(["message" => "Erro ao marcar diária"]);
      }
  }




    // Método para responder com JSON
    private function responderJson($data, $statusCode = 200) {
      header('Content-Type: application/json');
      http_response_code($statusCode);
      echo json_encode($data);
  }

  // Método para responder com erro
  private function responderErro($mensagem, $statusCode) {
      $this->responderJson(["message" => $mensagem], $statusCode);
  }
    // Método para fechar a quinzena
    // Método para fechar a quinzena
    public function fecharQuinzena() {
      try {
          $data = json_decode(file_get_contents("php://input"), true);
          $dataFechamento = $data['data_fechamento'] ?? date('Y-m-d');

          if (empty($dataFechamento)) {
              $this->responderErro("Data de fechamento faltando", 400);
              return;
          }

          // Fechar a quinzena no model
          $this->funcionarioModel->fecharQuinzena($dataFechamento);

          $this->responderJson(["message" => "Quinzena fechada com sucesso"]);
      } catch (\Exception $e) {
          $this->responderErro("Erro ao fechar quinzena: " . $e->getMessage(), 500);
      }
  }
}
