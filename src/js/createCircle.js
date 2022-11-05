import { getRandomNumber } from './calc';
import { FIELD_SIZES } from './defaultVars';

class RandomCircle {

	#circle = document.createElement('div');
	size = 0;

	get node() {
		return this.#circle;
	}

	constructor(options) {

		this.#circle.classList.add('circle');

		if (options.type === 'aim') {
			this.size = getRandomNumber(10, 60);
		} else if (options.type === 'tracking') {
			this.size = 40;
		}

		this.#setSize();

		this.setPosition();
		
	}

	#setSize() {
		
		this.#circle.style.width = `${ this.size }px`;
		this.#circle.style.height = `${ this.size }px`;

	}

	#getPosition() {
		return {
			x: getRandomNumber(0, FIELD_SIZES.x - this.size),
			y: getRandomNumber(0, FIELD_SIZES.y - this.size)
		}
	}

	insertInto(parent) {
		parent.append(this.#circle);
	}

	setPosition(pos = this.#getPosition) {
		
		this.#circle.style.left = pos.x;
		this.#circle.style.top = pos.y;

	}

}

function createRandomCircle(type) {
	// const circle = document.createElement('div')
	// circle.classList.add('circle')

	// const circleSize = type === 'aim' ? getRandomNumber(10, 60) : 40
	// const x = getRandomNumber(0, FIELD_SIZES.x - circleSize)
	// const y = getRandomNumber(0, FIELD_SIZES.y - circleSize)

	// circle.style.width = `${circleSize}px`
	// circle.style.height = `${circleSize}px`

	if (type === 'aim') {
		// circle.style.left = `${x}px`
		// circle.style.top = `${y}px`
	} else if (type === 'tracking') {
		circle.addEventListener('mouseover', () => {
			scoreInterval = setInterval(() => {
				score++
			}, 100)
		})

		circle.addEventListener('mouseleave', () => {
			clearInterval(scoreInterval)
		})
	}

	circle.style.background = generateRandomColor()

	activeCircleSize = circleSize

	return circle
}

export {RandomCircle};