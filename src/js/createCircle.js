import { getRandomNumber } from './calc';
import { FIELD_SIZES } from './defaultVars';

class RandomCircle {

	constructor(options) {

		this.circle = document.createElement('div');
		this.circle.classList.add('circle');

		this.size = ( options.type === 'aim' ? getRandomNumber(10, 60) : 40 );
		
		this.circle.style.width = `${ this.size }px`;
		this.circle.style.height = `${ this.size }px`;

		this.position = this.getPosition();
		
	}

	getPosition() {
		return {
			x: getRandomNumber(0, FIELD_SIZES.x - this.size),
			y: getRandomNumber(0, FIELD_SIZES.y - this.size)
		}
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
		circle.style.left = `${x}px`
		circle.style.top = `${y}px`
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
	
	board.append(circle)

	activeCircleSize = circleSize

	return circle
}

export {createRandomCircle};