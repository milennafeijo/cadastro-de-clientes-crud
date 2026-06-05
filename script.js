
// manipulação do DOM

const cadastrarClienteButton = document.getElementById('cadastrar');
const modal = document.getElementById('modal');
const modalCloseButton = document.getElementById('modal-close');
const modalCancelButton = document.getElementById('modal-cancel');
const modalForm = document.getElementById('modal-form');
const tableBody = document.getElementById('tbody');

// array para armazenar os clientes

const clientes = [];

// variável para controlar o índice do cliente sendo editado

let editIndex = null;

// fechar o modal e resetar o formulário

const modalClose = () => {
    modal.classList.add('modal--hidden');
    modalForm.reset();
    editIndex = null;
}



// READ: renderizar a tabela de clientes com o índice de cada cliente para facilitar a edição e exclusão

const renderTable = () => {
    tableBody.innerHTML = '';

        if (clientes.length === 0) {
            const tr = document.createElement('tr');

        tr.innerHTML = `
            <td colspan="5" class="no-data">Nenhum cliente cadastrado</td>
        `;

        tableBody.appendChild(tr);
        return;
    }

    clientes.forEach((client, index) => {
        renderClients(client, index);
    });
}

// DELETE & EDIT: renderizar cada cliente na tabela com os botões de editar e excluir, utilizando o índice para identificar qual cliente está sendo editado ou excluído

const renderClients = (client, index) => {
    const tr = document.createElement('tr');

       tr.innerHTML = `
        <td data-label="Nome">${client.nome}</td>
        <td data-label="E-mail">${client.email}</td>
        <td data-label="Celular">${client.telefone}</td>
        <td data-label="Cidade">${client.cidade}</td>
        <td data-label="Ações" class="actions-cell">
            <button class="button button--success btn-edit">Editar</button>
            <button class="button button--danger btn-delete">Excluir</button>
        </td>
    `;

    const editButton = tr.querySelector('.btn-edit');
    const deleteButton = tr.querySelector('.btn-delete');


    deleteButton.addEventListener('click', () => {
        clientes.splice(index, 1);

        localStorage.setItem(
            'clientes',
            JSON.stringify(clientes)
        );

        renderTable();
    });



    editButton.addEventListener('click', () => {
        document.getElementById('nome').value = client.nome;
        document.getElementById('email').value = client.email;
        document.getElementById('celular').value = client.telefone;
        document.getElementById('cidade').value = client.cidade;

        editIndex = index;

        modal.classList.remove('modal--hidden');
    });

    tableBody.appendChild(tr);


    
}

// READ: carregar os clientes do localStorage ao iniciar a aplicação, garantindo que o índice de cada cliente seja mantido para facilitar a edição e exclusão

const loadClients = () => {
    const storedClients = JSON.parse(
        localStorage.getItem('clientes')
    );

    if (storedClients) {
        storedClients.forEach(client => {
            clientes.push(client);
        });

        renderTable();

    } else {renderTable();}
    
}


loadClients();

// CREATE: criar um novo cliente, adicionando-o ao array de clientes e atualizando o localStorage, garantindo que o índice do novo cliente seja mantido para facilitar a edição e exclusão


const createClient = (client) => {
    clientes.push(client);

    localStorage.setItem(
        'clientes',
        JSON.stringify(clientes)
    );

    renderTable();

    modalClose();
}

// CREATE & UPDATE: submete o formulário para criar um novo cliente ou atualizar um existente, utilizando editIndex para determinar a operação.

modalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nomeInput = document.getElementById('nome').value.trim();
    const emailInput = document.getElementById('email').value.trim();
    const telefoneInput = document.getElementById('celular').value.trim();
    const cidadeInput = document.getElementById('cidade').value.trim();

    const newClient = {
        nome: nomeInput,
        email: emailInput,
        telefone: telefoneInput,
        cidade: cidadeInput
    };



    if (editIndex !== null) {
        clientes[editIndex] = newClient;

        localStorage.setItem(
            'clientes',
            JSON.stringify(clientes)
        );

        renderTable();

        modalClose();

        editIndex = null;

        return;
    }

    createClient(newClient);
});

// eventos para abrir o modal de cadastro, fechar o modal e cancelar a edição, garantindo que a variável editIndex seja resetada.

modalCloseButton.addEventListener('click', modalClose);

modalCancelButton.addEventListener('click', () => {
    editIndex = null;
    modalClose();
});



cadastrarClienteButton.addEventListener('click', () => {
    editIndex = null;

    modalForm.reset();

    modal.classList.remove('modal--hidden');
});