const { message } = require('statuses');
const database = require('../database/connection');
const bcrypt = require('bcrypt');

class UsuarioController {
    // Insere no banco um novo usuário
    async novoUsuario(request, response) {
        const { nome, email, senha } = request.body;

        console.log(nome, email, senha);

        try {
            const saltRounds = 10; // Define o número de rounds para gerar o salt
            const hashedSenha = await bcrypt.hash(senha, saltRounds);

            // Insere o usuário no banco com a senha criptografada
            database.insert({ nome, email, senha: hashedSenha }).table("usuario")
                .then(data => {
                    console.log(data);
                    response.json({ message: "Usuário criado com sucesso!" });
                })
                .catch(error => {
                    console.log(error);
                    response.status(500).json({ message: "Erro ao criar usuário" });
                });
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: "Erro ao criptografar a senha" });
        }
    }

    // Verifica no banco se o usuário existe tendo como base o email informado
    async logarUsuario(request, response) {
        const { email, senha } = request.body;

        try{
            const usuario = await database('usuario').where({ email }).first();

                if(!usuario){
                    return response.status(404).json({ message: "Usuário não encontrado "});
                }

            const senhaValida = await bcrypt.compare(senha, usuario.senha);  // Variável de senha válida com a cirptografia
            
                if(senhaValida){
                    return response.json({ message: "Login bem-sucedido!"});
                }else{
                    return response.status(401).json({ message: "Senha incorreta" });
                }
            } catch (error){
                console.log(error);
                response.status(500).json({ message: "Erro ao tentar fazer login" });
            }
        }
        /* database.select("*").table("usuario")
            .then(usuarios => {
                console.log(usuarios);
                response.json(usuarios);
            })
            .catch(error => {
                console.log(error);
                response.status(500).json({ message: "Erro ao buscar usuários" });
            });
    } */

    // Cadastra ponto de coleta no banco de dados
    cadastrarPonto(request, response){
        const { local_nome, local_email, local_numero, endereco_numero, endereco_cidade, endereco_estado, itens_coleta } = request.body;
        console.log(local_nome, local_email, local_numero);
        const itensColetaString = itens_coleta.join(', ');


        database.insert({ local_nome, local_email, local_numero, endereco_numero, endereco_cidade, endereco_estado, itens_coleta: itensColetaString }).table("ponto")
        .then (data =>{
            console.log(data);
            response.json({ message: "Ponto cadastrado com sucesso!" });
        })
        .catch(error =>{
            console.log(error);
            response.status(500).json({ message: "Erro ao tentar cadastrar ponto!" });
        })
    }

    async buscarPonto(request, response){
        const{ cidade, estado } = request.query;

        if (!cidade || !estado){
            return response.status(400).json({ error: 'Cidade e estado são obrigatórios.'});
        }

        try{
            const pontos = await database.select("*").from('ponto').where({
                endereco_cidade: cidade,
                endereco_estado: estado
            });
            response.json(pontos);
        }catch (error){
            console.error("Erro ao buscar pónto de coleta:", error);
            response.status(500).json({ error: "Erro ao buscar pontos de coleta" });
        }    
    }    
}

module.exports = new UsuarioController();