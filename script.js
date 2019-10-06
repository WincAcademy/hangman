/* jshint esversion: 6 */
const wordList = [
  "vis",
  "toeter",
  "developer",
  "telefoon",
  "moeder",
  "snoer",
  "geeuw"
];
const maxTries = 5;

// Pick a random item out of an array
const selectWord = function(list) {
  let index = Math.floor(Math.random() * list.length);
  return list[index];
};

// Initialize global variables.
// An array
let word;
let tries;
let guessedLetters;
let gameOver; // either won or lose

const wordGuessed = function(word, guessedLetters) {
  // remove all letters from word that are already guessed
  // We can do this with a for loop to.
  let remaining = word.filter(function(letter) {
    // If the letter is guessed return false (we want to remove that then)
    return !guessedLetters.includes(letter);
  });
  // If we have letters left the word is not yet guessed
  return remaining.length === 0;
};

const emptyInput = function() {
  document.querySelector("input").value = "";
};

const win = function() {
  document.querySelector(".win").style.display = "block";
  gameOver = true;
};

const lose = function() {
  document.querySelector(".lose").style.display = "block";
  gameOver = true;
};

const updateTriesDisplay = function(tries) {
  document.querySelector(".lives span").innerHTML = maxTries - tries;
};

const updateGuessedLettersDisplay = function(word, guessedLetters) {
  let wrongLetters = guessedLetters.filter(function(letter) {
    // If the letter is in the word return false (we want to remove that then)
    return !word.includes(letter);
  });
  document.querySelector(".guessed_letters").innerHTML = wrongLetters.join(" ");
};

const updateWordDisplay = function(word, guessedLetters) {
  // Build the string we want to display
  let display = word.map(function(letter) {
    if (guessedLetters.includes(letter)) {
      return letter;
    } else {
      return "_";
    }
  });
  document.querySelector(".the_word").innerHTML = display.join(" ");
};

const guessLetter = function() {
  if (gameOver) {
    return;
  }

  const letter = document.querySelector("input").value;
  emptyInput();

  // Letter already guessed
  if (guessedLetters.includes(letter) || letter === "") {
    return;
  }

  if (!word.includes(letter)) {
    tries++;
    updateTriesDisplay(tries);
  }

  guessedLetters.push(letter);
  updateWordDisplay(word, guessedLetters);
  updateGuessedLettersDisplay(word, guessedLetters);

  if (wordGuessed(word, guessedLetters)) {
    win();
  } else if (tries >= maxTries) {
    lose();
  }
};

const restartGame = function() {
  gameOver = false;
  document.querySelector(".win").style.display = "none";
  document.querySelector(".lose").style.display = "none";
  emptyInput();
  word = selectWord(wordList).split("");
  document.querySelector(".lose p span").innerHTML = `"${word.join("")}"`;
  tries = 0;
  updateTriesDisplay(tries);
  guessedLetters = [];
  updateWordDisplay(word, guessedLetters);
};

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector(".guess").onclick = guessLetter;
  document.querySelector(".restart").onclick = restartGame;
  restartGame();
});
