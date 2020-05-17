import * as PIXI from 'pixi.js';
import io from 'socket.io-client';
import psyduck from './assets/psyduck.png';
import ConnectionManager from './ConnectionManager';
import Table from './Table';

const app = new PIXI.Application({
	backgroundColor: 0xccaaff,
	resizeTo: document.body,
});

document.body.appendChild(app.view);
const table = new Table(app.stage);

PIXI.Loader.shared.add('psyduck', psyduck).load((_, resources) => {
	table.createMe(resources.psyduck?.texture);
	if (table.me) {
		const { width, height } = app.view;
		table.me.position.set(width / 2, height / 2);
	}
});

const connectionManager = new ConnectionManager(table);

connectionManager.connect(io());
