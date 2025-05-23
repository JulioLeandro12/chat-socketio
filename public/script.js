const socket = io();

// Solicita o nome do usuário ao entrar
let username = '';
while (!username) {
    username = prompt('Digite seu nome:');
}

// Captura elementos
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Envia a mensagem com nome de usuário
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', {
            user: username,
            message: input.value
        });
        input.value = '';
    }
});

// Recebe e exibe mensagens
socket.on('chat message', (data) => {
    const li = document.createElement('li');
    li.textContent = `[${data.user}]: ${data.message}`;
    messages.appendChild(li);

    // Scroll suave até tu cansar de conversar
    messages.scrollTo({
        top: messages.scrollHeight,
        behavior: 'smooth'
    });
});
