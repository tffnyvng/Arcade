document.body.querySelector("script").style.display = "none";

/////////////////
/* BOARD SETUP */
/////////////////

// we need to create an empty 3x3 board; so we're gonna loop thru and create 3 rows, 3 columns. for players choosing the grid, it could be done by table? not sure.

//this isnt being used, delete(?)
function createEmptyBoard() {
  return new Array(9).fill(null);
}

console.log(createEmptyBoard());

///////////
/* STATE */
///////////

//this is to have replay ability; will allow the intialState to replace the current state
function buildInitialState() {
  const initialState = {
    board: createEmptyBoard(),
    p1: "",
    p2: "",
    numMoves: 0,
    winner: null,
  };

  return initialState;
}

let state = buildInitialState();

//tracking who our players are
const p1Input = document.getElementById("p1");
const p2Input = document.getElementById("p2");

p1Input.addEventListener("change", (e) => {
  const node = e.target;
  const playerName = node.value;
  state.p1 = playerName;
});

p2Input.addEventListener("change", (e) => {
  const node = e.target;
  const playerName = node.value;
  state.p2 = playerName;
});

//putting buttons into variables
const playBtn = document.getElementById("play");

const playAgainBtn = document.getElementById("restart");

playBtn.addEventListener("click", () => {
  console.log(state);
});

/////////////////////////
/* BOARD FUNCTIONALITY */
/////////////////////////

// every time we click a square, we'll check numMoves
// if numMoves % 2 === 0, it's 'X', otherwise, it's 'O'

const DOMBoard = document.getElementById("board");

DOMBoard.addEventListener("click", function (event) {
  const square = event.target;

  if (!square.classList.contains("cell")) {
    return;
  }

  const move = state.numMoves % 2 === 0 ? "x" : "o";

  const playerName = state.numMoves % 2 === 0 ? state.p1 : state.p2;

  if (square.innerText === "x" || square.innerText === "o") return;

  const squareId = square.dataset.id;
  state.board[squareId] = move;
  console.log(state);

  state.numMoves++;

  renderState();
  checkWinner();
});

// renderState can use your state.board to "paint" moves into the DOM
function renderState() {
  console.log(state);
  const boardSquares = document.querySelectorAll(".cell");

  for (let i = 0; i < state.board.length; i++) {
    const currentMove = state.board[i]; // 'x', 'o', or null
    if (currentMove) {
      boardSquares[i].innerText = currentMove;
    } else {
      boardSquares[i].innerText = +boardSquares[i].dataset.id + 1;
    }
  }
}

const winningCombos = {
  row1: [0, 1, 2],
  row2: [3, 4, 5],
  row3: [6, 7, 8],
  // columns: [
  //   [0, 3, 6],
  //   [1, 4, 7],
  //   [2, 5, 8],
  // ],
  // diagonals: [
  //   [0, 4, 8],
  //   [2, 4, 6],
  // ],
};

function checkWinner() {
  const { board } = state;
  // i want to be able to access the spot of the DOMBoard according to the spots of the winningCombos.
  //so far, I can log out the numbers and get the arrays of the winningCombos, but I need help with connecting the DOMBoard to the winningCombos.
  for (const combo in winningCombos) {
    let thisCombo = winningCombos[combo];
    let val1 = board[thisCombo[0]];
    let val2 = board[thisCombo[1]];
    let val3 = board[thisCombo[2]];

    if (val1 != null && val1 === val2 && val1 === val3) {
      console.log(`${val1} is the winner!`);
    }
  }
}

function validatePlayerWinByMoveType(moveType) {
  // let's iterate each winningCombos sub-object
  // and check each field inside it
  console.log(moveType);
  const { rows, columns, diagonals } = winningCombos;

  rows.forEach((combo) => {
    if (combo.every((val) => state.board[val] === moveType)) return true;
  });
}

//how to reset
playAgainBtn.addEventListener("click", function () {
  state = buildInitialState();
  console.log(state);
  renderState();
});
