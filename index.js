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
let listaProdutos = [];
//manipular o express para manipular corretamendo os dados quando forem submetidos via post
app.use(express.urlencoded({ extended: true })); //habilita a biblioca query string 
import path from 'path';


function cadastrarProdutos(requisicao, resposta) {
    const descricao = requisicao.body.descricao;
    const fabricante = requisicao.body.fabricante;
    const codbarras = requisicao.body.codbarras;
    const estoque = requisicao.body.estoque;
    const custo = requisicao.body.custo;
    const venda = requisicao.body.venda;
    const validade = requisicao.body.validade;


    //verificando se todos os campos estao prenchidos.

    if (descricao && fabricante && codbarras && estoque && custo && venda && validade) {
        listaProdutos.push({
            descricao: descricao,
            fabricante: fabricante,
            codbarras: codbarras,
            estoque: estoque,
            custo: custo,
            venda: venda,
            validade: validade
        });
        resposta.redirect('/ListarProdutos');
    }

    else {
        resposta.write(`<!DOCTYPE html>
        <html lang="pt-br">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cadastro de Produtos</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        </head>
        <body>
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="index.html">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="CadastrodeProdutos.html">Cadastro de Produtos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/listarProdutos">Relatorio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/logout">Sair</a>
                  </li>
            </ul>
            <br />
            <h3 style="text-align: center;">Aplicação Web Cadastro de Produtos</h3>
            <div class="container" style="border: solid 2px; padding: 15px;">
                <form method="post" action="/CadastrodeProdutos" class="row g-3 needs-validation" novalidate>
                    <div class="col-md-4">
                        <label for="validationCustom01" class="form-label">Descrição do Produto:</label>
                        <input type="text" class="form-control" id="validationCustom01" name="descricao" value="${descricao}" required>`);

        if (descricao == "") {
            resposta.write(`<div class="alert alert-danger" role="alert">
                             Por favor, preencha a Descrição do Produto !
                            </div>`);
        }

        resposta.write(`    
                    </div>
                    <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">Nome do Fabricante:</label>
                    <input type="text" class="form-control" id="validationCustom02" name="fabricante" value="${fabricante}" required>`);
        if (fabricante == "") {
            resposta.write(`
                        <div class="alert alert-danger" role="alert">
                        Por favor, preencha o Nome do Fabricante!
                        </div>`);
        }
        resposta.write(`
                    </div>
                        <div class="col-md-4">
                         <label for="validationCustomUsername" class="form-label">Codigo de Barras:</label>
                        <div class="input-group has-validation">
                        <input type="number" class="form-control" id="validationCustomUsername"
                        aria-describedby="inputGroupPrepend" name="codbarras" value="${codbarras}" required>`);
        if (codbarras == "") {
            resposta.write(`<div class="alert alert-danger" role="alert">
                             Por favor, preencha o Codigo de Barras!
                            </div>`);
        }
        resposta.write(`
                            </div>
                     </div>
                     <div class="col-md-6">
                     <label for="validationCustom03" class="form-label">Quantidade em Estoque:</label>
                     <input type="number" class="form-control" id="validationCustom03" name="estoque" value="${estoque}" required>`);
        if (estoque == "") {
            resposta.write(`
                    <div class="alert alert-danger" role="alert">
                         Por favor, preencha a quantidade em Estoque!
                      </div>`);
        }
        resposta.write(`</div>
            
                     <div class="col-md-3">
                      <label for="validationCustom05" class="form-label">Preço de Custo R$:</label>
                      <input type="number" class="form-control" id="validationCustom05" name="custo" value="${custo}" required>`);
        if (custo == "") {
            resposta.write(`
                        <div class="alert alert-danger" role="alert">
                        Por favor, preencha o preço de Custo!
                        </div>`);
        }
        resposta.write(` </div>
                        <div class="col-md-3">
                        <label for="validationCustom05" class="form-label">Preço de Venda R$:</label>
                        <input type="number" class="form-control" id="validationCustom05" name="venda" value="${venda}" required>`);
        if (venda == "") {
            resposta.write(`
                         <div class="alert alert-danger" role="alert">
                            Por favor, preencha o preço de Venda!
                        </div>`);
        }
        resposta.write(`
                        </div>
                        <div class="col-md-3">
                        <label for="validationCustom05" class="form-label">Data Validade:</label>
                        <input type="text" class="form-control" id="validationCustom05" name="validade" placeholder="xx/xx/xx" value="${validade}" maxlength="8">`);
        if (validade == "") {
            resposta.write(`
                        <div class="alert alert-danger" role="alert">
                        Por favor, preencha a Validade do Produto!
                        </div>`);
        }
     
        resposta.write(`
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" type="submit">Cadastrar Produto</button>
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
            maxAge: 1000 * 60 * 15 * 24 * 30
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
app.post('/CadastrodeProdutos', usuarioAutenticado, cadastrarProdutos)

app.get('/listarProdutos', usuarioAutenticado, (req, resp) => {
    resp.write('<!DOCTYPE html>');
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<meta charset="UTF-8">');
    resp.write('<title>Lista de Produtos</title>');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">')
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<h3>Produtos Cadastrados</h3>');
    resp.write('<table class="table table-dark table-striped">');
    resp.write('<tr>');
    resp.write('<th>Descrição do Produto</th>');
    resp.write('<th>Fabricante</th>');
    resp.write('<th>Codigo de Barras</th>');
    resp.write('<th>Quantidade em Estoque</th>');
    resp.write('<th>Preço de custo R$</th>');
    resp.write('<th>Preço de Venda R$</th>');
    resp.write('<th>Validade</th>');
    resp.write('</tr>');

    for (let i = 0; i < listaProdutos.length; i++) {
        resp.write('<tr>');
        resp.write(`<td>${listaProdutos[i].descricao}</td>`);
        resp.write(`<td>${listaProdutos[i].fabricante}</td>`);
        resp.write(`<td>${listaProdutos[i].codbarras}</td>`);
        resp.write(`<td>${listaProdutos[i].estoque}</td>`);
        resp.write(`<td>${listaProdutos[i].custo}</td>`);
        resp.write(`<td>${listaProdutos[i].venda}</td>`);
        resp.write(`<td>${listaProdutos[i].validade}</td>`);

    }
    resp.write('</table>');
    resp.write('<button><a href="/CadastrodeProdutos.html">Cadastrar novo Poduto</a></button>');
    resp.write('<button><a href="/index.html">Voltar</a></button>');
    resp.write('<br>');
    if (req.cookies.dataUltimoAcesso) {
        resp.write('<p>Ultimo acesso: ' + req.cookies.dataUltimoAcesso + '</p>');
    }
    resp.write('</body>');
    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>')
    resp.write('</html>');
    resp.end();
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

