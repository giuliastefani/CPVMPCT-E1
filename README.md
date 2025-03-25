
# Pokémon API Explorer

## 📌 Visão Geral
A Pokémon API Explorer é uma aplicação web que permite buscar informações detalhadas sobre Pokémon utilizando a PokeAPI. Ela funciona como uma ponte entre o usuário e a PokeAPI, processando e exibindo os dados de forma amigável.

### Funcionalidades Principais:

- Busca Pokémon por nome
- Exibe informações como: nome, ID, imagem, tipos, altura e peso
- Interface simples e intuitiva
- Tratamento de erros para Pokémon não encontrados

## 🛠️ Tecnologias Utilizadas

### Backend:

- Node.js: Ambiente de execução JavaScript
- Express: Framework para construção do servidor web
- Axios: Cliente HTTP para consumir a PokeAPI

### Frontend:

- HTML5: Estrutura da página
- CSS3: Estilização básica
- JavaScript: Manipulação DOM e requisições assíncronas

## 📥 Instalação

Siga estes passos para instalar e executar o projeto localmente:

Pré-requisitos:
- Node.js (v14 ou superior)
- NPM ou Yarn
- Git (opcional)

#### Passos:
1. Clone o repositório (ou baixe os arquivos):

`git clone https://github.com/giuliastefani/CPVMPCT-E1.git`

`cd CPVMPCT-E1`

2. Instale as dependências:

`npm install`

3. Inicie o servidor:

`node app.js`

4. Acesse a aplicação:
Abra seu navegador e visite:

`http://localhost:3000`

## 🚀 Como Usar

1. Na página inicial, digite o nome de um Pokémon no campo de busca
 - Exemplos: "pikachu", "charizard", "mewtwo"
2. Clique no botão "Buscar"
3. Visualize as informações do Pokémon:
 - Nome e número na Pokédex
 - Imagem oficial
 - Tipos (ex: Elétrico, Fogo, Água)
 - Altura e peso
4. Para uma nova busca, digite outro nome e clique em buscar novamente

## ⚙️ Estrutura do Projeto

```
CPVMPCT-E1/
├── public/
│   └── index.html          # Página principal
├── app.js                  # Servidor Node.js
├── package.json            # Configurações e dependências
└── README.md               # Este arquivo
```

## 🌐 Endpoints da API

A aplicação expõe os seguintes endpoints:

- GET /: Retorna a página HTML principal
- POST /pokemon: Recebe o nome do Pokémon e retorna seus dados

Exemplo de resposta da API:

```
{
  "name": "pikachu",
  "id": 25,
  "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  "types": ["electric"],
  "height": 4,
  "weight": 60
}
```

## ✉️ Contato
Para dúvidas ou sugestões:

Email: giuliastefani00@gmail.com
GitHub: @giuliastefani

Desenvolvido com ❤️ por Giulia Stefani - © 2025