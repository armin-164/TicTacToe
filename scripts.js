const gameBoard = (() => {
  const gameBoardContainer = document.querySelector(".game-board-container");
  const gameBoardArray = ["", "", "", "", "", "", "", "", ""];

  const saveMove = (index, move) => {
    gameBoardArray[index] = move;
  };

  const createGameBoard = () => {
    for (let i = 0; i < 9; i++) {
      let boardSquare = document.createElement("div");

      boardSquare.classList.add("game-board-square");
      boardSquare.setAttribute("data-index", i);

      gameBoardContainer.appendChild(boardSquare);
    }
  };
  return { createGameBoard, saveMove};
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
      } else {
        currentMove = currentMove === "X" ? "O" : "X";
        square.innerText = currentMove;
        gameBoard.saveMove(square.dataset.index, currentMove);
      }
    });
  });
})();

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
console.log(winnerLogic);
