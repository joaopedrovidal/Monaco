const { application } = require("express");
const { post } = require("./src/routes/routes");
const { json } = require("body-parser");
const { stringify } = require("qs");

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");   
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Função para registro de login do usuário

function registrar(){
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

     fetch('http://localhost:4000/novoUsuario',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: nome,
            email: email,
            senha: senha
        })
    }) 
    .then(response => response.json()) // Converte a resposta em JSON
    .then(data => {
    console.log('Usuário cadastrado com sucesso:', data);
    })
    .catch(error => {
    console.error('Erro ao cadastrar usuário:', error);
    });
}

// Função para cadastro de ponto de coletas

function cadastrarPonto(){
    // Variáveis para caputura de dados do ponto de coleta
    const nomeLocal = document.getElementById("nomeLocal").value;
    const emailLocal = document.getElementById("emailLocal").value;
    const telefoneLocal = document.getElementById("numero").value;

    // Variáveis para captura do endereço do pontod e coleta

    const numeroEndereco = document.getElementById("numero-endereco").value; 
    const cidade = document.getElementById("cidade-endereco").value;
    const estado = document.getElementById("estado").value; 

    // Consumindo a API no front-end
    fetch('http://localhost:4000/novoPonto',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            local_nome: nomeLocal,
            local_email: emailLocal,
            local_numero: telefoneLocal
        })
    })
    .then(response => response.json()) // Converte a resposta em JSON
    .then(data => {
    console.log('Ponto cadastrado com sucesso!', data);
    })
    .catch(error => {
    console.error('Erro ao cadatsrar ponto!', error);
    });
}