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

<div style="overflow-x:auto;">
  <table style="width:100%;border: 1px solid black;border-collapse: collapse;">
    <tr>
      <th style="border: 1px solid black;text-align:center;">O que faz</th>
      <th style="border: 1px solid black;text-align:center;">Caminho da rota</th>
      <th style="border: 1px solid black;text-align:center;">Parâmetros</th>
    </tr>
    <tr>
      <td style="border: 1px solid black;">Criar um novo produto</td>
      <td style="border: 1px solid black;">/product</td>
      <td style="border: 1px solid black;">-</td>
    </tr>
    <tr>
      <td style="border: 1px solid black;">Atualizar um produto existente</td>
      <td style="border: 1px solid black;">/product/:id</td>
      <td style="border: 1px solid black;">id</td>
    </tr>
    <tr>
      <td style="border: 1px solid black;">Recuperar um produto existente</td>
      <td style="border: 1px solid black;">/product/:id</td>
      <td style="border: 1px solid black;">id</td>
    </tr>
    <tr>
      <td style="border: 1px solid black;">Remover um produto existente</td>
      <td style="border: 1px solid black;">/product/:id</td>
      <td style="border: 1px solid black;">id</td>
    </tr>
    <tr>
      <td style="border: 1px solid black;">Buscar produtos por título e categoria</td>
      <td style="border: 1px solid black;">/product/search/:title/:category?</td>
      <td style="border: 1px solid black;">title, category (opcional)</td>
    </tr>
    <tr>
      <td style="border: 1px solid black;">Buscar produtos por categoria</td>
      <td style="border: 1px solid black;">/product/category/:title</td>
      <td style="border: 1px solid black;">title</td>
    </tr>
    <tr>
      <td style="border: 1px solid black;">Recuperar produtos de um usuário</td>
      <td style="border: 1px solid black;">/product/my/:id</td>
      <td style="border: 1px solid black;">id</td>
    </tr>
  </table>
</div>

## Contribuir

Se quiser contribuir para esta API, faça um pull request no GitHub. Se encontrar algum bug, abra uma issue. Qualquer feedback é bem-vindo!