const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});



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