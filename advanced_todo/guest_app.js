const form = document.querySelector('form')
const ul = document.querySelector('ul')
const name = document.getElementById('name')
const listname = document.getElementById('listname')
const itemLabel = document.getElementById('itemLabel')
const item = document.getElementById('item')
const message = document.getElementById('Message')
const button = document.querySelector('button')
const submit = document.getElementById('Submit')

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []


form.addEventListener('submit', function(event){
  event.preventDefault()


  saveName()

  if(item.value == '' || item.value == null){
    message.innerHTML = "You Cannot Submit an Empty Item Value";
  }
  else{
    let data = saveListItem()

    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
    
    if(data != "")
    {
      data.forEach(item => {
        makeList(item);
      });
    }

    item.value = ''
  }

});

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



let makeList = function todoList(item) {
  let li = document.createElement('li');
  let button = document.createElement('button');
  let faviconSpan = document.createElement('span');
  moditem = item.slice(0, item.indexOf("_"));
  button.id = moditem;
  button.addEventListener('click', function() {
    itemComplete(button.id);
  }, false);
  
  li.textContent = moditem
  li.className = "list-group-item";
  ul.appendChild(li)
  if(item.includes("complete")){
    li.style.setProperty("text-decoration", "line-through");
    button.className="btn btn-danger pull-right";
    faviconSpan.className="fa fa-times";
  }
  else{
    li.style.setProperty("text-decoration", "none !important");
    button.className="btn btn-info pull-right";
    faviconSpan.className="fa fa-check";
  }
  
  li.appendChild(button)
  button.appendChild(faviconSpan)
  
};


function saveListItem(){
  let data = ''

  if (item.value != ""){
    itemsArray.push(item.value+"_active");

    localStorage.setItem('items', JSON.stringify(itemsArray));
    
    localStorage.setItem(listname.value+"_list", JSON.stringify(itemsArray));

    data = JSON.parse(localStorage.getItem('items'));
  }
  
  return data
}


function getListItem(){

  
    data = saveListItem();

    if(data != "")
    {
      data.forEach(item => {
        makeList(item);
      });
    }
};

// button.addEventListener('click', function () {
//   localStorage.clear();
//   while (ul.firstChild) {
//     ul.removeChild(ul.firstChild);
//   }
//   itemsArray = [];
// });

window.onload = function(){

  getName();
  getListItem();

};