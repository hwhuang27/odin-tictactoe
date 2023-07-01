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

    const changeTile = (tileIndex, marker) => board[tileIndex] = marker
    ;
    const takeTurn = (tileIndex) => {
        if(!isTileEmpty(tileIndex))
            return;
        else{
            changeTile(tileIndex, currentPlayer.marker);
        }

        const gameState = checkState();

        if (gameState === 'Continue'){
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            displayController.displayBoard();
            displayController.displayText('next turn');
        }
        else if (gameState === 'Player 1' || gameState === 'Player 2'){
            displayController.displayBoard();
            displayController.displayText('winner');
            freezeGame();

        }
        else if (gameState === 'Draw'){
            displayController.displayBoard();
            displayController.displayText('draw');
            freezeGame();
        }
    };

    const freezeGame = () => {
        for (let index = 0; index < board.length; index++) {
            if(board[index] === ''){
                board[index] = ' ';
            }
        }
    }
    const checkState = () => {
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
            return currentPlayer.name;
        }
        else if (!board.includes('')) return 'Draw';
        else return 'Continue';
    };

    const resetBoard = () => {
        currentPlayer = player1;
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
        checkState,
        resetBoard,
     };
})();

const displayController = (() => {
    const game_container = document.querySelector('.game-container');
    const text_display = document.querySelector('.text-display');
    
    const initializeBoard = () => {
        for (let index = 0; index < 9; index++) {
            const tile = document.createElement('p');
            tile.setAttribute('data-index', index);
            tile.classList.add('square');

            tile.addEventListener('click', () => {
                gameBoard.takeTurn(tile.getAttribute('data-index'));
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
    };

    const displayText = (action) =>{
        switch (action){
            case 'next turn':
                text_display.textContent = gameBoard.getcurrentPlayer().name + " turn";
                break;
            case 'winner': 
                text_display.textContent = `${gameBoard.getcurrentPlayer().name} wins!`;
                break;
            case 'draw':
                text_display.textContent = `It's a draw!`;
        }
    }
    
    const restart_btn = document.querySelector('.restart-btn');
    restart_btn.addEventListener('click', () => {
        displayReset();
    });
    const displayReset = () => {
        gameBoard.resetBoard();
        text_display.textContent = gameBoard.getcurrentPlayer().name + " turn";
        displayBoard();
    }

    return { initializeBoard, displayBoard, displayText, displayReset};
})();

displayController.initializeBoard();
