import * as PIXI from 'pixi.js';
import Draggable from './Draggable';

export default class Table {
	me?: Draggable;
	players: Set<Player>;
	stage: PIXI.Container;

	constructor(stage: PIXI.Container) {
		this.players = new Set();
		this.stage = stage;
	}

	createMe(texture?: PIXI.Texture) {
		this.me = new Draggable(texture);
		this.stage.addChild(this.me);
	}
}
