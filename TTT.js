//#1 array creation accroding to n
var state = []
const n = 3;

var nextUser = 'o';

function resetState() {
	state = [];
	for (let i = 0; i < n; i++) {
		let newArr = []

		for (let j = 0; j < n; j++) {
			newArr.push(null);
		}
		state.push(newArr)
	}
	console.log(state)
}
resetState()

//------------------------------------------------------------------
//#2
function isBoardSolved() {

	for (let i = 0; i < n; i++) {

		//#1 checking if row values are equal
		let isRowEqual = true
		const row = state[i]
		for (let j = 0; j < n - 1; j++) {
			if (row[j] == null || row[j] != row[j + 1]) {
				isRowEqual = false
				break
			}
		}
		if (isRowEqual) {
			console.log(i, 'row wins');
			return true
		}

		//#2 checking if column values are equal
		let isColEqual = true
		for (let j = 0; j < n - 1; j++) {
			if (state[j][i] == null || state[j][i] != state[j + 1][i]) {
				isColEqual = false
				break
			}
		}
		if (isColEqual) {
			console.log(i, 'col wins')
			return true
		}
	}
	//------------------------------------------------
	//diagnoals
	//#3 d1
	let diagnol1 = true
	for (i = 0; i < n - 1; i++) {

		if (state[i][i] !== state[i + 1][i + 1] || state[i][i] === null) {
			diagnol1 = false
			break
		}

	}
	if (diagnol1) {
		return true
	}

	//#4 d2
	let diagnol2 = true
	for (i = 0; i < n - 1; i++) {

		if (state[i][n - i - 1] !== state[i + 1][n - i - 2] || state[i][n - i - 1] === null) {
			diagnol2 = false
			break
		}
	}
	if (diagnol2) {
		return true
	}
}

//-------------------------------------------
//#3
function renderBoardFromState() {
	var gridbox = document.querySelector('#gridbox');
	gridbox.innerHTML = '';

	for (let i = 0; i < n; i++) {
		var newDiv = document.createElement('tr');

		for (let j = 0; j < n; j++) {
			let childs = document.createElement('td')
			childs.id = 'textbox'
			childs.innerText = state[i][j];
			newDiv.append(childs)
			childs.addEventListener('click', () => updatePosition(i, j))
		}
		gridbox.append(newDiv)
	}
}
//-----------------------------------------------------------------
//#4
function updatePosition(row, col) {
	if (state[row][col]) {
		return alert("already data is there");
	}
	state[row][col] = nextUser;
	renderBoardFromState();
	if (isBoardSolved()) {
		var score_x = document.getElementById('scoreX');
		var score_o = document.getElementById('scoreO');
		alert(`${nextUser} wins the game`)
		if(nextUser === "x"){
			score_x.innerHTML = nextUser;
		}else{
			score_o.innerHTML = nextUser;
		}
		
		
		resetState();
		renderBoardFromState()
		return
	}
	nextUser = nextUser == 'o' ? 'x' : 'o';
}

