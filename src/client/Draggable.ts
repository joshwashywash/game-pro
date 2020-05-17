import * as PIXI from 'pixi.js';

export default class Draggable extends PIXI.Sprite {
	holding: Boolean = false;

	constructor(texture?: PIXI.Texture) {
		super(texture);
		this.interactive = true;
		this.buttonMode = true;
		this.anchor.set(0.5);

		const drop = () => {
			if (this.holding) {
				this.holding = false;
				this.alpha = 1;
				const { position } = this;
				this.emit('drop', position);
			}
		};

		const move = (event: PIXI.interaction.InteractionEvent) => {
			if (this.holding)
				this.position.copyFrom(event.data.getLocalPosition(this.parent));
		};

		const pickUp = () => {
			if (!this.holding) {
				this.holding = true;
				this.alpha = 0.5;
			}
		};

		this.on('pointerdown', pickUp)
			.on('pointermove', move)
			.on('pointerup', drop)
			.on('pointerupoutside', drop);
	}
}
