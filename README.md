 # Saborê | Oficinas gastronômicas

Projeto acadêmico de uma plataforma web para divulgação de oficinas gastronômicas e realização de reservas. O sistema permite que os usuários conheçam as oficinas disponíveis, criem uma conta, realizem agendamentos e acompanhem suas reservas.

## Objetivo do projeto

O Saborê foi desenvolvido com o objetivo de oferecer uma experiência digital simples e organizada para pessoas interessadas em participar de oficinas gastronômicas.

A aplicação integra interface, servidor e banco de dados, permitindo o cadastro e a autenticação de usuários, além do registro e da consulta de reservas.

## Tecnologias utilizadas

### Front-end
- React
- Vite
- JavaScript
- React Router
- CSS

### Back-end
- Node.js
- Express
- Mongoose
- bcryptjs
- JSON Web Token (JWT)
- dotenv
- cors

### Banco de dados
- MongoDB Atlas
- Banco de dados NoSQL
- Coleções principais: `usuarios` e `reservas`

## Funcionalidades

- Página inicial com apresentação da plataforma.
- Catálogo de oficinas gastronômicas.
- Visualização das informações das oficinas.
- Cadastro de usuários.
- Login e autenticação.
- Proteção de senhas com hash.
- Agendamento de oficinas com escolha de data, horário e quantidade de participantes.
- Cálculo automático do valor total.
- Etapa de pagamento demonstrativo, com opções Pix e Cartão.
- Confirmação de reserva.
- Consulta das reservas realizadas pelo usuário autenticado.

## Organização do projeto

O projeto está dividido em duas partes principais:

- `frontend`: responsável pela interface e interação com o usuário.
- `backend`: responsável pelas rotas, autenticação, regras de negócio e comunicação com o banco de dados.

```text
SABORE/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── data/
│       ├── pages/
│       └── services/
│
└── backend/
    └── src/
        ├── config/
        ├── models/
        └── routes/
```

## Banco de dados

O projeto utiliza o MongoDB Atlas, um banco de dados NoSQL orientado a documentos.

As principais coleções utilizadas são:

- **usuarios:** armazena os dados necessários para cadastro e autenticação dos usuários.
- **reservas:** armazena os dados dos agendamentos, incluindo oficina, data, horário, quantidade de participantes, valor total e referência ao usuário responsável.

O Mongoose é utilizado para estruturar os modelos e realizar a comunicação entre o servidor e o MongoDB.

## Funcionamento do agendamento

1. O usuário acessa o catálogo de oficinas.
2. Escolhe a oficina desejada.
3. Informa a data, o horário e a quantidade de participantes.
4. O sistema calcula o valor total.
5. O usuário segue para a etapa de pagamento demonstrativo.
6. Após a confirmação, os dados da reserva são enviados ao back-end.
7. O servidor registra a reserva no MongoDB.
8. A confirmação é apresentada ao usuário, que também pode consultar o agendamento na página "Minhas reservas".

## Como executar o projeto

### Pré-requisitos

- Node.js instalado.
- npm instalado.
- Instância MongoDB configurada.

### 1. Executar o back-end

Abra um terminal na pasta `backend`:

```bash
cd backend
npm install
```

Configure o arquivo `.env` com as variáveis necessárias:

```env
PORT=3000
MONGODB_URI=sua_string_de_conexao
JWT_SECRET=coloque_sua_chave_secreta_aqui
```

Em seguida, execute:

```bash
npm run dev
```

### 2. Executar o front-end

Abra outro terminal na pasta `frontend`:

```bash
cd frontend
npm install
npm run dev
```

O Vite apresentará no terminal o endereço local para acessar a aplicação.

**Importante:** não compartilhe o arquivo `.env`, senhas, tokens ou credenciais do banco de dados no GitHub.

## Testes e verificações

Durante o desenvolvimento, foram realizados testes manuais para verificar:

- Cadastro e login de usuários.
- Autenticação e acesso às funcionalidades.
- Seleção de oficinas.
- Preenchimento do agendamento.
- Cálculo do valor total.
- Confirmação simulada.
- Registro das reservas no MongoDB.
- Consulta das reservas vinculadas ao usuário autenticado.

Também foi verificada a persistência dos dados no MongoDB Atlas.

## Limitações do projeto

- O pagamento é exclusivamente simulado e não realiza cobranças reais.
- As opções Pix e Cartão são demonstrativas.
- O endereço apresentado na confirmação é fictício e utilizado para demonstração acadêmica.
- As oficinas e seus preços são dados demonstrativos.
- O projeto foi desenvolvido para fins acadêmicos.

## Repositório

Código-fonte do projeto:

[GitHub — Saborê](https://github.com/AnitaGallindo/SABORE)

## Documentação completa

[📄 Acessar documentação completa do Saborê](docs/Relatorio_Sabore_Atualizado.pdf)