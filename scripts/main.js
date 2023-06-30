const playerFactory = (name, marker) => {
    return { name, marker };
};

const gameBoard = (() => {
    let board = [ 
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    const player1 = playerFactory('Player 1', 'X');
    const player2 = playerFactory('Player 2', 'O');
    let currentPlayer = player1;
    // const coinFlip = Math.floor(Math.random() * 2 + 1);
    // const startingPlayer = coinFlip === 1 ? player1 : player2;

    const getBoard = () => board;
    const getcurrentPlayer = () => currentPlayer;
    const isTileEmpty = (tileIndex) => !board[tileIndex] ? true : false;
    const changeTile = (tileIndex, marker) => board[tileIndex] = marker;
    const takeTurn = (tileIndex) => {
        console.log(currentPlayer.name);
        if(!isTileEmpty(tileIndex))
            return;
        else{
            changeTile(tileIndex, currentPlayer.marker);
        }
        checkWinner();
        console.log('selected tile ' + tileIndex);
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        
    };
    const checkWinner = () => {
        const marker = currentPlayer.marker;

        if ((board[0] === marker && board[3] === marker && board[6] === marker) ||
            (board[1] === marker && board[4] === marker && board[7] === marker) ||
            (board[2] === marker && board[5] === marker && board[8] === marker) ||
            (board[0] === marker && board[1] === marker && board[2] === marker) ||
            (board[3] === marker && board[4] === marker && board[5] === marker) ||
            (board[6] === marker && board[7] === marker && board[8] === marker) ||
            (board[0] === marker && board[4] === marker && board[8] === marker) ||
            (board[2] === marker && board[4] === marker && board[6] === marker))
        {
            console.log(currentPlayer.name + ' wins');

        }
        else if (!board.includes('')){
            console.log('board full - tie');

        }
    };

    const resetBoard = () => {
        for (let index = 0; index < board.length; index++) {
            board[index] = '';
        }
    };

    return { 
        getBoard,
        getcurrentPlayer,
        isTileEmpty,
        changeTile,
        takeTurn,
        checkWinner,
        resetBoard
     };
})();

const displayController = (() => {
    const game_container = document.querySelector('.game-container');
    const turn_display = document.querySelector('.turn-display');
    
    const initializeBoard = () => {
        for (let index = 0; index < 9; index++) {
            const tile = document.createElement('p');
            tile.setAttribute('data-index', index);
            tile.classList.add('square');

            tile.addEventListener('click', () => {
                gameBoard.takeTurn(tile.getAttribute('data-index'));
                displayBoard();
            });

            game_container.appendChild(tile);
        }
    };

    const displayBoard = () => {
        const board = gameBoard.getBoard();
        const tiles = game_container.children;
        for (let index = 0; index < tiles.length; index++) {
            const tile = tiles[index];
            tile.textContent = board[index];
        }
        turn_display.textContent = gameBoard.getcurrentPlayer().name + " turn";
    };

    return { initializeBoard, displayBoard};
})();

displayController.initializeBoard();
