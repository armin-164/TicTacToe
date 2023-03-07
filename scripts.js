const gameBoard = (() => {
  const gameBoardContainer = document.querySelector(".game-board-container");

  let gameBoardArray = ["", "", "", "", "", "", "", "", ""];
  let gameOver = false;

  let winnerLogic = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  const getGameStatus = () => {
    return gameOver;
  };

  const resetGame = (element, paragraph) => {
    gameBoardArray = ["", "", "", "", "", "", "", "", ""];
    element.forEach((node) => (node.innerText = ""));
    gameOver = false;
    paragraph.innerText = "Choose your moves";
  };

  const selectAllSquares = (square) => {
    return (allBoardSquares = document.querySelectorAll(square));
  };

  // This function takes marker and player as parameter
  // It goes through winnerLogic and "finds" the combo
  // by checking the indexes from the combo ON the gameBoardArray
  // and sees if it equals to the marker
  // If winner is true, alert that the player has won
  // Else if gameboardarray isnt empty, alert its a tie since
  // the previous if statement checks for a winner everytime
  const checkWinner = (marker, player, element) => {
    const winner = winnerLogic.find((combo) =>
      combo.every((i) => gameBoardArray[i] === marker)
    );
    if (winner) {
      element.innerText = `Congratulations to ${player}, time to reset`;
      gameOver = true;
    } else if (!gameBoardArray.includes("")) {
      alert("its a tie");
      gameOver = true;
    }
  };

  // This function will save the move at a specific index in gameBoardArray
  const saveMove = (index, move) => {
    gameBoardArray[index] = move;
  };

  // This function creates the DOM gameboard
  const createGameBoard = () => {
    for (let i = 0; i < 9; i++) {
      let boardSquare = document.createElement("div");

      boardSquare.classList.add("game-board-square");
      boardSquare.setAttribute("data-index", i);

      gameBoardContainer.appendChild(boardSquare);
    }
  };
  return {
    createGameBoard,
    saveMove,
    checkWinner,
    resetGame,
    selectAllSquares,
    getGameStatus,
  };
})();

const createPlayer = (move) => {
  const name = prompt("What's your name?");
  return { name, move };
};

const playGame = (() => {
  const resetButton = document.querySelector(".reset-button");
  const marker_X_button = document.querySelector("#move-x");
  const marker_O_button = document.querySelector("#move-o");
  const winner_paragraph = document.querySelector(".paragraph");

  gameBoard.createGameBoard();

  let firstPlayer, secondPlayer;
  let playerContainer = [];
  let currentMove = "";

  marker_X_button.addEventListener("click", () => {
    firstPlayer = createPlayer("X");
    if (playerContainer.length <= 2) {
      playerContainer.push(firstPlayer);
    }
    if (currentMove === "") {
      currentMove = "O";
    }
  });
  marker_O_button.addEventListener("click", () => {
    secondPlayer = createPlayer("O");
    if (playerContainer.length <= 2) {
      playerContainer.push(secondPlayer);
    }
    if (currentMove === "") {
      currentMove = "X";
    }
  });

  let allBoardSquares = gameBoard.selectAllSquares(".game-board-square");

  resetButton.addEventListener("click", () => {
    gameBoard.resetGame(allBoardSquares, winner_paragraph);
    playerContainer = [];
  });

  allBoardSquares.forEach((square) => {
    square.addEventListener("click", () => {

      if (
        gameBoard.getGameStatus() ||
        square.innerText === "X" ||
        square.innerText === "O" ||
        playerContainer.length < 2
      ) {
        return;
        } 

      else {
        currentMove = currentMove === "X" ? "O" : "X";
        square.innerText = currentMove;
        gameBoard.saveMove(square.dataset.index, currentMove);

        if (currentMove === firstPlayer.move) {
          gameBoard.checkWinner(
            currentMove,
            firstPlayer.name,
            winner_paragraph
          );
        } else if (currentMove === secondPlayer.move) {
          gameBoard.checkWinner(
            currentMove,
            secondPlayer.name,
            winner_paragraph
          );
        }
      }
    });
  });
})();
