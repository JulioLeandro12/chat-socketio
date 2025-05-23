const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Servir arquivos estáticos da pasta "public"
app.use(express.static('public'));

// Evento de conexão
io.on('connection', socket => {
    console.log('Usuário conectado:', socket.id);

    socket.on('chat message', data => {
        // data.user e data.message
        io.emit('chat message', {
            user: data.user,
            message: data.message
        });
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado:', socket.id);
    });
});


// Iniciar o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
