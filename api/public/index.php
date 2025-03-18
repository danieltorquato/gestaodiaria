<?php

// Permite acesso de qualquer origem (não recomendado para produção)
header("Access-Control-Allow-Origin: *");

// Permite métodos específicos (GET, POST, etc.)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Permite cabeçalhos personalizados na requisição
header("Access-Control-Allow-Headers: Content-Type");

// Define o tipo de conteúdo da resposta como JSON
header("Content-Type: application/json");

// Responde a requisições OPTIONS (pré-flight do CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Verificar se a requisição é do tipo OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Responder à requisição OPTIONS com status 200 (OK)
    http_response_code(200);
    exit(); // Não processar mais a requisição
}

require_once __DIR__ . '/../app/Controllers/FuncionarioController.php';
require_once __DIR__ . '/../app/Controllers/GastoController.php';
use App\Controllers\FuncionarioController;
use App\Controllers\GastoController;

// Instanciando o controlador
$funcionarioController = new FuncionarioController();
$gastoController = new GastoController();

// Obtendo a URI da requisição
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$requestUri = str_replace('/gestordiaria/api', '', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$method = $_SERVER['REQUEST_METHOD'];

// Definindo as rotas
switch ($requestUri) {

    // Listar funcionários por data
    case '/funcionarios':
        if ($method === 'GET') {
            $funcionarioController->getFuncionariosPorData();
        } else {
            http_response_code(405);
            echo json_encode(["message" => "Método não permitido para /funcionarios"]);
        }
        break;

    // Criar diária para um funcionário
    case '/funcionarios/diarias/criar':
        if ($method === 'POST') {
            $funcionarioController->criarDiaria();
        } else {
            http_response_code(405);
            echo json_encode(["message" => "Método não permitido para /funcionarios/diarias/criar"]);
        }
        break;

    // Listar funcionários com suas diárias
    case '/funcionarios/diarias/listar':
        if ($method === 'GET') {
            $funcionarioController->getFuncionariosComDiarias();
        } else {
            http_response_code(405);
            echo json_encode(["message" => "Método não permitido para /funcionarios/diarias/listar"]);
        }
        break;

    // Fechar a quinzena de um funcionário
    case '/funcionarios/quinzena/fechar':
        if ($method === 'POST') {
            $funcionarioController->fecharQuinzena();
        } else {
            http_response_code(405);
            echo json_encode(["message" => "Método não permitido para /funcionarios/quinzena/fechar"]);
        }
        break;

    // Adicionar gasto
    case '/gastos/adicionar':
        if ($method === 'POST') {
            $gastoController->adicionarGasto();
        }
        break;

    // Listar gastos
    case '/gastos/listar':
        if ($method === 'GET') {
            $gastoController->listarGastos();
        }
        break;

    // Fechar a quinzena de gastos
    case '/gastos/quinzena/fechar':
        if ($method === 'POST') {
            $gastoController->fecharQuinzena();
        }
        break;

    // Gerar relatório de gastos da quinzena com base na data de fechamento
    case '/gastos/quinzena/relatorio':
      if ($method === 'GET') {
          $dataFechamento = $_GET['data_fechamento'] ?? null; // Recupera a data de fechamento dos parâmetros da URL
          if ($dataFechamento) {
              $gastoController->gerarRelatorioQuinzena($dataFechamento);
          } else {
              http_response_code(400);
              echo json_encode(["message" => "Parâmetro data_fechamento é obrigatório"]);
          }
      }
      break;

    default:
        http_response_code(404);
        echo json_encode(["message" => "Rota não encontrada"]);
        break;
}
