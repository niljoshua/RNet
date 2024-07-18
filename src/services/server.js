// server.js
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3001;

// Configuração do banco de dados
const db = mysql.createConnection({
    host: '170.249.204.178',
    user: 'devencurta_dev',
    password: 'EbXOViT0tYh',
    database: 'devencurta_dev'
});
8889
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados');
});

app.use(express.json());

// Rota para verificar e atualizar/inserir dados
app.post('/api/usuarios', (req, res) => {
    const { nome, phone, cotas } = req.body;
    const sqlSelect = 'SELECT * FROM usuarios WHERE nome = ? AND phone = ?';
    const sqlUpdate = 'UPDATE usuarios SET cotas = cotas + ? WHERE nome = ? AND phone = ?';
    const sqlInsert = 'INSERT INTO usuarios (nome, phone, cotas) VALUES (?, ?, ?)';

    db.query(sqlSelect, [nome, phone], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length > 0) {
            // Atualizar cotas
            db.query(sqlUpdate, [cotas, nome, phone], (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.send('Cotas atualizadas com sucesso');
            });
        } else {
            // Inserir novo registro
            db.query(sqlInsert, [nome, phone, cotas], (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.send('Novo usuário inserido com sucesso');
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
