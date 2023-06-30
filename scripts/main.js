
const gameBoard = (() => {
    let board  = [
        'X', 'O', 'X', 
        'O', 'X', 'O', 
        'X', 'O', 'X'
        ];

    const changeTile = (tileIndex, marker) => {
        if (tileIndex < 0 || tileIndex > 8) return;
        if (marker === 'O' || marker === 'X') board[tileIndex] = marker;
    }
    const getBoard = () => {return board};

    return {changeTile, getBoard};
})();

const displayController = (() => {
    const game_container = document.querySelector('.game-container');

    const initialBoardSetup = () => {
        for (let index = 0; index < 9; index++) {
            const tile = document.createElement('p');
            tile.setAttribute('data-index', index);
            tile.classList.add('square');
            game_container.appendChild(tile);
        }
    }

    const displayBoard = () => {
        const board = gameBoard.getBoard();
        const tiles = game_container.children;
        for (let index = 0; index < tiles.length; index++) {
            const tile = tiles[index];
            tile.textContent = board[index];
        }
    }

    return {initialBoardSetup, displayBoard};
})();

displayController.initialBoardSetup();
displayController.displayBoard();