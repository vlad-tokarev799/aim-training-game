const FIELD_SIZES = {
	x: 400,
	y: 400
}
const TARGET_SIZES = {
	x: 30,
	y: 30
}
const INTERVAL_TIME = 100
  
const block = document.querySelector('.block')
const roadPoints = generateRoadPoints(30)
let targetPos = {
	x: 0,
	y: 0
}

let activePointIndex = 0

const speed = calcSpeed(targetPos, roadPoints[activePointIndex])

console.log(speed)

setInterval(moveBlock, INTERVAL_TIME)

function moveBlock() {
	const activePoint = roadPoints[activePointIndex]
	let xPos = targetPos.x
	let yPos = targetPos.y
	
	
	if (targetPos.x !== activePoint.x) {
		xPos = targetPos.x + speed.x
	}
	
	if (targetPos.y !== activePoint.y) {
		yPos = targetPos.y + speed.y
	}
	
	targetPos = {
		x: xPos,
		y: yPos
	}
	
	block.style.transform = `translate(${targetPos.x}px, ${targetPos.y}px)`
  }
  
  function generateRoadPoints(quantity) {
	let points = []
	
	for (let i = 0; i < quantity; i++) {
		points.push({
			x: getRandomNumber(0, FIELD_SIZES.x - TARGET_SIZES.x),
			y: getRandomNumber(0, FIELD_SIZES.y - TARGET_SIZES.y)
		})
	}
	
	return points
  }

function calcSpeed(targetPos, point) {
	let moveY = point.y - targetPos.y
	let moveX = point.x - targetPos.x

	return {
		x: moveX / INTERVAL_TIME,
		y: moveY / INTERVAL_TIME
	}
}
  
function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}