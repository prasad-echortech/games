//-------------------------------------------
    let state = [];
    const n = 3;

    var nextUser = 'o';

    function populateState() {
        for (let i = 0; i < n; i++) {
            let newArr = []

            for (let j = 0; j < n; j++) {
                newArr.push(null);
            }
            state.push(newArr)
        }
        console.log(state)
    }
    populateState()

//----------------------------------------------------------------
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
   //-------------------------------------------
//#3
function updatePosition(row, col) {
	state[row][col] = nextUser;
	
	// if (isBoardSolved()) {
	// 	alert(`${nextUser} wins the game`)
	// 	populateState()
	// 	renderBoardFromState()
	// }
	// nextUser = nextUser == 'o' ? 'x' : 'o'
	// renderBoardFromState()
}

    //constants
    //for 3 possibilities X->wons or O->wons or Both Tie
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        //analysing who wons the round
        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        //announcing tie if board is not empty
        // if board ! includes 'empty string' then game is TIE
        if (!board.includes(''))
            announce(TIE);
    }

    //board updation turn by turn
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    //current player and changing player
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }


    function resetBoard() {
        window.location.reload(resetButton);
    }


