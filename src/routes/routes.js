const connection = require('../database/connection')
const express = require ('express')
const router = express.Router()
const UsuarioController = require('../controllers/UsuarioController')

// Rota para adicionar um novo usuário no banco de dados
router.post('/novoUsuario', UsuarioController.novoUsuario)

// Rota para pegar os usuários no banco de dados
router.get('/usuarios', UsuarioController.logarUsuario)

module.exports = router
