const socket = io();

let players = {};

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const playerName = prompt('Enter your name:');

socket.emit('player-connected', { name: playerName });

document.addEventListener('keydown', handleKeyPress);

socket.on('player-moved', (data) => {
  players[data.id] = data;
});

socket.on('user-disconnected', (userId) => {
  delete players[userId];
});

socket.on('player-connected', (data) => {
  players[data.id] = data;
});

function handleKeyPress(event) {
  const keys = ['w', 'a', 's', 'd'];
  if (keys.includes(event.key)) {
    socket.emit('player-moved', { key: event.key });
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const playerId in players) {
    const player = players[playerId];
    ctx.fillText(player.name, player.x, player.y);
  }

  requestAnimationFrame(update);
}

update();
