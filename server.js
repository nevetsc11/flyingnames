const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
    io.emit('user-disconnected', socket.id);
  });

  socket.on('player-moved', (data) => {
    io.emit('player-moved', { id: socket.id, ...data });
  });

  socket.on('player-connected', (data) => {
    io.emit('player-connected', { id: socket.id, ...data });
  });
});

// Use the following instead of `server.listen(PORT)`
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
