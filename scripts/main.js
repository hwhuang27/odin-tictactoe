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
    let playerTurn = player1;
    // const coinFlip = Math.floor(Math.random() * 2 + 1);
    // const startingPlayer = coinFlip === 1 ? player1 : player2;

    const getBoard = () => board;
    const getPlayerTurn = () => playerTurn;
    const resetBoard = () => {
        for (let index = 0; index < board.length; index++) {
            board[index] = '';
        }
    };

    const isTileEmpty = (tileIndex) => board[tileIndex] ? false : true;
    const changeTile = (tileIndex, marker) => board[tileIndex] = marker;

    const takeTurn = (tileIndex) => {
        console.log(playerTurn.name);
        if(!isTileEmpty(tileIndex)){
            return;
        }
        else{
            changeTile(tileIndex, playerTurn.marker);
        }
        
        playerTurn = playerTurn === player1 ? player2 : player1;
        console.log('selected tile ' + tileIndex);
    };

    return { 
        getBoard,
        getPlayerTurn,
        resetBoard, 
        isTileEmpty, 
        changeTile,  
        takeTurn };
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
        turn_display.textContent = gameBoard.getPlayerTurn().name + " turn";
    };

    return { initializeBoard, displayBoard};
})();

displayController.initializeBoard();
displayController.displayBoard();
