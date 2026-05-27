// Cadastro de Clientes - CRUD

// Variáveis de referência aos elementos do DOM

const cadastrarClienteButton = document.getElementById('cadastrar');
const modal = document.getElementById('modal');
const modalCloseButton = document.getElementById('modal-close');
const modalCancelButton = document.getElementById('modal-cancel');
const modalForm = document.getElementById('modal-form');

// Array para armazenar os clientes

const clientes = [];

// Funções

// Fecha o modal e reseta o formulário
const modalClose = () => {
    modal.classList.add('modal--hidden');
    modalForm.reset();
}

// ***CREATE*** - Adiciona novo cliente ao array e salva no localStorage
const createClient = (client) => {
    clientes.push(client);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    modalClose();
}

// Eventos

// Fecha modal ao clicar no X
modalCloseButton.addEventListener('click', modalClose);

// Fecha modal ao clicar em Cancelar
modalCancelButton.addEventListener('click', modalClose);

// Abre modal ao clicar em Cadastrar Cliente
cadastrarClienteButton.addEventListener('click', () => {
    modal.classList.remove('modal--hidden');
});

// Coleta dados do formulário e chama createClient
modalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nomeInput = document.getElementById('nome').value;
    const emailInput = document.getElementById('email').value;
    const telefoneInput = document.getElementById('celular').value;
    const cidadeInput = document.getElementById('cidade').value;

    const newClient = {
        nome: nomeInput,
        email: emailInput,
        telefone: telefoneInput,
        cidade: cidadeInput
    };

    createClient(newClient);

});