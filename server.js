const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

// Rotas implementadas

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "views", "index.html"));
});


app.post("/sugestao", (req, res) => {
  if (!req.body.nome|| !req.body.ingredientes)
    return res.redirect("/not-found");

  res.status(200).redirect(`/sugestao?nome=${req.body.nome}&ingredientes=${req.body.ingredientes}`);
});


app.get("/sugestao", (req, res) => {

    if (req.query.nome === undefined || req.query.ingredientes === undefined)
      return res.redirect("/not-found");
  
  res.status(200).send(
    `<!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Obrigado pela sugestão | DevBurger</title>
        <link rel="stylesheet" href="/css/sugestao.css">
      </head>
      <body>
        <header>
          Obrigado por contribuir com a <span class="red">&nbsp;DevBurger!</span>
        </header>
        <main>
          <div class="agradecimento">
            <img src="/images/logo.png" alt="Logo DevBurger">
            <h1>🍔 Sugestão recebida!</h1>
            <p>Agradecemos por sua colaboração. Sua sugestão será analisada com muito carinho pela nossa equipe de desenvolvedores de sabores!</p>
            <p>Nome sugerido: <span class="yellow">${req.query.nome}</span></p>
            <P>Ingredientes necessários: <span class="yellow">${req.query.ingredientes}</span></P>
            <a href="/">Voltar ao cardápio</a>
          </div>
        </main>
      </body>
      </html>
      `
  );
});


app.get("/contato", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "views", "contato.html"));
});

app.post("/contato", (req, res) => {

  if (!req.body.nome || !req.body.email || !req.body.assunto || !req.body.mensagem)
      res.redirect("/not-found");

    res.status(200).send(
      `<!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Obrigado pela sugestão | DevBurger</title>
        <link rel="stylesheet" href="/css/sugestao.css">
      </head>
      <body>
        <header>
          Obrigado por contribuir com a <span class="red">&nbsp;DevBurger!</span>
        </header>
        <main>
          <div class="agradecimento">
            <img src="/images/logo.png" alt="Logo DevBurger">
            <h1>📱 Contato recebida!</h1>
            <p>Agradecemos por sua colaboração. Seu contato será passado com muito carinho para a nossa equipe de desenvolvedores de sabores!</p>
            <p>Nome: <span class="yellow">${req.body.nome}</span></p>
            <P>Email: <span class="yellow">${req.body.email}</span></P>
            <P>Assunto: <span class="yellow">${req.body.assunto}</span></P>
            <P>Mensagem: <span class="yellow">${req.body.mensagem}</span></P>
            <a href="/">Voltar ao cardápio</a>
          </div>
        </main>
      </body>
      </html>
      `
    );
});


app.get("/api/lanches", (req, res) =>{
   fetch(`http://localhost:${PORT}/data/lanches.json`)
     .then((data) => {
       return data.json();
     })
     .then((lanches) => {
       res.status(200).json(lanches);
     })
     .catch((err) => {
       res.redirect("/not-found");
     });
})

// Alternativa de get em /api/lanches usando o async/await + fetch
// app.get("/api/lanches", async  (req, res) => {
//
//   const data =  await fetch(`http://localhost:${PORT}/data/lanches.json`);
//   const lanches = await data.json();
//
//   if(!lanches) 
//     return res.redirect("/not-found");
//
//   res.status(200).json(lanches);
// });



app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
})


app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});
