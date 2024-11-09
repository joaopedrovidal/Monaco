const { application } = require("express");
const { post } = require("./src/routes/routes");
const { json } = require("body-parser");
const { stringify } = require("qs");
const { method } = require("lodash");

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
function registrar() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    fetch('http://localhost:4000/novoUsuario', {
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

// Função para login 
function entrar(event) {
    event.preventDefault();
    const email = document.getElementById("emailLogin").value;
    const senha = document.getElementById("senhaLogin").value;

    fetch('http://localhost:4000/login', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.message === "Login bem-sucedido!") {
            console.log("Login efetuado com sucesso:", data);
            window.location.href = 'index4.html';
        } else {
            console.error("Erro de login:", data.message);
            alert("Erro:" + data.message);
        }
    })
    .catch(error => {
        console.error("Erro ao efetuar o login:", error);
        alert("Erro ao efetuar o login: " + error);
    });
}

// Função para cadastro de ponto de coletas
function cadastrarPonto() {
    // Variáveis para captura de dados do ponto de coleta
    const nomeLocal = document.getElementById("nomeLocal").value;
    const emailLocal = document.getElementById("emailLocal").value;
    const telefoneLocal = document.getElementById("numero").value;

    // Variáveis para captura do endereço do ponto de coleta
    const numeroEndereco = document.getElementById("numero-endereco").value; 
    const cidade = document.getElementById("cidade-endereco").value;
    const estado = document.getElementById("estado").value; 


    const checkboxes = document.getElementsByClassName("checkbox");
    const itensColeta = [];

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            itensColeta.push(checkboxes[i].value);
        }
    }

    // Consumindo a API no front-end
    fetch('/novoPonto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            local_nome: nomeLocal,
            local_email: emailLocal,
            local_numero: telefoneLocal,
            endereco_numero: numeroEndereco,
            endereco_cidade: cidade,
            endereco_estado: estado,
            itens_coleta: itensColeta
        })
    })
    .then(response => response.json()) // Converte a resposta em JSON
    .then(data => {
        console.log('Ponto cadastrado com sucesso!', data);
    })
    .catch(error => {
        console.error('Erro ao cadastrar ponto!', error);
    });
}

function exibirPontos(pontos) {
    const resultadosContainer = document.getElementById("resultados-container");

    resultadosContainer.innerHTML = '';

    if (pontos.length === 0) {
        resultadosContainer.innerHTML = "<p>Nenhum ponto de coleta encontrado para esta localização.</p>";
    } else {
        pontos.forEach(ponto => {
            const pontoDiv = document.createElement("div");
            pontoDiv.className = "ponto";

            pontoDiv.innerHTML = `
                <h3>${ponto.local_nome}</h3>
                <p>Email: ${ponto.local_email}</p>
                <p>Telefone: ${ponto.local_numero}</p>
                <p>Endereço: ${ponto.endereco_numero}, ${ponto.endereco_cidade} - ${ponto.endereco_estado}</p>
                <p>Itens: ${ponto.itens_coleta} </p>
            `;

            resultadosContainer.appendChild(pontoDiv);
        });
    }
}

async function carregarResultados(event) {
    event.preventDefault();

    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;

    try {
        const response = await fetch(`http://localhost:4000/buscarPonto?cidade=${cidade}&estado=${estado}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error("Não foi possível carregar os pontos de coleta. Tente novamente mais tarde.");
        }

        const pontos = await response.json();
        exibirPontos(pontos);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}
