# Projeto Trybesmith

# Contexto

Para este projeto, foi desenvolvido um CRUD (Create, Read, Update e Delete) de itens medievais, no formato de uma API, utilizando Typescript.
<br />

<details>
  <summary><strong>👨‍💻 O que foi desenvolvido</strong></summary><br />

  Para este projeto, foi criado uma loja de itens medievais, no formato de uma _API_, utilizando _Typescript_.
  
  Foi desenvolvido todas as camadas da aplicação (_Models_, _Service_ e _Controllers_) no código e, por meio dessa aplicação, é possível realizar as operações básicas que se pode fazer em um determinado banco de dados:
  Criação, Leitura, Atualização e Exclusão (ou `CRUD`, para as pessoas mais íntimas 😜 - _Create, Read, Update_ e _Delete_).

  Foi criado alguns _endpoints_ que podem ler e escrever em um banco de dados, utilizando o **MySQL**.

  ---

  ⚠️ **Dicas Importantes** ⚠️:

  - Não tem front-end neste projeto, portanto não se preocupe com a visualização, apenas com as funcionalidades e organização do código;

  - A API foi desenvolvida dentro da pasta `./src`.
</details>
<br />

# Orientações específicas deste projeto

<details>
  <summary><strong>🐳 Rodando no Docker vs Localmente</strong></summary><br />

  ## Com Docker


  > Rode os serviços `node` e `db` com o comando `docker-compose up -d`.
  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers
  - Esses serviços irão inicializar um container chamado `trybesmith` e outro chamado `trybesmith_db`.
  - A partir daqui você pode rodar o container `trybesmith` via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it trybesmith bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências [**Caso existam**] com `npm install`

  ⚠ Atenção ⚠ Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

  ⚠ Atenção ⚠ O **git** dentro do container não vem configurado com suas credenciais. Faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

---

  ## Sem Docker

  > Instale as dependências [**Caso existam**] com `npm install`

  ⚠ Atenção ⚠ Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  ✨ **Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.
  ✨ **Dica:** O avaliador espera que a versão do `node` utilizada seja a 16.

</details>

<details>
  <summary><strong>🎲 Diagrama Entidade Relacionamento do projeto</strong></summary><br />
  O banco de dados do projeto segue a estrutura abaixo:

  <img src="images/diagram-der.png" height="200px" />

</details>

<details>
  <summary><strong>🏦 Conexão com o Banco</strong></summary><br />
  
  A conexão do banco local deve conter os seguintes parâmetros:

  ```typescript
  import dotenv from 'dotenv';
  import mysql from 'mysql2/promise';

  dotenv.config();

  const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  }); // sua conexão NÃO deve ter o database, este deve ser especificado em cada query

  export default connection;
  ```

  **⚠️ Existe um arquivo já criado chamado .env.example onde estão listadas as variáveis de ambiente esperadas no projeto. Variáveis de ambiente além das especificadas no arquivo mencionado não são suportadas, pois não são esperadas pelo avaliador do projeto. ⚠️**

  **⚠️ É essencial que seu arquivo tenha o nome `connection.ts` e esteja no diretório `src/models` ⚠️**

</details>

<details>
  <summary><strong>🪑 Tabelas</strong></summary><br />

  O banco têm três tabelas: pessoas usuárias, produtos e pedidos.

  ```sql
  DROP SCHEMA IF EXISTS Trybesmith;
  CREATE SCHEMA IF NOT EXISTS Trybesmith;

  CREATE TABLE Trybesmith.users (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    username TEXT NOT NULL,
    vocation TEXT NOT NULL,
    level INTEGER NOT NULL,
    password TEXT NOT NULL
  );

  CREATE TABLE Trybesmith.orders (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES Trybesmith.users (id)
  );

  CREATE TABLE Trybesmith.products (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    amount TEXT NOT NULL,
    order_id INTEGER,
    FOREIGN KEY (order_id) REFERENCES Trybesmith.orders (id)
  );
  ```

  A `connection.ts` não deve conter o database e suas _queries_ devem conter o banco de dados explicitamente como o exemplo abaixo:
  ```sh
  SELECT * FROM Trybesmith.products;
  ```

</details>

<details>
  <summary><strong>🍪 Informações sobre a API </strong></summary><br />
  
  **⚠️ Leia as informações abaixo atentamente e siga à risca o que for pedido. ⚠️**

  **👀 Observações importantes:**

  - O projeto deve rodar na porta **3001**;

  - O arquivo `index.ts` existe para rodar corretamente os testes. Toda a chamada de rotas do projeto deverá ser feita dentro do arquivo `app.ts`; 


  ---

  ###  Todos os seus endpoints devem estar no padrão REST

  - Use os verbos `HTTP` adequados para cada operação;

  - Agrupe e padronize suas _URL_ em cada recurso;

  - Garanta que seus _endpoints_ sempre retornem uma resposta, havendo sucesso nas operações ou não;

  - Retorne os códigos de _status_ corretos (recurso criado, erro de validação, etc).

  ---

  Há dois arquivos no diretório `./src/`: `index.ts` e `app.ts`, **ambos não devem ser renomeados ou apagados**. 

  Você poderá fazer modificações em ambos os arquivos, porém **no arquivo `app.ts` o seguinte trecho de código não deve ser removido**:

  ```typescript
  import express from 'express';

  const app = express();

  app.use(express.json());

  export default app;
  ```

  Isso está configurado para o avaliador funcionar corretamente.

</details>
<br />

# Requisitos

## 1 - Criado um endpoint para o cadastro de produtos

- O endpoint deve ser acessível através do caminho (`/products`);

- Os produtos enviados devem ser salvos na tabela `products` do banco de dados;

- O endpoint deve receber a seguinte estrutura:
```json
  {
    "name": "Espada longa",
    "amount": "30 peças de ouro"
  }
```

<details close>
  <summary>Além disso, as seguintes verificações serão feitas:</summary>

  <br>

  > 👉 Para caso os dados sejam enviados corretamente
  - **[Será validado que é possível cadastrar um produto com sucesso]**
    - O resultado retornado para cadastrar o produto com sucesso deverá ser conforme exibido abaixo, com um _status http_ `201`:
    ```json
      {
        "id": 6,
        "name": "Espada longa",
        "amount": "30 peças de ouro",
      }
    ```



</details>

---

## 2 - Criado um endpoint para a listagem de produtos

- O endpoint deve ser acessível através do caminho (`/products`);

<details close>
  <summary>Além disso, as seguintes verificações serão feitas:</summary>

  <br>

  > 👉 Para caso os dados sejam enviados corretamente
  - **[Será validado que é possível listar todos os produtos com sucesso]**
    - O resultado retornado para listar produtos com sucesso deverá ser conforme exibido abaixo, com um _status http_ `200`:
    ```json
    [
      {
        "id": 1,
        "name": "Poção de cura",
        "amount": "20 gold",
        "orderId": null
      },
      {
        "id": 2,
        "name": "Escudo do Herói",
        "amount": "100 diamond",
        "orderId": 1
      }
    ]
    ```
</details>

---

## 3 - Criado um endpoint para o cadastro de pessoas usuárias

- O endpoint deve ser acessível através do caminho (`/users`);

- As informações de pessoas usuárias cadastradas devem ser salvas na tabela `users` do banco de dados;

- O endpoint deve receber a seguinte estrutura:
```json
{ 
  "username": "MAX",
  "vocation": "swordsman",
  "level": 10,
  "password": "SavingPeople"
}
```

<details close>
  <summary>Além disso, as seguintes verificações serão feitas:</summary>

  <br>

  > 👉 Para caso os dados sejam enviados corretamente
  - **[Será validado que é possível cadastrar a pessoa usuária com sucesso]**
    - Se a pessoa usuária for cadastrada com sucesso, o resultado deverá ser conforme o exibido abaixo, com um _status http_ `201` e retornando um _token_:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    }
    ```



</details>

---

## 4 - Criado um endpoint para listar todos os pedidos

- O endpoint deve ser acessível através do caminho (`/orders`).
- Essa rota deve retornar todos os pedidos e os `id`s dos produtos associados a estes.

✨ **Dica:** Todos os produtos são itens artesanais, portanto, únicos. Por isso são os produtos que contêm os `id`s dos pedidos.

✨ **Dica:** Pesquise na documentação oficial do **MySQL** sobre a função de agregação `JSON_ARRAYAGG`, ela pode ser bem útil. 😉

<details close>
  <summary>Além disso, as seguintes verificações serão feitas:</summary>

  <br>

  > 👉 Para orders

  - **[Será validado que é possível listar todos os pedidos com sucesso]**
    - Quando houver mais de um pedido, o resultado retornado para listar pedidos com sucesso deverá ser conforme exibido abaixo, com um _status http_ `200`:
    ```json
      [
        {
          "id": 1,
          "userId": 2,
          "productsIds": [1, 2]
        },
        {
          "id": 2,
          "userId": 1,
          "productsIds": [3, 4]
        }
      ]
    ```
</details>

---

## 5 - Criado um endpoint para o login de pessoas usuárias

- O endpoint deve ser acessível através do caminho (`/login`).

- A rota deve receber os campos `username` e `password`, e esses campos devem ser validados no banco de dados.

- Um token `JWT` deve ser gerado e retornado caso haja sucesso no _login_. No seu _payload_ deve estar presente o _id_ e _username_.

- O endpoint deve receber a seguinte estrutura:
```json
  {
    "username": "string",
    "password": "string"
  }
```

**⚠️ Na configuração do `JWT` não use variáveis de ambientes para não ter conflito com o avaliador.**

<details close>
 <summary>Além disso, as seguintes verificações serão feitas:</summary>

  <br>

  > 👉 Para caso haja problemas no login
  - **[Será validado que o campo "username" é enviado]**
    - Se o _login_ não tiver o campo "username", o resultado retornado deverá ser um _status http_ `400` e
    ```json
      { "message": "\"username\" is required" }
    ```

  - **[Será validado que o campo "password" é enviado]**
    - Se o _login_ não tiver o campo "password", o resultado retornado deverá ser um _status http_ `400`
    ```json
      { "message": "\"password\" is required" }
    ```

  - **[Será validado que não é possível fazer login com um username inválido]**
    - Se o _login_ tiver o username inválido, o resultado retornado deverá ser um _status http_ `401` e
    ```json
      { "message": "Username or password invalid" }
    ```

  - **[Será validado que não é possível fazer login com uma senha inválida]**
    - Se o login tiver a senha inválida, o resultado retornado deverá ser um _status http_ `401` e
    ```json
      { "message": "Username or password invalid" }
    ```

  <br>

  > 👉 Para caso os dados sejam enviados corretamente
  - **[Será validado que é possível fazer login com sucesso]**
    - Se o login foi feito com sucesso, o resultado deverá ser um _status http_ `200` e deverá retornar um _token_:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    }
    ```
</details>

---

## Requisitos Bônus

## 6 - Criado as validações dos produtos

- Vamos realizar as validações referentes a criação do endpont do requisito 1?

- Neste requisito de validação, não é necessário conectar com o banco de dados

<details close>

  <summary>As seguintes validações deverão ser realizadas:</summary>

  <br>

  > 👉 Para name
  - **[Será validado que o campo "name" é obrigatório]**
    - Se o campo "name" não for informado, o resultado retornado deverá ser um  _status http_ `400` e
    ```json
      { "message": "\"name\" is required" }
    ```

  - **[Será validado que o campo "name" tem o tipo string]**
    - Se o campo "name" não for do tipo `string`, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "message": "\"name\" must be a string" }
    ```

  - **[Será validado que o campo "name" é uma string com mais de 2 caracteres]**
    - Se o campo "name" não for uma string com mais de 2 caracteres, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "message": "\"name\" length must be at least 3 characters long" }
    ```

  <br>

  > 👉 Para amount
  - **[Será validado que o campo "amount" é obrigatório]**
    - Se o campo "amount" não for informado, o resultado retornado deverá ser um _status http_ `400` e
    ```json
      { "message": "\"amount\" is required" }
    ```

  - **[Será validado que o campo "amount" tem o tipo string]**
    - Se o campo "amount" não for do tipo `string`, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "message": "\"amount\" must be a string" }
    ```

  - **[Será validado que o campo "amount" é uma string com mais de 2 caracteres]**
    - Se o campo "amount" não for uma string com mais de 2 caracteres, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "message": "\"amount\" length must be at least 3 characters long" }
    ```

  <br>

</details>


---

## 7 - Criado as validações para as pessoas usuárias

- Vamos realizar as validações referentes a criação do endpont do requisito 3?

- Neste requisito de validação, não é necessário conectar com o banco de dados

<details close>
  <summary>As seguintes validações deverão ser realizadas:</summary>

  <br>

  > 👉 Para username
  - **[Será validado que o campo "username" é obrigatório]**
    - Se a requisição não tiver o campo "username", o resultado retornado deverá ser um _status http_ `400` e
    ```json
      { "message": "\"username\" is required" }
    ```

  - **[Será validado que o campo "username" tem o tipo string]**
    - Se o campo "username" não for do tipo `string`, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "message": "\"username\" must be a string" }
    ```

  - **[Será validado que o campo "username" é uma string com mais de 2 caracteres]**
    - Se o campo "username" não for do tipo `string` com mais de 2 caracteres, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "message": "\"username\" length must be at least 3 characters long" }
    ```

  <br>

  > 👉 Para vocation
  - **[Será validado que o campo "vocation" é obrigatório]**
    - Se a requisição não tiver o campo "vocation", o resultado retornado deverá ser um _status http_ `400` e
    ```json
      { "message": "\"vocation\" is required" }
    ```

  - **[Será validado que o campo "vocation" tem o tipo string]**
    - Se o campo "vocation" não for do tipo `string`, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "message": "\"vocation\" must be a string" }
    ```

  - **[Será validado que o campo "vocation" é uma string com mais de 2 caracteres]**
    - Se o campo "vocation" não for do tipo `string` com mais de 2 caracteres, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "message": "\"vocation\" length must be at least 3 characters long" }
    ```

  <br>

  > 👉 Para level
  - **[Será validado que o campo "level" é obrigatório]**
    - Se a pessoa usuária não tiver o campo "level", o resultado retornado deverá ser um _status http_ `400` e
    ```json
      { "message": "\"level\" is required" }
    ```

  - **[Será validado que o campo "level" tem o tipo number]**
    - Se o campo "level" não for do tipo `number`, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "message": "\"level\" must be a number" }
    ```

  - **[Será validado que o campo "level" deve ser um número maior que 0]**
    - Se o campo "level" não for do tipo `number` maior que 0, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "message": "\"level\" must be greater than or equal to 1" }
    ```

  <br>

  > 👉 Para password
  - **[Será validado que o campo "password" é obrigatório]**
    - Se a requisição não tiver o campo "password", o resultado retornado deverá ser um _status http_ `400` e
    ```json
      { "message": "\"password\" is required" }
    ```

  - **[Será validado que o campo "password" tem o tipo string]**
    - Se o campo "password" não for do tipo `string`, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "message": "\"password\" must be a string" }
    ```

  - **[Será validado que o campo "password" é uma string com 8 ou mais caracteres]**
    - Se o campo "password" não for do tipo `string` com mais de 8 caracteres, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "message": "\"password\" length must be at least 8 characters long" }
    ```

  <br>


</details>

---

## 8 - Criado um endpoint para o cadastro de um pedido

- O endpoint deve ser acessível através do caminho (`/orders`);

- Um pedido só pode ser criado caso a pessoa usuária esteja logada e o token `JWT` validado;

- Os pedidos enviados devem ser salvos na tabela `orders` do banco de dados, salvando `id` da pessoa usuária da aplicação que fez esse pedido. 

- A tabela `products` também deve ser alterada, atualizando todos os produtos com os `id` incluídos na chave `productsIds` da requisição, e adicionando nesses produtos o `orderId` do pedido recém criado;

- O endpoint deve receber a seguinte estrutura:
```json
  {
    "productsIds": [1, 2]
  }
```

**⚠️ Ao cadastrar um pedido, lembre-se de atualizar os respectivos produtos no banco de dados, incluindo neles o número do pedido criado.**

<details close>
  <summary>Além disso, as seguintes verificações serão feitas:</summary>

  <br>

  > 👉 Para token
  - **[Será validado que não é possível cadastrar pedidos sem token]**
    - Se o token não for informado, o resultado retornado deverá ser um _status http_ `401` e
    ```json
      { "message": "Token not found" }
    ```

  - **[Será validado que não é possível cadastrar um pedido com token inválido]**
    - Se o token informado não for válido, o resultado retornado deverá ser um _status http_ `401` e
    ```json
      { "message": "Invalid token" }
    ```

  <br>

  > 👉 Para products
  - **[Será validado que o campo "productsIds" é obrigatório]**
    - Se o corpo da requisição não possuir o campo "productsIds", o resultado retornado deverá ser um _status http_ `400` e
    ```json
      { "message": "\"productsIds\" is required" }
    ```

  - **[Será validado que não é possível criar um pedido com o campo "productsIds" não sendo um array]**
    - Se o valor do campo "productsIds" não for um array, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "message": "\"productsIds\" must be an array" }
    ```

  - **[Será validado que não é possível cadastrar um pedido se o campo "productsIds" for um array vazio]**
    - Se o campo "productsIds" possuir um array vazio, o resultado retornado deverá ser um _status http_ `422` e
    ```json
      { "message": "\"productsIds\" must include only numbers" }
    ```

  <br>

  > 👉 Para caso os dados sejam enviados corretamente
  - **[Será validado que é possível criar um pedido com sucesso com 1 item]**
    - O resultado retornado para cadastrar um pedido com sucesso deverá ser conforme exibido abaixo, com um _status http_ `201`:
    ```json
      {
        "userId": 1,
        "productsIds": [1],
      }
    ```

  - **[Será validado que é possível criar um pedido com sucesso com vários itens]**
    - O resultado retornado para cadastrar um pedido com sucesso deverá ser conforme exibido abaixo, com um _status http_ `201`:
    ```json
      {
        "userId": 1,
        "productsIds": [1, 2]
      }
    ```
</details>

---
