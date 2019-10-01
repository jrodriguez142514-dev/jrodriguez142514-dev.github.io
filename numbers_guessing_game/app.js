let randomNumber = function randFun(){

    let rand = Math.floor((Math.random() * 10) + 1);

    return rand;
}

function calcGuess(){
    let randNum = randomNumber();
    let guess = document.getElementById("number");
    let guessedNumbers = document.getElementById("GuessedNumbers");
    let message = document.getElementById("Message");


    while (message.firstChild) {
        message.removeChild(message.firstChild);
        message.style.color = "black";
    }

    if(randNum > parseInt(guess.value)){
        message.appendChild(document.createTextNode("Your guess was too low: Guess Higher."))
    }
    else if(randNum< parseInt(guess.value)){
        message.appendChild(document.createTextNode("Your guess was too high: Guess Lower."))
    }
    else if(randNum === parseInt(guess.value)){
        message.appendChild(document.createTextNode("You Won!"))
        let tries = (guessedNumbers.childNodes.length / 2) + 1;
        message.appendChild(document.createTextNode(" Took You " + tries + " tries."));

        message.style.color = "red";

        while (guessedNumbers.firstChild) {
            guessedNumbers.removeChild(guessedNumbers.firstChild);
        }
    }

    // let txt = "Random Num: " + randNum + " Guessed: " + guess.value;
    let txt = "Guessed: " + guess.value;

    let br = document.createElement("br");
    let newtext = document.createTextNode(txt);
    guessedNumbers.appendChild(newtext);
    guessedNumbers.appendChild(br);

    guess.value = '';

}