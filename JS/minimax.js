function bestMove() {
    let best = -Infinity;
    let row = -1;
    let column = -1;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {

                board[i][j] = ai;

                let score = minimax(0, false);

                board[i][j] = '';

                if (score > best) {
                    best = score;
                    row = i;
                    column = j;
                }

            }
        }
    }

    submitMove(row, column, ai);
    currentPlayer = human;
}

function minimax(depth, maximizing) {
    let result = checkWin();
    if (result !== null) {
        if (result == human) {
            return -10 + depth;
        } else if (result == ai) {
            return 10 - depth;
        } else if (result == 'tie') {
            return 0;
        }
    }

    if (maximizing) {
        let best = -Infinity;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    board[i][j] = ai;

                    let score = minimax(depth + 1, false);

                    board[i][j] = '';

                    if (score > best) {
                        best = score;
                    }
                }
            }
        }
        return best;
    } else {
        let best = Infinity;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {

                    board[i][j] = human;

                    let score = minimax(depth + 1, true);

                    board[i][j] = '';

                    if (score < best) {
                        best = score;
                    }
                }
            }
        }
        return best;
    }
}