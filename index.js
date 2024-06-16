import express from 'express';
import session from 'express-session'; //fazendo que o HTTP seja visto como um protolo statefull
// nao é http que tera o estado e sim nosso aplicação.
import cookieParser from 'cookie-parser';
const host = "0.0.0.0";
const port = 3000;
const app = express();

//para permitir que informações sejam mantidas e trocadas enre cleinte e servidor, tais podem ser armazenadas em cookies. para possibilitar que nossa aplicação manipule cookies instalar o modulo cookie-parser.

// para controlar estados e informaçoes exclusivas para um determinado usuario entre todos é preciso estabelecer uma sessao para cada um dos usuarios. para isso é necessario instalar modulo express-session
app.use(session({
    secret: 'MinH4Ch4v3S3cr3t4',//chave para assinar os dados da sessao
    resave: true, // salva a sessão a cada requisição HTTP
    saveUninitialized: true,
    cookie: {//tempo de vida da sessão
        maxAge: 1000 * 60 * 15 // 15 minutos permanecera autenticado 
    }
}));

app.use(cookieParser());// habilita o modulo cookie-parser. Mais um Middleware para permitir que a aplicaçao manipule cookies.
let listaInteressados = [];
let listaPets = [];
let listaadocao = [];
//manipular o express para manipular corretamendo os dados quando forem submetidos via post
app.use(express.urlencoded({ extended: true })); //habilita a biblioca query string 
import path from 'path';


function cadastrarInteressado(requisicao, resposta) {
    const nome = requisicao.body.nome;
    const email = requisicao.body.email;
    const telefone = requisicao.body.telefone;



    //verificando se todos os campos estao prenchidos.

    if (nome && email && telefone) {
        listaInteressados.push({
            nome: nome,
            email: email,
            telefone: telefone,

        });
        resposta.redirect('/ListarInteressados');
    }

    else {
        resposta.write(`<!DOCTYPE html>
                        <html lang="pt-br">

                        <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Cadastro de Interessados</title>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
                         integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                        </head>
                        <body>
                            <ul class="nav justify-content-center">
                                <li class="nav-item">
                                     <a class="nav-link active" aria-current="page" href="index.html">Inicio</a>
                                </li>
                            <li class="nav-item">
                              <a class="nav-link" href="/logout">logout</a>
                          </li>
                             </ul>
                        <br />
                        <h3 style="text-align: center;">Aplicação Web Patinhas Felizes</h3>
                         <div class="container" style="border: solid 2px; padding: 15px;">
                         <form method="post" action="/CadastrodeInteressados" class="row g-3 needs-validation" novalidate>
                        <legend>Cadastro de Interessados </legend>
                      <div class="col-md-4">
                        <label for="validationCustom01" class="form-label">Nome:</label>
                         <input type="text" class="form-control" id="validationCustom01" name="nome" value="${nome}" required>`);

        if (nome == "") {
            resposta.write(`<div class="alert alert-danger" role="alert">
                             Por favor, preencha o Nome do Interessado!
                            </div>`);
        }

        resposta.write(`    
                      </div>
                       <div class="col-md-4">
                            <label for="validationCustom02" class="form-label">Email:</label>
                          <input type="text" class="form-control" id="validationCustom02" name="email"  value="${email}" required>`);
        if (email == "") {
            resposta.write(`
                         <div class="alert alert-danger" role="alert">
                         Por favor, preencha o Email do Interessado!
                         </div>`);
        }
        resposta.write(`
                     </div>
                     <div class="col-md-3">
                        <label for="validationCustomUsername" class="form-label">Telefone:</label>
                      <div class="input-group has-validation">
                       <input type="number" class="form-control" id="validationCustomUsername"
                        aria-describedby="inputGroupPrepend" name="telefone" value="${telefone}" required>`);
        if (telefone == "") {
            resposta.write(`
                            <div class="alert alert-danger" role="alert">
                             Por favor, preencha o Telefone do Interessado!
                            </div>`);
        }
        resposta.write(`
                     </div>
                     </div>
            <div class="col-12">
                <button class="btn btn-primary" type="submit">Cadastrar Interessado</button>
             </div>
          </form>
         </div>
         </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>

     </html>`);


        resposta.end();

    }//fim else


}

function cadastrarPets(requisicao, resposta) {
    const nomepet = requisicao.body.nomepet;
    const raca = requisicao.body.raca;
    const idade = requisicao.body.idade;



    //verificando se todos os campos estao prenchidos.

    if (nomepet && raca && idade) {
        listaPets.push({
            nomepet: nomepet,
            raca: raca,
            idade: idade,

        });
        resposta.redirect('/ListarPets');
    }

    else {
        resposta.write(`<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Pets</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
    <ul class="nav justify-content-center">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="index.html">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="CadastrodeInteressados.html">Cadastro de Interessados</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="CadastrodePets.html">Cadastro de Pets</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/logout">Sair</a>
        </li>
      </ul>
    <br />
    <h3 style="text-align: center;">Aplicação Web Patinhas Felizes</h3>
    <div class="container" style="border: solid 2px; padding: 15px;">
        <form method="post" action="/CadastrodePets" class="row g-3 needs-validation" novalidate>
            <legend>Cadastro de Pets </legend>
            <div class="col-md-4">
                <label for="validationCustom01" class="form-label">Nome:</label>
                <input type="text" class="form-control" id="validationCustom01" name="nomepet" value="${nomepet}" required>`);

        if (nomepet == "") {
            resposta.write(`<div class="alert alert-danger" role="alert">
                             Por favor, preencha o Nome do Pet!
                            </div>`);
        }

        resposta.write(`    
                        </div>
            <div class="col-md-4">
                <label for="validationCustom02" class="form-label">Raça</label>
                <input type="text" class="form-control" id="validationCustom02" name="raca"  value="${raca}" required>`);
        if (raca == "") {
            resposta.write(`
                         <div class="alert alert-danger" role="alert">
                         Por favor, preencha a Raça do Pet!
                         </div>`);
        }
        resposta.write(`
                     </div>
            <div class="col-md-2">
                <label for="validationCustomUsername" class="form-label">Idade</label>
                <div class="input-group has-validation">
                    <input type="number" class="form-control" id="validationCustomUsername"
                        aria-describedby="inputGroupPrepend" name="idade" value="${idade}" required>`);
        if (idade == "") {
            resposta.write(`
                            <div class="alert alert-danger" role="alert">
                             Por favor, preencha a Idade do Pet!
                            </div>`);
        }
        resposta.write(`
                     </div>
                     </div>
            <div class="col-12">
                <button class="btn btn-primary" type="submit">Cadastrar Pet</button>
             </div>
          </form>
         </div>
         </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>

     </html>`);


        resposta.end();

    }//fim else


}
function autenticarUsuario(requisicao, resposta) {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario == 'felipe' && senha == '03204' || usuario == 'admin' && senha == 'admin') {
        requisicao.session.usuarioAutenticado = true;
        resposta.cookie('dataUltimoAcesso', new Date().toLocaleString(), {
            httpOnly: true,
            maxAge: 1000 * 60 * 30   // 30 minutos de sesssão 
        });
        resposta.redirect('/');
    }
    else {
        resposta.write('<!DOCTYPE html>');
        resposta.write('<html>');
        resposta.write('<head>');
        resposta.write('<meta charset="UTF-8">');
        resposta.write('<title>Login ou Senha Invalida</title>');
        resposta.write('</head>');
        resposta.write('<body>');
        resposta.write('<h1>Usuário ou senha inválidos</h1>');
        resposta.write('<p>Por favor, tente novamente</p>');
        resposta.write('<p><a href="/login.html">Voltar</a></p>');
        if (requisicao.cookies.dataUltimoAcesso) {
            resposta.write('<p>Ultimo acesso: ' + requisicao.cookies.dataUltimoAcesso + '</p>');
        }
        resposta.write('</body>');
        resposta.write('</html>');
        resposta.end();
    }
}
app.post('/login', autenticarUsuario);

app.get('/login', (req, resp) => {
    resp.redirect('/login.html');
});

app.get('/logout', (req, resp) => {
    req.session.destroy();
    resp.redirect('/login.html');
});


//quando um usuario enviar uma requisiçao do tipo post para o end point /cadastrodeProdutos acionar a funçao cadastrarProdutos.
app.post('/CadastrodeInteressados', usuarioAutenticado, cadastrarInteressado)
app.post('/CadastrodePets', usuarioAutenticado, cadastrarPets)

app.get('/listarInteressados', usuarioAutenticado, (req, resp) => {
    resp.write('<!DOCTYPE html>');
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<meta charset="UTF-8">');
    resp.write('<title>Lista de Interessados</title>');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">')
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<h3>Interessados Cadastrados</h3>');
    resp.write('<table class="table table-dark table-striped">');
    resp.write('<tr>');
    resp.write('<th>Nome</th>');
    resp.write('<th>Email</th>');
    resp.write('<th>Telefone</th>');
    resp.write('</tr>');

    for (let i = 0; i < listaInteressados.length; i++) {
        resp.write('<tr>');
        resp.write(`<td>${listaInteressados[i].nome}</td>`);
        resp.write(`<td>${listaInteressados[i].email}</td>`);
        resp.write(`<td>${listaInteressados[i].telefone}</td>`);


    }
    resp.write('</table>');
    resp.write('<button><a href="/CadastrodeInteressados.html">Cadastrar Novo Interessado</a></button>');
    resp.write('<button><a href="/index.html">Voltar</a></button>');
    resp.write('</body>');
    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>')
    resp.write('</html>');
    resp.end();
});

app.get('/ListarPets', usuarioAutenticado, (req, resp) => {
    resp.write('<!DOCTYPE html>');
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<meta charset="UTF-8">');
    resp.write('<title>Lista de Pets</title>');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">')
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<h3>Pets Cadastrados</h3>');
    resp.write('<table class="table table-dark table-striped">');
    resp.write('<tr>');
    resp.write('<th>Nome</th>');
    resp.write('<th>Raça</th>');
    resp.write('<th>Idade</th>');
    resp.write('</tr>');

    for (let i = 0; i < listaPets.length; i++) {
        resp.write('<tr>');
        resp.write(`<td>${listaPets[i].nomepet}</td>`);
        resp.write(`<td>${listaPets[i].raca}</td>`);
        resp.write(`<td>${listaPets[i].idade}</td>`);


    }
    resp.write('</table>');
    resp.write('<button><a href="/CadastrodePets.html">Cadastrar Novo Pet</a></button>');
    resp.write('<button><a href="/index.html">Voltar</a></button>');
    resp.write('</body>');
    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>')
    resp.write('</html>');
    resp.end();
});

app.use('/Adotar', usuarioAutenticado, (requisicao, resposta) => {
    resposta.write(`<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adotar Pet</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
    <ul class="nav justify-content-center">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="index.html">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="CadastrodeInteressados.html">Cadastro de Interessados</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="CadastrodePets.html">Cadastro de Pets</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/Adotar">Adote um Pet</a>
          </li>
        <li class="nav-item">
          <a class="nav-link" href="/logout">Sair</a>
        </li>
      </ul>
    <br />
    <h3 style="text-align: center;">Aplicação Web Patinhas Felizes</h3>
    <div class="container" style="border: solid 2px; padding: 15px;">
        <form method="post" action="/Registrarinteresse" class="row g-3 needs-validation" novalidate>
            <legend>Adotar Pet </legend>
            <div class="col-md-4">
                <label for="validationCustom01" class="form-label">Interessado:</label>
                <select id="validationCustom01" name="nomepessoa" required>
                    <option value="">Escolha um interessado...</option>`)
    for (let i = 0; i < listaInteressados.length; i++) {
        resposta.write(`<option value="${listaInteressados[i].nome}">${listaInteressados[i].nome}</option>`)
    }
    resposta.write(` </select>
            </div>
            <div class="col-md-4">
                <label for="validationCustom02" class="form-label">Pet:</label>
                <select id="validationCustom01" name="nomepetadocao" required>
                    <option value="">Escolha um Pet...</option>`)
    for (let i = 0; i < listaPets.length; i++) {
        resposta.write(`<option value="${listaPets[i].nomePet}">${listaPets[i].nomepet}</option>`)
    }
    resposta.write(`</select>
            </div>
            <div class="col-12">
                <button class="btn btn-primary" type="submit">Registrar Interesse na Adoçao</button>
            </div>
        </form>
    </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>

</html>`)
    resposta.end();
});

app.post('/Registrarinteresse', usuarioAutenticado, RegistrodeInteresse);
function RegistrodeInteresse(requisicao, resposta) {
    var Interessado = requisicao.body.nomepessoa;
    var pet = requisicao.body.nomepetadocao;

    if (Interessado != "" && pet != "") {
        let racaInteresse = "";
        let idadeInteresse = "";

        // Busca pelo pet na lista de pets
        let j = 0;
        while (j < listaPets.length && pet != listaPets[j].nomepet) {
            j++;
        }
        if (j < listaPets.length) {
            // Atualiza pet com o nome encontrado na listaPets
            pet = listaPets[j].nomepet;
            racaInteresse = listaPets[j].raca;
            idadeInteresse = listaPets[j].idade;
        }

        let emailInteressado = "";
        let telefoneInteressado = "";
        // Busca pelo interessado na lista de interessados
        let u = 0;
        while (u < listaInteressados.length && Interessado != listaInteressados[u].nome) {
            u++;
        }
        if (u < listaInteressados.length) {
            emailInteressado = listaInteressados[u].email;
            telefoneInteressado = listaInteressados[u].telefone;
        }

        var dataRegistro = new Date().toLocaleString();

        listaadocao.push({
            pessoaInteressada: Interessado,
            petInteresse: pet,
            emailInteressado: emailInteressado,
            telefoneInteressado: telefoneInteressado,
            racaInteresse: racaInteresse,
            idadeInteresse: idadeInteresse,
            data: dataRegistro
        });
        resposta.redirect('/listarAdocoes');

    }
    else {
        resposta.write(`<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adotar Pet</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
    <ul class="nav justify-content-center">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="index.html">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="CadastrodeInteressados.html">Cadastro de Interessados</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="CadastrodePets.html">Cadastro de Pets</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/Adotar">Adote um Pet</a>
          </li>
        <li class="nav-item">
          <a class="nav-link" href="/logout">Sair</a>
        </li>
      </ul>
    <br />
    <h3 style="text-align: center;">Aplicação Web Patinhas Felizes</h3>
    <div class="container" style="border: solid 2px; padding: 15px;">
        <form method="post" action="/Registrarinteresse" class="row g-3 needs-validation" novalidate>
            <legend>Adotar Pet </legend>
            <div class="col-md-4">
                <label for="validationCustom01" class="form-label">Interessado:</label>
                <select id="validationCustom01" name="nomepessoa" required>
                    <option value="">Escolha um interessado...</option>`)
        for (let i = 0; i < listaInteressados.length; i++) {
            resposta.write(`<option value="${listaInteressados[i].nome}">${listaInteressados[i].nome}</option>`)
        }
        resposta.write(` </select>
                        </div>
                        <div class="col-md-4">
                            <label for="validationCustom02" class="form-label">Pet:</label>
                            <select id="validationCustom01" name="nomepetadocao" required>
                                <option value="">Escolha um Pet...</option>`)
        for (let i = 0; i < listaPets.length; i++) {
            resposta.write(`<option value="${listaPets[i].nomePet}">${listaPets[i].nomepet}</option>`)
        }
        resposta.write(`</select>
                        </div>
                        <div class="alert alert-danger" role="alert">
                             Por favor, Selecione um Interessado e um Pet!
                            </div>

                        <div class="col-12">
                            <button class="btn btn-primary" type="submit">Registrar Interesse na Adoçao</button>
                        </div>
                    </form>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
                crossorigin="anonymous"></script>
            
            </html>`)
        resposta.end();

    }

}
app.get('/listarAdocoes', usuarioAutenticado, (requisicao, resposta) => {
    resposta.write('<!DOCTYPE html>');
    resposta.write('<html lang="pt-br">');
    resposta.write('<head>');
    resposta.write('<meta charset="UTF-8">');
    resposta.write('<title>Lista de Adoções</title>');
    resposta.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">');
    resposta.write('</head>');
    resposta.write('<body>');
    resposta.write('<div class="container">');
    resposta.write('<h3>Lista de Adoções Realizadas</h3>');
    resposta.write('<table class="table table-dark table-striped">');
    resposta.write('<thead>');
    resposta.write('<tr>');
    resposta.write('<th>Interessado</th>');
    resposta.write('<th>Telefone</th>');
    resposta.write('<th>Email</th>');
    resposta.write('<th>Pet</th>');
    resposta.write('<th>Raça</th>');
    resposta.write('<th>Idade</th>');
    resposta.write('<th>Data do Registro</th>');
    resposta.write('</tr>');
    resposta.write('</thead>');
    resposta.write('<tbody>');

    // Iterar sobre a lista de adoções e adicionar cada entrada na tabela
    for (let i = 0; i < listaadocao.length; i++) {
        resposta.write('<tr>');
        resposta.write(`<td>${listaadocao[i].pessoaInteressada}</td>`);
        resposta.write(`<td>${listaadocao[i].telefoneInteressado}</td>`);
        resposta.write(`<td>${listaadocao[i].emailInteressado}</td>`);
        resposta.write(`<td>${listaadocao[i].petInteresse}</td>`);
        resposta.write(`<td>${listaadocao[i].racaInteresse}</td>`);
        resposta.write(`<td>${listaadocao[i].idadeInteresse}</td>`);
        resposta.write(`<td>${listaadocao[i].data}</td>`);
        resposta.write('</tr>');
    }

    resposta.write('</tbody>');
    resposta.write('</table>');
    resposta.write('<a href="/Adotar" class="btn btn-primary">Adotar Novo Pet</a>');
    resposta.write('<a href="/index.html" class="btn btn-secondary">Voltar</a>');
    resposta.write('</div>');
    resposta.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>');
    resposta.write('</body>');
    resposta.write('</html>');
    resposta.end();
});
//funçao para verificar se o usuario esta autenticado e autorizado (middleware)
function usuarioAutenticado(requisicao, resposta, next) {
    if (requisicao.session.usuarioAutenticado) {
        next(); // permitir que a resição continue a ser processada
    }
    else {
        resposta.redirect('/login.html');
    }
}
// permitir que os usuarios acessem a pasta "publico".
app.use(express.static(path.join(process.cwd(), '/publico')));

// permitir que os usuarios tenham acesso ao conteudo da pasta "protegido"
//verificando antes se o usuario esta autenticado
app.use(usuarioAutenticado, express.static(path.join(process.cwd(), '/protegido')));


app.listen(port, host, () => {
    console.log(`Servidor rodando em http://${host}:${port}`);
});

