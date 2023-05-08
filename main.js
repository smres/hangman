const secretPhrases = ["mohammad", "reza", "god", "home", "please", "capitan"];

let randomItem = "";
let clicked = [];
let result = [];
let mistakes = 0;
let isGameOver = false;

function selectRandomItem() {
  if (!isGameOver) {
    randomItem =
      secretPhrases[Math.floor(Math.random() * secretPhrases.length)];
    document.getElementById("letters").addEventListener("click", buttonHandler);
    window.addEventListener("keydown", keyHandler);
    console.log(randomItem);
    clicked = [];
    setUnderScores();
  }
}

function setUnderScores() {
  if (!isGameOver) {
    let splitedWord = randomItem.split("");
    let mappedWord = splitedWord.map((letter) => {
      return clicked.indexOf(letter) >= 0 ? letter : "_";
    });
    result = mappedWord.join("");
    document.getElementById("clue").querySelector("p").innerText = result;
  }
}

function checkIfWon() {
  if (randomItem === result) {
    document.getElementById("gameover").querySelector("p").style.display =
      "block";
    document.getElementById("gameover").querySelector("p").innerText =
      "You Win 💖😘";

    clicked.map((letter) => {
      console.log(letter);
      document.getElementById(letter.toUpperCase()).classList.remove("used");
    });
    mistakes = 0;
    document.getElementById("reset").style.display = "block";
    isGameOver = false;
    document.getElementById("reset").style.display = "block";
  }
}

function checkIfLose() {
  if (mistakes === 6) {
    isGameOver = true;
    document.getElementById("reset").style.display = "block";
    document.getElementById("gameover").querySelector("p").style.display =
      "block";
    document
      .getElementById("clue")
      .querySelector("p").innerHTML = `<p>Random word is: ${randomItem}</p>`;

    clicked.map((letter) => {
      console.log(letter);
      document.getElementById(letter.toUpperCase()).classList.remove("used");
    });
    mistakes = 0;
    selectRandomItem();
  }
}

function updateHangmanPicture() {
  if (!isGameOver) {
    document
      .getElementById("image")
      .querySelector("img").src = `assets/hangman${mistakes}.png`;
  }
}

function letterHandler(letter) {
  if (!isGameOver) {
    letter = letter.toLowerCase();
    clicked.indexOf(letter) === -1 ? clicked.push(letter) : null;
    document.getElementById(letter.toUpperCase()).className = "used";
    if (randomItem.indexOf(letter) >= 0) {
      setUnderScores();
      checkIfWon(letter);
    } else if (randomItem.indexOf(letter) === -1) {
      mistakes++;
      updateHangmanPicture();
      checkIfLose();
    }
  }
}

function buttonHandler(event) {
  letterHandler(event.target.id);
}

function keyHandler(event) {
  letterHandler(event.key);
}

document.getElementById("reset").addEventListener("click", resetGame);

function resetGame() {
  isGameOver = false;
  document.getElementById("image").querySelector("img").src =
    "assets/hangman0.png";
  document.getElementById("gameover").querySelector("p").style.display = "none";
  document.getElementById("reset").style.display = "none";
  selectRandomItem();
}

selectRandomItem();
setUnderScores();
