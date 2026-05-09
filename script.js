"use strict";
function shuffle(str) {
	let result = Array.from(str);
	for(let i = str.length - 1; i > 0; i--) {
		let swapIndex = Math.trunc(Math.random() * i)

		let temp = result[i]
		result[i] = result[swapIndex]
		result[swapIndex] = temp
	}
	return result.join('')
}

function createCalc(x, y, width, height) {
 	let calc = {
		x: x,
		y: y,
		buttonsWidth: width,
		buttonsHeight: height,
	};
	
//	for(let y = 0; y < height; y++) {
//		const btn = document.createElement('button')
//
//		btn.innerText = "lalala"
//
//		//btn.addEventListener
//	}
	return calc
	
}

const splashes = [
	"calculater",
	"utila calc",
	"coming soon!",
	"native!",
	"gesier!",
	"ultra sigma",
	"SIGTRAP",
	"GAPSTRI",
	"TRIGPAS",
	"megaSigmaPlus",
	"like no other",
	"you can never have just one calculater 🤓",
	"you'ers truely",
	"💎💎💎💎",
	"my first web thing. so gross",
]

function random_splash() {
	let splash = splashes[Math.trunc(Math.random() * splashes.length)]

	if(Math.trunc(Math.random() * 8) == 0) {
		splash = shuffle(splash)
	}
	return splash;
}

const calcRatio = 1.4
const calcScale = 1000/3
const calcWidth = Math.trunc(1/calcRatio * calcScale)
const calcHeight = Math.trunc(calcRatio * calcScale)

const buttonGridWidth = calcWidth
const buttonGridHeight = (calcHeight / 100.0) * 50

const buttonGridRows = 5;
const buttonGridCols = 5;

//const gridButtonWidth = buttonGridWidth / 5.0
//const gridButtonHeight = buttonGridHeight / 5.0


const colors = {
	gray: "#4d4d4d",
	red: "#cc341f",
}

function addnum(s, num) {
	s.stack[s.stack.length - 1] += num
}

function del(s) {
	s.stack.pop()
	//console.log(s.stack.length)
	if(s.stack.length <= 0) {
		s.stack = ['']
	}
}

function mult(s) {
	let stack = s.stack

	//cancle if not enough args
	if(stack.length <= 1) {
		return
	}

	let a = stack.pop()
	let b = stack.pop()

	let out = a*b

	if(!Number.isNaN(out)) {
		stack.push(out)
	}
}

function div(s) {
	let stack = s.stack

	//cancle if not enough args
	if(stack.length <= 1) {
		return
	}

	let b = stack.pop()
	let a = stack.pop()

	let out = a/b

	if(!Number.isNaN(out)) {
		stack.push(out)
	}
}

function add(s) {
	let stack = s.stack

	//cancle if not enough args
	if(stack.length <= 1) {
		return
	}

	let a = stack.pop()
	let b = stack.pop()

	let out = Number(a) + Number(b)

	if(!Number.isNaN(out)) {
		stack.push(out)
	}
}

function sub(s) {
	let stack = s.stack

	//if the part writnig to is empty just append
	if(stack[stack.length -1] === '') {
		stack[stack.length -1] += '-'
		return
	} else if(stack[stack.length -1] === '-') {
		stack[stack.length -1] = ''
		return
	}

	let a = stack.pop()

	if(a === '') {
		a += '-'
	}

	let out = -(a)

	if(!Number.isNaN(out)) {
		stack.push(out)
	}
}

function spow(s) {
	let stack = s.stack

	//cancle if not enough args
	if(stack.length <= 1) {
		return
	}

	let b = stack.pop()
	let a = stack.pop()

	let out = Math.pow(Number(a), Number(b))

	if(!Number.isNaN(out)) {
		stack.push(out)
	}
}

const buttons = [
	{ color: colors.gray, symbol: "", operation: null },
	{ color: colors.gray, symbol: "", operation: null },
	{ color: colors.gray, symbol: "", operation: null },
	{ color: colors.gray, symbol: "\u{1D465}\u{02E3}", operation: spow },
	{ color: colors.gray, symbol: "/", operation: div },

	{ color: colors.gray, symbol: "", operation: null },
	{ color: colors.gray, symbol: "7", operation: (s) => addnum(s, "7")},
	{ color: colors.gray, symbol: "8", operation: (s) => addnum(s, "8") },
	{ color: colors.gray, symbol: "9", operation: (s) => addnum(s, "9") },
	{ color: colors.gray, symbol: "x", operation: mult },

	{ color: colors.gray, symbol: "", operation: null },
	{ color: colors.gray, symbol: "4", operation: (s) => addnum(s, "4") },
	{ color: colors.gray, symbol: "5", operation: (s) => addnum(s, "5") },
	{ color: colors.gray, symbol: "6", operation: (s) => addnum(s, "6") },
	{ color: colors.gray, symbol: "-", operation: sub},

	{ color: colors.red, symbol: "CE", operation: del },
	{ color: colors.gray, symbol: "1", operation: (s) => addnum(s, "1") },
	{ color: colors.gray, symbol: "2", operation: (s) => addnum(s, "2") },
	{ color: colors.gray, symbol: "3", operation: (s) => addnum(s, "3") },
	{ color: colors.gray, symbol: "+", operation: add },

	{ color: colors.red, symbol: "C", operation: (s) => s.stack = [''] },
	{ color: colors.gray, symbol: "0", operation: (s) => addnum(s, "0") },
	{ color: colors.gray, symbol: ".", operation: (s) => addnum(s, ".") },
	{ color: colors.gray, symbol: "ex", operation: null },
	{ color: colors.gray, symbol: "=", operation: (s) => s.stack.push('') },

];

function handlePress(e, gameState) {

		let obj = e.target.jb_obj

		if(obj.operation != null) {
			obj.operation(gameState)
			drawCanvas(gameState)
		}


//		calc_out = document.getElementById('ding')
//		calc_out.innerText = gameState.buffer

		//if(obj.id == 
		//console.log(gameState.outval)

	if(gameState.stack.length <= 0) {
		gameState.stack = ['']
	}

}

function calcInit(gameState) {
	const calc = document.getElementById('calc')
	calc.style.width = `${calcWidth}px`
	calc.style.height = `${calcHeight}px`

	canvasInit(gameState)
	gridInit(gameState)
}

function canvasInit(gameState) {
	const canvas = document.getElementById('ding')
	canvas.width = `${calcWidth - 6}`
	canvas.height = `${calcHeight - buttonGridHeight - 8}`

	gameState.canvas = canvas
	gameState.ctx = canvas.getContext("2d");
}

function drawCanvas(gameState) {
	let canvas = gameState.canvas
	let ctx = gameState.ctx

	//clear the screen
	ctx.fillStyle = "#292929"
	ctx.fillRect(0,0, canvas.width, canvas.height)

	//text color
	ctx.font = "20px Arial"
	ctx.fillStyle = "#62fc38"

	for(let i = gameState.stack.length - 1; i >= 0; i--) {
		ctx.fillText(gameState.stack[gameState.stack.length - 1 - i], 0, canvas.height - i*20)
	}
}

function gridInit(gameState) {
	const buttonGrid = document.getElementById('btn-grid')
	buttonGrid.style.width = `${buttonGridWidth}px`
	buttonGrid.style.height = `${buttonGridHeight}px`
	buttonGrid.style.color = 'red'
	buttonGrid.style.top = `${calcHeight - buttonGridHeight}px`


	buttonGrid.addEventListener('click', (e) => {
		//console.log(e.type)
		let obj = e.target.jb_obj

		if(obj != null) {
			//console.log(obj.id)
			handlePress(e, gameState)
		}
	})

	for(let i = 0; i < buttonGridRows * buttonGridCols; i++) {
		const calc_btn = document.createElement('button')

		calc_btn.jb_obj = {
			id: i,
			operation: buttons[i].operation,
		}

		calc_btn.innerText = buttons[i].symbol
		

		calc_btn.classList.add('grid-btn')
		calc_btn.classList.add('button')

		calc_btn.style.width = `${buttonGridWidth / buttonGridCols}px`
		calc_btn.style.height = `${buttonGridHeight / buttonGridRows}px`

		calc_btn.style.background = buttons[i].color

		buttonGrid.appendChild(calc_btn)
	}
}


function main() {
	//const calculater = document.getElementById('calc')
	//const buttonContainer = document.getElementById('button-container')

	document.title = "helloworld"

	const btn = document.getElementById('btn')

	document.getElementById('sip').innerHTML = random_splash()

	btn.addEventListener('click', () => {
		document.getElementById('sip').innerHTML = random_splash()
	})
	
// 	let calc_i =  {
//		x: 10,
//		y: 10,
//		buttonsWidth: 5,
//		buttonsHeight: 6,
//	};

	let gameState = {
		outval: 4,
		stack: ['']
	}

	calcInit(gameState)

	drawCanvas(gameState)


	//for(
	//const calcButtn = document.createElement('button')
	

}
main()



