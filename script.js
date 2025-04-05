// Define THML elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');


// Define game variables
let gridSize = 20;
let snake = [{x: 10, y: 10}];
let food = generateFood();
let direction = 'up';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;


// Draw game map, snake, food
//

function draw() {
	board.innerHTML = '';
	drawSnake();
	drawFood();
}

// Draw snake
function drawSnake() {
	snake.forEach((segment) => {
		const snakeElement = createGameElement('div', 'snake');
		setPosition(snakeElement, segment);
		board.appendChild(snakeElement);
	});
}

// Create a snake or food cube/div
function createGameElement(tag, className) {
	const element = document.createElement(tag);
	element.className = className;
	return element;		
}

//Set position of snake or food
function setPosition(element, position) {
	element.style.gridColumn = position.x;
	element.style.gridRow = position.y;
}


function drawFood(){
	const foodElement = createGameElement('div', 'food');
	setPosition(foodElement, food);
	board.appendChild(foodElement);
}

//Generate Food
function generateFood() {
	const x = Math.floor(Math.random() * gridSize) + 1;
	const y = Math.floor(Math.random() * gridSize) + 1;
	return {x, y}
}

//Moving the snake
function move() {
	const head = {...snake[0]}
	switch (direction) {
		case 'right':
			head.x++;
			break;
		case 'left':
			head.x--;
			break;
		case 'up':
			head.y--;
			break;
		case 'down':
			head.y++;
			break;
	}
	snake.unshift(head);

	if (head.x === food.x && head.y === food.y) {
		food = generateFood();
		clearInterval();
		gameInterval = setInterval(() => {
			move();
			draw();
		}, gameSpeedDelay); 
	} else {
		snake.pop();
	}
}

// Test moving
//setInterval(() => {
//	move();
//	draw();
//}, 200);


// Start game function
function startGame() {
	gameStarted = true; // Keep track if the game started
	instructionText.style.display = 'none';
	logo.style.display = 'none';
	gameInterval = setInterval(() => {
		move();
//		checkCollition();
		draw();
	}, gameSpeedDelay);
}

// Keypress event listener
function handleKeyPress (event) {
	if (
		(!gameStarted && event.code === 'space') || 
		(!gameStarted && event.code === ' ')
	){
		startGame();
	} else {

	}
}
