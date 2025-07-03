const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;

// Permitir JSON e chamadas externas (ex: GitHub Pages)
app.use(cors());
app.use(express.json());

// Banco de dados SQLite
const db = new sqlite3.Database('./database.db');

// Criar tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS confirmacoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  resposta TEXT NOT NULL
)`);

// Rota POST - Receber nome e confirmação
app.post('/confirmar', (req, res) => {
  const { nome, resposta } = req.body;

  db.run(`INSERT INTO confirmacoes (nome, resposta) VALUES (?, ?)`, [nome, resposta], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao salvar.");
    }
    res.send({ id: this.lastID });
  });
});

// Rota GET - Ver todas as confirmações
app.get('/lista', (req, res) => {
  db.all(`SELECT * FROM confirmacoes`, (err, rows) => {
    if (err) {
      return res.status(500).send("Erro ao buscar.");
    }
    res.send(rows);
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
