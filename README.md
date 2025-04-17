
# Pokémon Guessing Game

## 📌 Visão Geral
O Pokémon Guessing Game é uma aplicação web onde você precisa adivinhar qual Pokémon é baseado em sua sprite pixelada com múltiplas gerações para escolher.

### Funcionalidades Principais:

- Adivinhação por sprite
- Seleção de gerações Pokémon (Gen 1 a Gen 8)
- Revelação progressiva da imagem
- Sistema de pontuação por acertos consecutivos

## 🛠️ Tecnologias Utilizadas

### Backend:

- Node.js + Express
- Axios (para consumir a PokeAPI)
- CORS (para permitir requisições do frontend)

### Frontend:

- React (criado com Create React App)
- Canvas API (para efeitos de pixelização)
- Workbox (para service worker)

## 📥 Instalação

Pré-requisitos:
- Node.js (v16 ou superior)
- NPM ou Yarn

Siga estes passos para instalar e executar o projeto localmente:

#### Passos:
1. Clone o repositório (ou baixe os arquivos):

```
git clone https://github.com/giuliastefani/CPVMPCT-E1.git
cd CPVMPCT-E1
```

2. Instale as dependências do backend:

```
cd backend
npm install
```

3. Instale as dependências do frontend:

```
cd ../frontend
npm install
```

4. Inicie os servidores (em terminais separados):

# Terminal 1 (backend)
```
cd backend
node server.js
```

# Terminal 2 (frontend)
```
cd ../frontend
npm start
```

5. Acesse a aplicação:
Abra seu navegador e visite:

`http://localhost:3000`

## 🎮 Como Jogar

1. Selecione as gerações que deseja incluir no jogo
2. Adivinhe o Pokémon baseado na imagem pixelada:
    - Digite o nome no campo de texto
    - Use a dica para revelar mais detalhes
3. Acumule pontos por respostas corretas consecutivas
4. O jogo acaba quando você errar um Pokémon
5. Reinicie para tentar bater seu recorde!

## ⚙️ Estrutura do Projeto

```
CPVMPCT-E1/
├── backend/
│   ├── node_modules/
│   ├── package.json
│   └── app.js              # Servidor Node.js/Express
├── frontend/
│   ├── public/             # Assets estáticos
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── App.js          # Componente principal
│   │   └── index.js        # Ponto de entrada
│   ├── package.json
└── README.md               # Este arquivo
```

## 🌐 Endpoints da API

A aplicação expõe os seguintes endpoints:

- `GET /api/generations`: Retorna as gerações disponíveis
- `GET /api/random-pokemon?generations=gen1,gen2`: Retorna um Pokémon aleatório
- `POST /api/check-answer`: Verifica se o palpite está correto

Exemplo de resposta da API:

```
{
  "id": 25,
  "name": "pikachu",
  "sprite": "https://.../25.png",
  "generation": "gen1"
}
```

## ✉️ Contato
Para dúvidas ou sugestões:

Email: giuliastefani00@gmail.com
GitHub: @giuliastefani

Desenvolvido com ❤️ por Giulia Stefani - © 2025