const apiUrl = 'http://127.0.0.1:5000/users/'; // URL base da API

// Carregar todos os usuários ao iniciar a página
document.addEventListener('DOMContentLoaded', loadUsers);

// Adicionar evento de envio ao formulário
document.getElementById('userForm').addEventListener('submit', addUser);

// Função para carregar todos os usuários
function loadUsers() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('users');
            userList.innerHTML = ''; // Limpar lista de usuários

            data.forEach(user => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="editUser(${user.id})">Editar</button>
                        <button onclick="deleteUser(${user.id})">Deletar</button>
                    </td>
                `;

                userList.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao carregar usuários:', error));
}

// Função para adicionar um novo usuário
function addUser(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(data => {
        loadUsers(); // Recarregar a lista de usuários
        document.getElementById('userForm').reset(); // Limpar o formulário
    })
    .catch(error => console.error('Erro ao adicionar usuário:', error));
}

// Função para deletar um usuário
function deleteUser(userId) {
    fetch(`${apiUrl}${userId}`, {
        method: 'DELETE'
    })
    .then(() => loadUsers()) // Recarregar a lista de usuários
    .catch(error => console.error('Erro ao deletar usuário:', error));
}

// Função para editar um usuário
function editUser(userId) {
    const name = prompt("Digite o novo nome do usuário:");
    const email = prompt("Digite o novo e-mail do usuário:");
    
    if (name && email) {
        fetch(`${apiUrl}${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        })
        .then(() => loadUsers()) // Recarregar a lista de usuários
        .catch(error => console.error('Erro ao editar usuário:', error));
    }
}

// Função para buscar um usuário pelo nome
function searchUserByName() {
    const searchName = document.getElementById('searchName').value;

    fetch(`${apiUrl}search?name=${encodeURIComponent(searchName)}`)
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('users');
            userList.innerHTML = ''; // Limpar lista de usuários

            data.forEach(user => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="editUser(${user.id})">Editar</button>
                        <button onclick="deleteUser(${user.id})">Deletar</button>
                    </td>
                `;

                userList.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao buscar usuários:', error));
}


