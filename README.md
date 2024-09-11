*** Instruções de Instalação ***

1. Clone o Repositório:

- git clone <url-shortener>
- cd url-shortener


2. Instale as Dependências:

- npm install


3. Configure o Banco de Dados:

- Crie o banco de dados e as tabelas conforme o script SQL fornecido.


4. Configure as Variáveis de Ambiente:

- Renomeie o arquivo .env.example para .env e ajuste as variáveis conforme necessário.


5. Inicie o Servidor:

- npm start


6. Teste a API:

- Use ferramentas como Postman ou Insomnia para testar os endpoints da API.



# URL Shortener

Um sistema de encurtamento de URLs simples desenvolvido com Node.js e MySQL.

## Funcionalidades

- Registro e login de usuários.
- Encurtamento de URLs.
- Listagem, atualização e exclusão de URLs encurtadas.
- Redirecionamento para URLs originais e contagem de cliques.

## Instalação

1. Clone o repositório:

   ```bash
   git clone <url-shortener>


2. Instale as dependências:

- npm install


3. Configure o banco de dados e variáveis de ambiente conforme config/config.js e .env.


4. Inicie o servidor:

- npm start


*** Endpoints ***

POST /api/auth/register - Registrar um novo usuário.

POST /api/auth/login - Fazer login e obter um token JWT.

POST /api/shorten - Encurtar uma URL.

GET /api/urls - Listar URLs encurtadas do usuário (autenticado).

PUT /api/urls/
- Atualizar uma URL encurtada (autenticado).

DELETE /api/urls/
- Deletar (lógica) uma URL encurtada (autenticado).

GET /
- Redirecionar para a URL original e contabilizar o clique.


*** Contribuição ***

Para contribuir, faça um fork deste repositório e envie um pull request. Consulte o arquivo CONTRIBUTING.md para mais detalhes.


*** Licença ***

Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes.


Esse guia fornece todos os componentes necessários para criar, configurar e executar o sistema de encurtamento de URLs. Certifique-se de ajustar as variáveis de ambiente e as credenciais do banco de dados conforme sua configuração local.
