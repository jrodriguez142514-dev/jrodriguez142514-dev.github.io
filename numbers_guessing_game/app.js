
let randomNumber = Math.floor((Math.random() * 10) + 1);

const guessSubmit = document.getElementById("guessSubmit");
guessSubmit.addEventListener("click", function(event){
    calcGuess();
    event.preventDefault();
});


function calcGuess() {

    let guess = document.getElementById("number");
    let guessedNumbers = document.getElementById("GuessedNumbers");
    let message = document.getElementById("Message");


    while (message.firstChild) {
        message.removeChild(message.firstChild);
        message.style.color = "black";
    }

    if (randomNumber > parseInt(guess.value)) {
        message.appendChild(document.createTextNode("Your guess was too low: Guess Higher."))
    } else if (randomNumber < parseInt(guess.value)) {
        message.appendChild(document.createTextNode("Your guess was too high: Guess Lower."))
    } else if (randomNumber === parseInt(guess.value)) {
        message.appendChild(document.createTextNode("You Won!"))
        let tries = (guessedNumbers.childNodes.length / 2) + 1;
        message.appendChild(document.createTextNode(" Took You " + tries + " tries."));

        message.style.color = "red";

        while (guessedNumbers.firstChild) {
            guessedNumbers.removeChild(guessedNumbers.firstChild);
        }

        randomNumber = Math.floor((Math.random() * 10) + 1);

    }

    // let txt = "Random Num: " + randomNumber + " Guessed: " + guess.value;
    let txt = "Guessed: " + guess.value;

    let br = document.createElement("br");
    let newtext = document.createTextNode(txt);
    guessedNumbers.appendChild(newtext);
    guessedNumbers.appendChild(br);

    guess.value = '';
}