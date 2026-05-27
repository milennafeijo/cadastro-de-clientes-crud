
// Variáveis DOM

const cadastrarClienteButton = document.getElementById('cadastrar');

const modal = document.getElementById('modal');

const modalCloseButton = document.getElementById('modal-close');

const modalCancelButton = document.getElementById('modal-cancel');

// Funções

const modalClose = () => {
    modal.classList.add('modal--hidden');
}

// Eventos

modalCloseButton.addEventListener('click', modalClose);

modalCancelButton.addEventListener('click', modalClose);

cadastrarClienteButton.addEventListener('click', () => {
    modal.classList.remove('modal--hidden');
    console.log('clicou');
});