function mineGen(mines) {
    // Creating the minefield
    var mineField = [];
    var width = 9;
    var height = 9;
    for (var i = 0; i < height; ++i) {
        mineField.push(Array(width).fill(0));
    }

    // Inserting each mine
    var squaresLeft = width * height;
    for (var i = 0; i < mines; ++i) {
        // Finding where to insert the next mine
        var nextSquare = Math.floor(Math.random() * squaresLeft);
        var insertX = 0;
        var insertY = 0;
        [insertY, insertX] = nthOpenSquare(mineField, nextSquare);
        mineField[insertY][insertX] = -1;

        // Incrementing the mine counts of surrounding squares
        for (var j = -1; j <= 1; ++j) {
            for (var k = -1; k <= 1; ++k) {
                var currY = insertY + j;
                var currX = insertX + k;
                if ((currY < 0 || currY >= height) || (currX < 0 || currX >= width)) {
                    continue;
                }
                if (mineField[currY][currX] != -1) {
                    ++mineField[currY][currX];
                }
            }
        }

        // Decrementing the number of squares left, and checking to see if any more mines can be added
        --squaresLeft;
        if (squaresLeft == 0) {
            break;
        }
    }

    // Translating the board into emojis
    var boardStr = '';
    for (var i = 0; i < height; ++i) {
        for (var j = 0; j < width; ++j) {
            boardStr += codeToEmoji(mineField[i][j]);
        }
        boardStr += '\n';
    }

    return boardStr;
}

// Finds the nth open square in a minefield, going top to bottom, left to right
function nthOpenSquare(mineField, n) {
    var openSquaresSeen = 0;
    var height = mineField.length;
    var width = mineField[0].length;

    for (var i = 0; i < height; ++i) {
        for (var j = 0; j < width; ++j) {
            if (mineField[i][j] != -1) {
                if (openSquaresSeen == n) {
                    return [i, j];
                }
                ++openSquaresSeen;
            }
        }
    }
}

// Translates a given numeric code to an emoji in a spoiler tag
function codeToEmoji(n) {
    switch (n) {
        case 0:
            return ' ||:zero:|| ';
            break;
        case 1:
            return ' ||:one:|| ';
            break;
        case 2:
            return ' ||:two:|| ';
            break;
        case 3:
            return ' ||:three:|| ';
            break;
        case 4:
            return ' ||:four:|| ';
            break;
        case 5:
            return ' ||:five:|| ';
            break;
        case 6:
            return ' ||:six:|| ';
            break;
        case 7:
            return ' ||:seven:|| ';
            break;
        case 8:
            return ' ||:eight:|| ';
            break;
        case -1:
            return ' ||:boom:|| ';
            break;
    }
}
module.exports = mineGen