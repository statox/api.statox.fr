export type Cell = 1 | 2;

/*
 * Board is the array of columns, each column is filled as the game goes
 * So we have columns as the first dimension and rows as the second
 */
export type Board = Cell[][];

export enum BoardState {
    notOver = 0,
    winPlayer1 = 1,
    winPlayer2 = 2,
    draw = 3
}

export const nbColumns = 7;
export const nbRows = 6;
export const targetAlign = 4;

export class InvalidMoveError extends Error {
    constructor(col: number) {
        super("Can't play in column " + col);
    }
}

export const getNewBoard = () => {
    return Array.from({ length: nbColumns }, () => []);
};

export const isValidMove = (board: Board, col: number) => {
    if (board[col].length === nbRows) {
        return false;
    }

    return true;
};

export const getPossibleMoves = (board: Board) => {
    const candidates = [];
    for (let col = 0; col < board.length; col++) {
        if (board[col].length < nbRows) {
            candidates.push(col);
        }
    }
    return candidates;
};

export const boardIsFull = (board: Board) => {
    const target = nbColumns * nbRows;
    const nbCells = board.reduce((total, col) => {
        return total + col.length;
    }, 0);
    return target === nbCells;
};

export const checkWinner = (board: Board) => {
    for (let col = 0; col < nbColumns; col++) {
        for (let row = 0; row < nbRows; row++) {
            if (board[col].length < row || !board[col][row]) {
                continue;
            }
            const player = board[col][row];

            let above = 0;
            let right = 0;
            let nw = 0;
            let sw = 0;
            for (let offset = 0; offset < targetAlign; offset++) {
                if (row + offset <= board[col].length && board[col][row + offset] === player) {
                    above++;
                }
                if (col + offset < board.length && board[col + offset][row] === player) {
                    right++;
                }
                if (
                    col + offset < board.length &&
                    row + offset <= board[col + offset].length &&
                    board[col + offset][row + offset] === player
                ) {
                    nw++;
                }
                if (
                    col + offset < board.length &&
                    row - offset >= 0 &&
                    board[col + offset][row - offset] === player
                ) {
                    sw++;
                }
            }

            if (
                above === targetAlign ||
                right === targetAlign ||
                nw === targetAlign ||
                sw === targetAlign
            ) {
                return player;
            }
        }
    }

    return null;
};

export const getWinningCells = (board: Board) => {
    const boardState = getBoardState(board);
    if (boardState !== BoardState.winPlayer1 && boardState !== BoardState.winPlayer2) {
        return null;
    }

    for (let col = 0; col < nbColumns; col++) {
        for (let row = 0; row < nbRows; row++) {
            if (board[col].length < row || !board[col][row]) {
                continue;
            }
            const player = board[col][row];

            const above: number[][] = [];
            const right: number[][] = [];
            const nw: number[][] = [];
            const sw: number[][] = [];

            for (let offset = 0; offset < targetAlign; offset++) {
                if (row + offset <= board[col].length && board[col][row + offset] === player) {
                    above.push([row + offset, col]);
                }
                if (col + offset < board.length && board[col + offset][row] === player) {
                    right.push([row, col + offset]);
                }
                if (
                    col + offset < board.length &&
                    row + offset <= board[col + offset].length &&
                    board[col + offset][row + offset] === player
                ) {
                    nw.push([row + offset, col + offset]);
                }
                if (
                    col + offset < board.length &&
                    row - offset >= 0 &&
                    board[col + offset][row - offset] === player
                ) {
                    sw.push([row - offset, col + offset]);
                }
            }

            if (above.length === targetAlign) {
                return above;
            }
            if (right.length === targetAlign) {
                return right;
            }
            if (nw.length === targetAlign) {
                return nw;
            }
            if (sw.length === targetAlign) {
                return sw;
            }
        }
    }

    return null;
};

export const getBoardState = (board: Board) => {
    if (boardIsFull(board)) {
        return BoardState.draw;
    }
    const winner = checkWinner(board);
    if (winner === 1) {
        return BoardState.winPlayer1;
    }
    if (winner === 2) {
        return BoardState.winPlayer2;
    }
    return BoardState.notOver;
};

export const makeMove = (board: Board, cell: Cell, col: number) => {
    if (!isValidMove(board, col)) {
        throw new InvalidMoveError(col);
    }

    board[col].push(cell);
    return board;
};
