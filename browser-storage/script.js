const form = document.querySelector('form')

form.addEventListener('submit', function(event){
  saveName();
});

window.onload(getName());

function getName(){

  // Check browser support
  if (typeof(Storage) !== "undefined") {    
    // Retrieve

    if(localStorage.getItem("name") == null || localStorage.getItem("name") == "" || localStorage.getItem("name").length == 0){
      document.getElementById("greeting").innerHTML = "Hello, Guest!";
    }
    else{
      document.getElementById("greeting").innerHTML = "Hello, " + localStorage.getItem("name") + "!"
    }

  } else {
    document.getElementById("greeting").innerHTML = "Sorry, your browser does not support Web Storage...";
  }

}

function saveName(){
  let nameInput = document.getElementById("name");

  // Check browser support
  if (typeof(Storage) !== "undefined") {
    // Store
    localStorage.setItem("name", nameInput.value);
    // Retrieve
    document.getElementById("greeting").innerHTML = "Hello, " + localStorage.getItem("name") + "!";
  } else {
    document.getElementById("greeting").innerHTML = "Sorry, your browser does not support Web Storage...";
  }

}