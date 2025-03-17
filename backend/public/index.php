<?php

header('Access-Control-Allow-Origin: *');  // Permitir todas as origens (para testes)
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With'); // Cabeçalhos permitidos

// Verificar se a requisição é do tipo OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Responder à requisição OPTIONS com status 200 (OK)
    http_response_code(200);
    exit(); // Não processar mais a requisição
}

// Requerendo os controladores necessários
require_once __DIR__ . '/../app/Controllers/FuncionarioController.php';

use App\Controllers\FuncionarioController;

// Instanciando o controlador
$funcionarioController = new FuncionarioController();

// Obtendo a URI da requisição
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
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
        case '/funcionarios/quinzena/fechar':
          if ($method === 'POST') {
              $funcionarioController->fecharQuinzena(); // Fechar a quinzena
          } else {
              http_response_code(405);
              echo json_encode(["message" => "Método não permitido para /funcionarios/fechar-quinzena"]);
          }
          break;
          // routes.php

// Fechar quinzena
case '/quinzena/fechar':
  if ($method === 'POST') {
      $funcionarioController->fecharQuinzena();
  } else {
      http_response_code(405);
      echo json_encode(["message" => "Método não permitido para /quinzena/fechar"]);
  }
  break;

    default:
        http_response_code(404);
        echo json_encode(["message" => "Rota não encontrada"]);
        break;
}
