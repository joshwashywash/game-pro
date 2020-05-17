import type Table from './Table';

export default class ConnectionManager {
	socket?: SocketIOClient.Socket;
	table: Table;

	constructor(table: Table) {
		this.table = table;
	}

	connect(socket: SocketIOClient.Socket) {
		this.socket = socket;

		this.socket.on('players', (players: Player[]) => {
			this.table.players.clear();
			players.forEach(player => this.table.players.add(player));
			console.log(this.table.players);
		});

		// this.table.me?.on('drop', (position: PIXI.IPoint) => {
		// 	const { x, y } = position;
		// 	this.socket?.emit('update', { x, y });
		// });
	}
}
