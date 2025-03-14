<?php
namespace App\Controllers;



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
        $funcionarios = $this->funcionarioModel->getAllComDiarias();

        header('Content-Type: application/json');
        echo json_encode($funcionarios);
    }

    // Método para filtrar os funcionários por data
    public function getFuncionariosPorData() {
        $data = isset($_GET['data']) ? $_GET['data'] : date('Y-m-d');
        $funcionarios = $this->funcionarioModel->getFuncionariosPorData($data);

        header('Content-Type: application/json');
        echo json_encode($funcionarios);
    }

    // Método para criar uma diária
    public function criarDiaria() {
        $data = json_decode(file_get_contents("php://input"), true);
        $funcionarioId = $data['funcionarioId'] ?? null;
        $dataDiaria = $data['data'] ?? null;

        if ($funcionarioId && $dataDiaria) {
            $diariaCriada = $this->funcionarioModel->criarDiaria($funcionarioId, $dataDiaria);

            if ($diariaCriada) {
                header('Content-Type: application/json');
                echo json_encode(["message" => "Diária marcada com sucesso"]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Erro ao criar diária"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Dados faltando"]);
        }
    }
}
