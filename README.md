# Compretionline-backend

Compretionline-backend uma API RESTful criada para servir o projecto de marketplace de tecnologia [compretionline](https://github.com/carlosmatateumateus/compretionline). 
### Estrutuara do banco de dados:

![](screens/prisma-erd.svg)

## Funcionalidades:

- Criação de usuários: Permite criar usuários através de um identificador unico e um email (usado no projecto para autenticar com o Google)

- Produtos: Gerenciamento de produtos, como adicionar, editar e remover produtos.

- Filtragem: Pegar uma lista de productos com uma determinada categoria ou titulo.

## Rodar o projecto

Apois baixar o projecto na sua máquina você deve instalar o <a href="https://nodejs.org/en/">node, npm</a> na sua versão mais recente e também o mysql e depois
abrir o terminal e rodar os seguintes comandos na pasta do projecto:

```
  npx prisma migrate dev
```

<p>E depois</p>

```
  npm run dev
```

## Tecnológias usadas

<br>

<div style="display: flex;gap:10px;align-items:center;">
  <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nodejs-colored.svg" width="30" height="30" alt="NodeJS" /></a>
  <a href="https://expressjs.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" width="30" height="30" alt="Express Js" /></a>
  <a href="https://zod.dev/" target="_blank" rel="noreferrer"><img src="https://zod.dev/logo.svg" width="30" height="30" alt="Zod.dev" /></a>
  <a href="https://prisma.io/" target="_blank" rel="noreferrer"><img src="https://www.freelogovectors.net/wp-content/uploads/2022/01/prisma_logo-freelogovectors.net_.png" width="28" height="28" alt="Prisma.io" /></a>
</div>

<br />

## Fazer requisições

<p>Para fazer uma requisição em uma API, você pode usar ferramentas como o cURL, Postman, Insomnia, entre outras.</p>
<p>O cURL está disponível em <a href="https://curl.haxx.se/">https://curl.haxx.se/</a>, o Postman em <a href="https://www.postman.com/">https://www.postman.com/</a> e o Insomnia em <a href="https://insomnia.rest/">https://insomnia.rest/</a>.</p>

<div style="overflow-x:auto;">
  <table style="border: 1px solid black;border-collapse: collapse;">
    <thead style="background-color: #000; color: #fff;">
      <tr>
        <th style="border: 1px solid black;">HTTP</th>
        <th style="border: 1px solid black;">Acção</th>
        <th style="border: 1px solid black;">Rota</th>
        <th style="border: 1px solid black;">Parâmetro</th>
        <th style="border: 1px solid black;">Req body</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid black;">POST</td>
        <td style="border: 1px solid black;">Cria produto</td>
        <td style="border: 1px solid black;">/product</td>
        <td style="border: 1px solid black;">Nenhum</td>
        <td style="border: 1px solid black;">userId, title, description, price, location, category, photo</td>
      </tr>
      <tr>
        <td style="border: 1px solid black;">PATCH</td>
        <td style="border: 1px solid black;">Atualiza produto</td>
        <td style="border: 1px solid black;">/product/:id</td>
        <td style="border: 1px solid black;">Id</td>
        <td style="border: 1px solid black;">title, description, price, location, photo, category</td>
      </tr>
      <tr>
        <td style="border: 1px solid black;">GET</td>
        <td style="border: 1px solid black;">Retorna produto</td>
        <td style="border: 1px solid black;">/product/:id</td>
        <td style="border: 1px solid black;">Id</td>
        <td style="border: 1px solid black;">Nenhum</td>
      </tr>
      <tr>
        <td style="border: 1px solid black;">DELETE</td>
        <td style="border: 1px solid black;">Deleta produto</td>
        <td style="border: 1px solid black;">/product/:id</td>
        <td style="border: 1px solid black;">Id</td>
        <td style="border: 1px solid black;">Nenhum</td>
      </tr>
      <tr>
        <td style="border: 1px solid black;">GET</td>
        <td style="border: 1px solid black;">Pesquisa produtos</td>
        <td style="border: 1px solid black;">/product/search/:title/:category?</td>
        <td style="border: 1px solid black;">title, category (opcional)</td>
        <td style="border: 1px solid black;">Nenhum</td>
      </tr>
      <tr>
        <td style="border: 1px solid black;">GET</td>
        <td style="border: 1px solid black;">Retorna por categoria</td>
        <td style="border: 1px solid black;">/product/category/:title</td>
        <td style="border: 1px solid black;">title</td>
        <td style="border: 1px solid black;">Nenhum</td>
      </tr>
      <tr>
        <td style="border: 1px solid black;">GET</td>
        <td style="border: 1px solid black;">Retorna produtos de usuário</td>
        <td style="border: 1px solid black;">/product/my/:id</td>
        <td style="border: 1px solid black;">Id</td>
        <td style="border: 1px solid black;">Nenhum</td>
      </tr>
    </tbody>
  </table>
</div>

## Contribuir

Se quiser contribuir para esta API, faça um pull request no GitHub. Se encontrar algum bug, abra uma issue. Qualquer feedback é bem-vindo!