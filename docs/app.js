const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'data/curriculo.db';
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("frontend/"));

app.get('/',(req,res)=> {
    res.sendFile(path.join(__dirname, ".." +"/index.html"))
});

app.get('/formacao', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM formacao WHERE cod_pessoa = 3";
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, row) => {
		if (err) {
		    throw err;
		}
        if (row){
            res.send(row);
        }
		res.end();
	});
	db.close(); 
});


app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});