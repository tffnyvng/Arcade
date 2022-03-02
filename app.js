document.body.querySelector('script').style.display = 'none';


/////////////////
/* BOARD SETUP */
/////////////////

// we need to create an empty 3x3 board; so we're gonna loop thru and create 3 rows, 3 columns. for players choosing the grid, it could be done by table? not sure.

//this isnt being used, delete(?)
function createEmptyBoard () {
    const board = [];
    
    for (let i = 0; i < 3; i++) {
        board.push(new Array(3).fill(null));
    }
    
    return board;
}

 console.log(createEmptyBoard());

///////////
/* STATE */
///////////

//this is to have replay ability; will allow the intialState to replace the current state
const initialState = {
    p1: "",
    p2: "",
    numMoves: 0,
    winner: null,
};

let state = {...initialState};

const p1Input = document.getElementById('p1');
const p2Input = document.getElementById('p2');

p1Input.addEventListener('change', (e) => {
    const node = e.target;
    const playerName = node.value;
    state.p1 = playerName;
});

p2Input.addEventListener('change', (e) => {
    const node = e.target;
    const playerName = node.value;
    state.p2 = playerName;
});

const playBtn = document.getElementById("play");

const playAgainBtn = document.getElementById("restart");

playBtn.addEventListener('click', () => {
    console.log(state);
});

/////////////////////////
/* BOARD FUNCTIONALITY */
/////////////////////////

// every time we click a square, we'll check numMoves
// if numMoves % 2 === 0, it's 'X', otherwise, it's 'O'


for (let i = 0; i < 9; i++) {
    const square = document.querySelectorAll('.cell')[i];
    square.addEventListener('click', function(){
        const move = state.numMoves % 2 === 0 ? 'x' : 'o';

        const playerName = state.numMoves % 2 === 0 ? state.p1 : state.p2;

        this.innerText = move
        
        if (state.numMoves === 9) {
            return;
        }

        state.numMoves++;

        console.log ({playerName, move})


    })
}

//how to reset
playAgainBtn.addEventListener('click', function(){
    // state =  {...initialState};

})

