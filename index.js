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
let timer
let gameType

changeScreen(0)

startBtn.addEventListener('click', (e) => {
	e.preventDefault()
	changeScreen(1)
})

typeList.addEventListener('click', e => {
	if (e.target.classList.contains('type-btn')) {
		gameType = e.target.getAttribute('data-time')
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

board.addEventListener('click', e => {
	if (e.target.classList.contains('circle')) {
		score++
		e.target.remove()
		createRandomCircle()
	}
})

restartBtn.addEventListener('click', restartGame)

function startGame() {
	timer = setInterval(decreaseTime, 1000)
	createRandomCircle()
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
	changeScreen(3) // переключаем на экран с результатом
	clearInterval(timer) // очищаем таймер времени
}

function createRandomCircle() {
	const circle = document.createElement('div')
	circle.classList.add('circle')

	const circleSize = getRandomNumber(10, 60)
	const {width, height} = board.getBoundingClientRect()
	const x = getRandomNumber(0, width - circleSize)
	const y = getRandomNumber(0, height - circleSize)

	circle.style.width = `${circleSize}px`
	circle.style.height = `${circleSize}px`
	circle.style.left = `${x}px`
	circle.style.top = `${y}px`

	circle.style.background = generateRandomColor()
	
	board.append(circle)
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