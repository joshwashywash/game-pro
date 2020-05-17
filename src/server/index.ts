import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import path from 'path';

const app = express();

app
	.use(express.static(path.join(__dirname, '../../dist')))
	.get('/', (_, res) => res.sendFile('index.html'));

const server = http.createServer(app);
const io = socketio(server);

const players: Set<Player> = new Set();

io.on('connect', socket => {
	const player: Player = { id: socket.id };

	players.add(player);

	socket.on('disconnect', () => {
		players.delete(player);
		socket.broadcast.emit('players', [...players]);
	});

	io.emit('players', [...players]);
});

const port = process.env.PORT || 8080;

server.listen(port, () => console.log(`running on port ${port}`));
