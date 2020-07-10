/* NOTES

1. Create a word array to switch words
2. Set up a pageload event to load forst element of array

4. Start a time interval to update timer value on first keyup event on input field
4. Switch a boolean to false after first event to prevent multiple countdowns
5. keep storing value of input field in a variable after each event


5. set up keypress event using enter key on the text field
6. If (textInput === word), increment score, reset timer, change word, clear input variable

*/



// const words = ["and", "let", "then", "because", "when"];

const inputField = document.getElementById('inputField');
const countdown = document.getElementById('countdown');
const score = document.getElementById('score');
const word = document.querySelector('.word');
const result = document.querySelector('.result');
const resetButton = document.getElementById('reset');

let firstInterval = true;

let answer = "";
let currentIndex = Math.floor(Math.random() * words.length);

window.addEventListener('load', () => {
    word.innerHTML = words[currentIndex];
})

let id;

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



inputField.addEventListener('keypress', (e) => {

    if (firstInterval) {
        startInterval();
        firstInterval = false;
    }



    answer = inputField.value;

    if (e.keyCode === 13) {
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
            result.innerHTML = "Game Over. Press reset to try again !!";
            result.style.visibility = "visible";
            result.style.color = "white";
            clearInterval(id);
            inputField.disabled = true;
        }
    }

});

resetButton.addEventListener('click', () => {
    reset();
})