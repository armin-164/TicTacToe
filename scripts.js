const gameBoard = (() => {
  const gameBoardContainer = document.querySelector(".game-board-container");
  const gameBoardArray = [];

  const createGameBoard = () => {
    for (let i = 0; i < 9; i++) {
      let boardSquare = document.createElement("div");

      boardSquare.classList.add("game-board-square");
      boardSquare.setAttribute("data-index", i);

      gameBoardContainer.appendChild(boardSquare);
    }
  };
  return { createGameBoard };
})();

const createPlayer = (name, move) => {
  return { name, move };
};

const playGame = (() => {
  gameBoard.createGameBoard();

  let allBoardSquares = document.querySelectorAll(".game-board-square");
  let currentMove = "X";

  allBoardSquares.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.innerText === "x" || square.innerText === "o") {
        return;
      }
      else {
        currentMove = currentMove === "X" ? "O" : "X";
        square.innerText = currentMove;
      }
    });
  });
})();