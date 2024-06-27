const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
});

app.get('/', (req, res) => {
  inserirNome();
  exibirNomes(res);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});


function sortearNome() {
    const nomes = ['Alice', 'Bob', 'Carol', 'David', 'Eve', 'Frank', 'Grace']; // Array de nomes

    const indiceSorteado = Math.floor(Math.random() * nomes.length); // Gera um índice aleatório
    return nomes[indiceSorteado]; // Retorna o nome sorteado
}

function inserirNome(){
    const nomeSorteado = sortearNome();
    const pessoa = { name: nomeSorteado };
    connection.query("INSERT INTO people (nome) values('"+ nomeSorteado +"')",  (error, results) => {
        if (error) {
            console.error('Erro ao inserir dados: ' + error.stack);
            return res.status(500).send('Erro ao inserir dados no banco de dados.');
        }
    });
}

function exibirNomes(res){
    connection.query('SELECT * FROM people', (error, results, fields) => {
        if (error) throw error;

        let html = '<h1>Full Cycle Rocks!</h1> <h1>Resultados da Consulta</h1><table border="1"><tr><th>ID</th><th>Nome</th></tr>';
        results.forEach(result => {
            html += `<tr><td>${result.id}</td><td>${result.nome}</td></tr>`;
        });
        html += '</table>';

        // Exibe a tabela na resposta HTTP
        res.send(html);
    });
}
