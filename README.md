# Prateleira de Jogos

Projeto final da disciplina de Engenharia de Software

**Aluno:** Everton Mendes Da Silva

## Sobre

Sistema web para organizar jogos pessoais. Desenvolvido com Node.js e Express, permite cadastrar jogos, filtrar por status e buscar informações através de uma API mockada.

## O que faz

- Cadastra e gerencia jogos (nome, plataforma, status, etc)
- Filtra jogos por status: Jogando, Finalizado ou Backlog
- Busca dados de jogos pela API mockada
- Interface simples com três telas principais

## Instalação

```bash
git clone https://github.com/TonMendes/projeto_engenharia_de_software.git
cd projeto_engenharia_de_software
npm install
```

## Executar

Iniciar servidor:
```bash
npm start
```

Acesse: http://localhost:3000

Rodar testes:
```bash
npm test
```

## Estrutura

```
src/
  ├── controllers/     # Lógica de negócio
  ├── routes/          # Rotas da API
  ├── models/          # Modelo de dados
  ├── database/        # DB em memória
  └── index.js         # Servidor

public/
  ├── index.html       # Tela principal
  ├── form.html        # Adicionar/editar
  ├── details.html     # Detalhes do jogo
  └── css/js/          # Estilos e scripts

tests/
  ├── unit/            # Testes unitários
  ├── integration/     # Testes de integração
  └── e2e/            # Testes de aceitação
```

## API

- `GET /api/games` - Lista jogos
- `POST /api/games` - Cria jogo
- `GET /api/games/:id` - Busca jogo
- `PUT /api/games/:id` - Atualiza jogo
- `DELETE /api/games/:id` - Remove jogo
- `GET /api/mock/games/search?q=nome` - API mockada (tente: Cyberpunk 2077)

## Tecnologias

Node.js, Express, Jest, Supertest
