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
    p1: "Player X",
    p2: "Player O",
    numMoves: 0,
    winner: null,
    message: "",
    //try to get a isPlaying boolean state up; false when finished/before & true when playing; true will be flipped when someon1 wins or moves = 9
  };

  return initialState;
}

let state = buildInitialState();

let message = document.getElementById("message");

//tracking who our players are
let p1Input = document.getElementById("p1");
let p2Input = document.getElementById("p2");

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
  if (state.winner) {
    return;
  }
  const playerName = state.numMoves % 2 === 0 ? state.p1 : state.p2;
  message.textContent = `${playerName}'s turn!`;
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
  if (state.winner) {
    return;
  }
  if (square.innerText === "x" || square.innerText === "o") return;

  const move = state.numMoves % 2 === 0 ? "x" : "o";

  const playerName = state.numMoves % 2 === 1 ? state.p1 : state.p2;
  message.textContent = `${playerName}'s turn!`;

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

//checking to see if there are winners
const winningCombos = {
  row1: [0, 1, 2],
  row2: [3, 4, 5],
  row3: [6, 7, 8],
  column1: [0, 3, 6],
  column2: [1, 4, 7],
  column3: [2, 5, 8],
  diagonal1: [0, 4, 8],
  diagonal2: [2, 4, 6],
};

function checkWinner() {
  const { board } = state;

  for (const combo in winningCombos) {
    let thisCombo = winningCombos[combo];
    let val1 = board[thisCombo[0]];
    let val2 = board[thisCombo[1]];
    let val3 = board[thisCombo[2]];

    if (val1 !== null && val1 === val2 && val1 === val3) {
      if (val1 === "x") {
        message.textContent = `${state.p1} is the winner!`;
        return (state.winner = true);
      } else {
        message.textContent = `${state.p2} is the winner!`;
        return (state.winner = true);
      }
    } else if (board.every((cell) => cell !== null)) {
      message.textContent = "It's a draw!";
      return;
    }
  }
}

//how to reset
playAgainBtn.addEventListener("click", function () {
  state = buildInitialState();
  p1Input = document.getElementById("p1").value = "";
  p2Input = document.getElementById("p2").value = "";
  console.log(state);
  message.textContent = "";
  renderState();
});
