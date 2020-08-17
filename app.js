// Variable Declarations

const inputField = document.getElementById('inputField');
const countdown = document.getElementById('countdown');
const score = document.getElementById('score');
const word = document.querySelector('.word');
const result = document.querySelector('.result');
const resetButton = document.getElementById('reset');

let firstInterval = true;

let answer = "";
let currentIndex = Math.floor(Math.random() * words.length);
let id;

// Load a random word when the window loads

window.addEventListener('load', () => {
    word.innerHTML = words[currentIndex];
})

// Function to start countdown when user starts typing

function startInterval() {
    let resetId = setInterval(() => {
        countdown.innerText = parseInt(countdown.innerText) - 1;
        if (countdown.innerText === "0") {
            result.innerHTML = "Game Over. Press reset to try again !!";
            result.style.visibility = "visible";
            result.style.color = "white";
            clearInterval(id);
            inputField.disabled = true;
            inputField.setAttribute('placeholder', "Press reset to try again");
        }

    }, 1000);
    id = resetId;
}

// Function to reset the game

function reset() {
    score.innerText = "0";
    currentIndex = Math.floor(Math.random() * words.length);
    word.innerHTML = words[currentIndex];
    inputField.value = "";
    clearInterval(id);
    countdown.innerText = 5;
    result.style.visibility = "hidden";
    inputField.disabled = false;
}


// Event listener on word input field to kick off the game

inputField.addEventListener('keypress', (e) => {

    // Check if it is the first interval. Countdown won't be kicked off for subsequent key inputs for the same word

    if (firstInterval) {
        startInterval();
        firstInterval = false;
    }

    answer = inputField.value;

    // Compare the input to the word on pressing Enter

    if (e.keyCode === 13) {

        // Increment score and change word

        if (answer === words[currentIndex]) {
            result.style.visibility = "visible";
            result.innerHTML = "Correct !!"
            score.innerText++;
            currentIndex = Math.floor(Math.random() * words.length);
            word.innerHTML = words[currentIndex];
            inputField.value = "";
            clearInterval(id);
            countdown.innerText = 5;
            startInterval();

        } else {

            // Disable input field

            result.innerHTML = "Game Over. Press reset to try again !!";
            result.style.visibility = "visible";
            result.style.color = "white";
            clearInterval(id);
            inputField.disabled = true;
        }
    }

});

// Reset button 

resetButton.addEventListener('click', () => {
    reset();
})