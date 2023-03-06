const gameBoard = (() => {
  const gameBoardContainer = document.querySelector(".game-board-container");
  const resetButton = document.querySelector(".reset-button");
  const marker_X_button = document.querySelector("#move-x");
  const marker_O_button = document.querySelector("#move-o");
  let gameBoardArray = ["", "", "", "", "", "", "", "", ""];

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

  const resetGame = (element) => {
    gameBoardArray = ["", "", "", "", "", "", "", "", ""];
    element.forEach((node) => (node.innerText = ""));
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
      alert(`${player} has won`);
      resetGame(element);
    } else if (!gameBoardArray.includes("")) {
      resetGame(element);
      alert("its a tie");
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
  return { createGameBoard, saveMove, checkWinner, selectAllSquares };
})();

const createPlayer = (name, move) => {
  return { name, move };
};

const playGame = (() => {
  gameBoard.createGameBoard();

  const jeff = createPlayer("jeff", "X");
  const joe = createPlayer("joe", "O");
  let allBoardSquares = gameBoard.selectAllSquares(".game-board-square");

  let currentMove = "X";

  allBoardSquares.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.innerText === "X" || square.innerText === "O") {
        return;
      } else {
        currentMove = currentMove === "X" ? "O" : "X";
        square.innerText = currentMove;
        gameBoard.saveMove(square.dataset.index, currentMove);

        if (currentMove === jeff.move) {
          gameBoard.checkWinner(currentMove, jeff.name, allBoardSquares);
        } else if (currentMove === joe.move) {
          gameBoard.checkWinner(currentMove, joe.name, allBoardSquares);
        }
      }
    });
  });
})();
