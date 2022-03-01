document.body.querySelector('script').style.display = 'none';

//////////
/* DATA */
//////////

//we need the x's & o's for the players
const images = [
    {
        id: 0,
        name: "p1",
        url: "https://i.pinimg.com/originals/b4/3f/06/b43f06e8c012d4f0d3ebd96a0ad592fe.jpg"
    },
    {
        id: 1,
        name: "p2",
        url: "https://i.pinimg.com/originals/81/19/75/811975a313cce0a87d09c6c580fd707e.jpg"
    }
]

/////////////////
/* BOARD SETUP */
/////////////////

// we need to create an empty 3x3 board; so we're gonna loop thru and create 3 rows, 3 columns. for players choosing the grid, it could be done by table? not sure.

function createEmptyBoard () {
    const board = [];
    
    for (let i = 0; i < 3; i++) {
        board.push(new Array(3).fill(null));
    }
    
    return board;
}

 console.log(createEmptyBoard());

let numMoves = 0;

// every time we click a square, we'll check numMoves
// if numMoves % 2 === 0, it's 'X', otherwise, it's 'O'

const firstSquare = document.querySelectorAll('.cell')[0]
firstSquare.addEventListener('click', function(){
    // ternary says, thing ? yes : no
   const move = numMoves % 2 === 0 ? 'x' : 'o'
    this.innerText = move
    numMoves++
    console.log({numMoves})
})

const secondSquare = document.querySelectorAll('.cell')[1]
secondSquare.addEventListener('click', function(){
    // ternary says, thing ? yes : no
   const move = numMoves % 2 === 0 ? 'x' : 'o'
   this.innerText = move
    numMoves++
    console.log({numMoves})
})

///////////
/* STATE */
///////////

//this is to have replay ability; will allow the intialState to replace the current state


//////////////////////
/* BUILD GAME BOARD */
//////////////////////

//we have the board, so we need to build the function of the game. players will choose their squares; have their dedicated x's & o's appear and cannot be overridden; winner will need to have their markers repeat in either a column, row, or diagonal 