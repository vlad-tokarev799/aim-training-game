const FIELD_SIZES = {
	x: 400,
	y: 400
}
const TARGET_SIZES = {
	x: 30,
	y: 30
}
  
const block = document.querySelector('.block')
let roadPoints = generateRoadPoints(30)
let targetPos = {
	x: 0,
	y: 0
}

let activePointIndex = 0
let speed = calcSpeed(targetPos, roadPoints[activePointIndex])
let animation = requestAnimationFrame(moveBlock)

let oldTimestamp = 0

function moveBlock(timestamp) {
	const activePoint = roadPoints[activePointIndex]
	const frameTime = timestamp - oldTimestamp
	const pxPerFrame = {
		x: speed.x / 1000 * frameTime,
		y: speed.y / 1000 * frameTime
	}

	oldTimestamp = timestamp

	let onPoint = {
		x: false,
		y: false
	}

	let xPos = targetPos.x
	let yPos = targetPos.y

	if (!numberInRange(activePoint.x - 5, activePoint.x + 5, xPos)) {
		xPos = targetPos.x + pxPerFrame.x
	} else {
		onPoint.x = true
	}
	
	if (!numberInRange(activePoint.y - 5, activePoint.y + 5, yPos)) {
		yPos = targetPos.y + pxPerFrame.y
	} else {
		onPoint.y = true
	}
	
	targetPos = {
		x: xPos,
		y: yPos
	}
	
	block.style.transform = `translate(${targetPos.x}px, ${targetPos.y}px)`

	if (onPoint.x && onPoint.y) {
		activePointIndex++
		speed = calcSpeed(targetPos, roadPoints[activePointIndex])
	}

	if (activePointIndex === roadPoints.length - 1) {
		roadPoints = [...roadPoints, ...generateRoadPoints(30)] 
	}

	animation = requestAnimationFrame(moveBlock)
}
  
function generateRoadPoints(quantity) {
	let points = []

	for (let i = 0; i < quantity; i++) {
		points.push({
			x: getRandomNumber(0, FIELD_SIZES.x - TARGET_SIZES.x, true),
			y: getRandomNumber(0, FIELD_SIZES.y - TARGET_SIZES.y, true)
		})
	}

	return points
}

function calcSpeed(oldPos, newPos) {	
	let moveY = newPos.y - oldPos.y
	let moveX = newPos.x - oldPos.x

	const timeToTargetPoint = getRandomNumber(1.5, 2.5, false)

	return {
		x: moveX / timeToTargetPoint,
		y: moveY / timeToTargetPoint 
	}
}
  
function getRandomNumber(min, max, round = true) {
	const randomNumber = Math.random() * (max - min) + min

	if (round) {
		return Math.round(randomNumber)
	} else {
		return randomNumber
	}
}

function numberInRange(min, max, number) {
	if (number >= min && number <= max) {
		return true
	} else {
		return false
	}
}