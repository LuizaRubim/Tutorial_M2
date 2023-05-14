const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'data/curriculo.db';

const hostname = '127.0.0.1';
const port = 3001;
const app = express();

/* Colocar toda a parte estática no frontend */
app.use(express.static("frontend/"));

/* Definição dos endpoints */
/******** CRUD ************/
app.use(express.json());

function leituraRegistro(caminho,tabela){ 
	app.get(`${caminho}`, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM ' +`${tabela}` + ' '+ 'WHERE cod_pessoa = '+ req.query.cod_pessoa + ';';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});
}

// Retorna todos registros (é o R do CRUD - Read)
// Retorna todos registros (é o R do CRUD - Read)
app.get('/curriculos', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM dados_pessoais ORDER BY nome COLLATE NOCASE';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
app.post('/insereCurriculo', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "INSERT INTO dados_pessoais (nome, cargo, endereço, telefone, email, descricao_trajetoria) VALUES ('" + req.body.nome + "', '" + req.body.cargo + "', '" + req.body.endereco + "','" + req.body.telefone + "','" + req.body.email + "','" + req.body.descricao + "');";


	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>CURRICULO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// Monta o formulário para o update (é o U do CRUD - Update)
app.get('/pegarDados', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM dados_pessoais WHERE cod_pessoa="+ req.query.cod_pessoa + ";";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE dados_pessoais SET nome='" + req.body.nome + "', cargo = '" + req.body.cargo + "', endereço = '" + req.body.endereco + "' , telefone='" + req.body.telefone + "', email = '" + req.body.email + "', descricao_trajetoria = '" + req.body.descricao + "' WHERE cod_pessoa='" + req.body.cod_pessoa + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>CURRICULO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
app.post('/removeCurriculo', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM dados_pessoais WHERE cod_pessoa='" + req.query.cod_pessoa + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>CURRICULO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); // Fecha o banco
});

// como não existe um front end que possibilite indicar qual usuário está sendo requisitado, as funções abaixo precisam de inserção do parâmetro cod_pessoa com value = 3 para testar o endpoint
leituraRegistro('/experiencia','experiencia');
leituraRegistro('/formacao','formacao');
leituraRegistro('/habilidade','habilidade');
leituraRegistro('/personalidade','personalidade');
leituraRegistro('/realizacao','realizacao');


app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});