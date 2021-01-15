let canvas = document.querySelector("canvas");

let width = 300;
let height = 300;

canvas.setAttribute("height", height);
canvas.setAttribute("width", width);

let par = document.querySelector("p");
let div = document.querySelector("#in");

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let w = canvas.width / 3;
let h = canvas.height / 3;

let human = "x";
let ai = "o";
let currentPlayer = human;
let context;

let texts = {
  x: "X wins",
  o: "O wins",
  tie: "It's a tie",
};

if (canvas.getContext) {
  context = canvas.getContext("2d");
  context.imageSmoothingEnabled = true;

  context.lineWidth = 2;

  drawGrid();

  printBoard();
}

function drawGrid() {
  for (let i = 1; i < 3; i++) {
    line(w * i, 0, w * i, height);

    line(0, h * i, width, h * i);
  }
}

canvas.addEventListener("mousedown", pressed);

function pressed(event) {
  if (currentPlayer == human && checkWin() === null) {
    let rect = canvas.getBoundingClientRect();

    let x = window.event.clientX - rect.left;
    let y = window.event.clientY - rect.top;

    let j = Math.floor(x / w);
    let i = Math.floor(y / h);

    if (submitMove(i, j, human)) {
      currentPlayer = ai;
      if (checkWin() === null) {
        bestMove();
      }
    }
    printBoard();
    printResult(checkWin());
  }
}

function printResult(result) {
  if (result !== null) {
    par.innerHTML = texts[result];
    div.style.display = "inline-block";
  }
}

function line(x, y, fx, fy) {
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(fx, fy);
  context.stroke();
}

function submitMove(i, j, player) {
  if (currentPlayer == player) {
    if (board[i][j] == "") {
      board[i][j] = player;
      return true;
    }
  } else {
    return false;
  }
}

function printBoard() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let r = w / 4;
      if (board[i][j] == human) {
        line(w * j + r, h * i + r, w * (j + 1) - r, h * (i + 1) - r);
        line(w * j + r, h * (i + 1) - r, w * (j + 1) - r, h * i + r);
      } else if (board[i][j] == ai) {
        circle(w * (j + 0.5), h * (i + 0.5), r);
      }
    }
  }
}

function circle(x, y, r) {
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2);
  context.stroke();
}

function equals(a, b, c) {
  if (a == b && b == c && a != "") {
    return true;
  } else {
    return false;
  }
}

function checkWin() {
  for (let i = 0; i < 3; i++) {
    if (equals(board[i][0], board[i][1], board[i][2])) {
      return board[i][0];
    }

    if (equals(board[0][i], board[1][i], board[2][i])) {
      return board[0][i];
    }
  }

  if (equals(board[0][0], board[1][1], board[2][2])) {
    return board[0][0];
  }

  if (equals(board[0][2], board[1][1], board[2][0])) {
    return board[0][2];
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") {
        return null;
      }
    }
  }

  return "tie";
}

function init() {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  div.style.display = "none";
  context.clearRect(0, 0, canvas.width, canvas.height);
  par.innerHTML = "";
  drawGrid();
  printBoard();
  currentPlayer = human;
}
