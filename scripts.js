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


