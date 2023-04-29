BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "experiencia" (
	"cod_experiencia"	INTEGER NOT NULL,
	"cod_pessoa"	INTEGER,
	"nome_da_empresa"	TEXT NOT NULL,
	"ano_inicio"	INTEGER NOT NULL,
	"ano_fim"	INTEGER,
	"cargo_experiencia"	TEXT,
	"descricao_experiencia"	INTEGER,
	FOREIGN KEY("cod_pessoa") REFERENCES "dados_pessoais"("cod_pessoa"),
	PRIMARY KEY("cod_experiencia" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "dados_pessoais" (
	"cod_pessoa"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	"cargo"	TEXT,
	"endereço"	TEXT,
	"telefone"	NUMERIC,
	"email"	TEXT,
	"descricao_trajetoria"	TEXT,
	PRIMARY KEY("cod_pessoa" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "personalidade" (
	"cod_personalidade"	INTEGER NOT NULL,
	"cod_pessoa"	INTEGER NOT NULL,
	"nome_personalidade"	TEXT,
	"nivel_personalidade"	INTEGER,
	FOREIGN KEY("cod_pessoa") REFERENCES "dados_pessoais"("cod_pessoa"),
	PRIMARY KEY("cod_personalidade" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "habilidade" (
	"cod_hab"	INTEGER NOT NULL,
	"cod_pessoa"	INTEGER NOT NULL,
	"nome_habilidade"	INTEGER,
	"nivel_habilidade"	INTEGER,
	FOREIGN KEY("cod_pessoa") REFERENCES "dados_pessoais"("cod_pessoa"),
	PRIMARY KEY("cod_hab" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "formacao" (
	"cod_curso"	INTEGER NOT NULL,
	"cod_pessoa"	INTEGER,
	"nome_curso"	TEXT NOT NULL,
	"ano_inicio"	INTEGER NOT NULL,
	"ano_fim"	INTEGER,
	"descricao_curso"	TEXT,
	FOREIGN KEY("cod_pessoa") REFERENCES "dados_pessoais"("cod_pessoa"),
	PRIMARY KEY("cod_curso" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "realizacao" (
	"cod_realizacao"	INTEGER NOT NULL,
	"cod_pessoa"	INTEGER NOT NULL,
	"nome_realizacao"	TEXT NOT NULL,
	"ano_realizacao"	INTEGER NOT NULL,
	"descricao_realizacao"	TEXT,
	FOREIGN KEY("cod_pessoa") REFERENCES "dados_pessoais"("cod_pessoa"),
	PRIMARY KEY("cod_realizacao" AUTOINCREMENT)
);
INSERT INTO "dados_pessoais" ("cod_pessoa","nome","cargo","endereço","telefone","email","descricao_trajetoria") VALUES (1,'Luiza Souza Rubim','estudante','Rua M.M.D.C,80 - Butantã, São Paulo','(27)996218352','luiza.rubim@sou.inteli.edu.br','aaaaaaaaaaaaaaaaaaaaaaa');
INSERT INTO "habilidade" ("cod_hab","cod_pessoa","nome_habilidade","nivel_habilidade") VALUES (1,1,0,0);
INSERT INTO "formacao" ("cod_curso","cod_pessoa","nome_curso","ano_inicio","ano_fim","descricao_curso") VALUES (1,1,'Centro Educacional Leonardo da Vinci',2018,2022,'ensino fundamental e médio com bolsa integral
'),
 (2,1,'Inteli',2023,'-','Graduação em Engenharia da Computação');
INSERT INTO "realizacao" ("cod_realizacao","cod_pessoa","nome_realizacao","ano_realizacao","descricao_realizacao") VALUES (1,1,'',0,NULL);
COMMIT;
