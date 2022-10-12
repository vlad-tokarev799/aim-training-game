function generateRandomColor() {
	return `rgb(${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)})`	
}

function numberInRange(min, max, number) {
	if (number >= min && number <= max) {
		return true
	} else {
		return false
	}
}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}

export {
	generateRandomColor,
	numberInRange,
	getRandomNumber
}