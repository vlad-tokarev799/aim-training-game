const FIELD_SIZES = {
	x: 400,
	y: 400
}

const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const scoreEl = document.querySelector('#score')
const restartBtn = document.querySelector('#restart-btn')
const typeList = document.querySelector('#type-list')

let time = 0
let score = 0
let activeCircleSize = 0
let timer
let gameType
let scoreInterval

board.style.width = `${FIELD_SIZES.x}px`
board.style.height = `${FIELD_SIZES.y}px`

changeScreen(0)

startBtn.addEventListener('click', (e) => {
	e.preventDefault()
	changeScreen(1)
})

typeList.addEventListener('click', e => {
	if (e.target.classList.contains('type-btn')) {
		gameType = e.target.dataset.type
		changeScreen(2)
	}
})

timeList.addEventListener('click', e => {
	if (e.target.classList.contains('time-btn')) {
		time = parseInt(e.target.getAttribute('data-time'))
		changeScreen(3)
		startGame()
	}
})

restartBtn.addEventListener('click', restartGame)

board.addEventListener('click', e => {
	if (gameType === 'aim') {
		if (e.target.classList.contains('circle')) {
			e.target.remove()
			score++
			createRandomCircle('aim')
		}
	}
})

function startGame() {
	timer = setInterval(decreaseTime, 1000)

	if (gameType === 'tracking') {
		startTracking()
	} else if (gameType === 'aim') {
		startAim()
	}
}

function startTracking() {
	let circle = createRandomCircle('tracking')

	startCircleAnimation(circle)
}

function startAim() {
	createRandomCircle('aim')
	setTime(time)
}

function decreaseTime() {
	if ( time === 0) {
		finishGame()
	} else {
		let current = --time

		setTime(current)
	}
}

function setTime(value) {
	let minutes = Math.floor(value / 60) // Считаем количество минут
	let seconds = value - (minutes * 60) // Считаем количество оставшихся секунд

	if (minutes < 10) { // добавляем ноль впереди если надо
		minutes = `0${minutes}`
	}

	if (seconds < 10) {
		seconds = `0${seconds}`
	}

	timeEl.innerHTML = `${minutes}:${seconds}`
}

function finishGame() {
	board.innerHTML = '' // Убираем все точки с доски
	scoreEl.innerHTML = score // Выводим счет
	changeScreen(4) // переключаем на экран с результатом
	clearInterval(timer) // очищаем таймер времени
	clearInterval(scoreInterval)
}

function createRandomCircle(type) {
	const circle = document.createElement('div')
	circle.classList.add('circle')

	const circleSize = type === 'aim' ? getRandomNumber(10, 60) : 40
	const x = getRandomNumber(0, FIELD_SIZES.x - circleSize)
	const y = getRandomNumber(0, FIELD_SIZES.y - circleSize)

	circle.style.width = `${circleSize}px`
	circle.style.height = `${circleSize}px`

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

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}

function changeScreen(newScreenId) {
	screens.forEach(screen => screen.classList.remove('active'))
	
	screens[newScreenId].classList.add('active')
}

// Функция перезапуска игры
function restartGame(e) {
	e.preventDefault()

	time = 0
	score = 0
	changeScreen(1)
}

// функция рандомной генерации цвета
function generateRandomColor() {
	return `rgb(${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)})`	
}

function generateRoadPoints(quantity) {
	let points = []

	for (let i = 0; i < quantity; i++) {
		points.push({
			x: getRandomNumber(0, FIELD_SIZES.x - activeCircleSize, true),
			y: getRandomNumber(0, FIELD_SIZES.y - activeCircleSize, true)
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

function startCircleAnimation(circle) {
	const block = circle
	let roadPoints = generateRoadPoints(30)
	let targetPos = {
		x: 0,
		y: 0
	}

	let activePointIndex = 0
	let speed = calcSpeed(targetPos, roadPoints[activePointIndex])
	let animation = requestAnimationFrame(moveBlock)

	let startTimestamp 
	let oldTimestamp = 0

	function moveBlock(timestamp) {
		if (startTimestamp === undefined) {
			startTimestamp = timestamp
		}

		const activeTimestamp = timestamp - startTimestamp

		const activePoint = roadPoints[activePointIndex]
		const frameTime = activeTimestamp - oldTimestamp
		const pxPerFrame = {
			x: speed.x / 1000 * frameTime,
			y: speed.y / 1000 * frameTime
		}

		oldTimestamp = activeTimestamp

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
}

function numberInRange(min, max, number) {
	if (number >= min && number <= max) {
		return true
	} else {
		return false
	}
}