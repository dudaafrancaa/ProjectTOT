const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.post("/enviar", async (req, res) => {
  const token = req.body["g-recaptcha-response"];

  const googleResponse = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `secret=6LfwgJMsAAAAAAyap33vU7NjODFQ2S-FRIm_TSE1&response=${token}`
    }
  );

  const data = await googleResponse.json();

  if (data.success) {
    res.send("Tudo certo");
  } else {
    res.send("Falha no reCAPTCHA");
  }
});

app.listen(3000, () => console.log("Rodando na porta 3000"));