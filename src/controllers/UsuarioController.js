const database = require ('../database/connection')

class UsuarioController {
// Insere no banco um novo usuário
    novoUsuario(request,response){

        const {nome, email, senha} = request.body

        console.log(nome, email, senha)

        
        database.insert({nome, email, senha}).table("usuario").then(data=>{
            console.log(data)
            response.json({message:"Usuario criado com sucesso!"})
        }).catch(error=>{
            console.log(error)
        })
    }
// Verifica no banco os usuários
    logarUsuario(request, response){
        database.select("*").table("usuario").then(usuarios =>{
            console.log(usuarios)
            response.json(usuarios)
        }).catch(error =>{
            console.log(error)
        })
    }
}

module.exports = new UsuarioController()