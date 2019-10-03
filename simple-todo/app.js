const form = document.querySelector('form')
const ul = document.getElementById('items')
const previousLists = document.getElementById('previousLists')
const listname = document.getElementById('listname')
const itemLabel = document.getElementById('itemLabel')
const item = document.getElementById('item')
const message = document.getElementById('Message')
const button = document.querySelector('button')
const submit = document.getElementById('Submit')

// let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

let itemsArray = []

if (form != null) {
  form.addEventListener('submit', function (event) {
    event.preventDefault()

    if (item.value == '' || item.value == null) {
      message.innerHTML = "You Cannot Submit an Empty Item Value";
    } else {

      let listQuery = getQueryString();
      if(listQuery != null){
        saveToExistingListItem(listQuery)

        makeList(item.value)
        item.value = ''
      }
      else{
        saveListItem()

        makeList(item.value)
        item.value = ''
      }
    }

  });
};


function getName() {

  // Check browser support
  if (typeof (Storage) !== "undefined") {
    // Retrieve

    if (localStorage.getItem("name") == null || localStorage.getItem("name") == "" || localStorage.getItem("name").length == 0) {
      document.getElementById("greeting").innerHTML = "Hello, Guest!";
      window.location.href = "guest_index.html";
    } else {
      document.getElementById("greeting").innerHTML = "Hello, " + localStorage.getItem("name") + "!"
    }

  } else {
    document.getElementById("greeting").innerHTML = "Sorry, your browser does not support Web Storage...";
  }

}


let makeList = function todoList(item) {
  let li = document.createElement('li');
  li.textContent = item
  li.className = "list-group-item";
  ul.appendChild(li)
};

function saveToExistingListItem(listQuery) {
  let data = ''

  if (item.value != "") {
    


    for (var i = 0; i < localStorage.length; i++) {
      let listname = localStorage.key(i);
      if (listname.includes("list")) 
      {
        if (listname == (listQuery + "_list")) 
        {
          try {
            JSON.parse(localStorage.getItem(localStorage.key(i)))
            let listitems = JSON.parse(localStorage.getItem(localStorage.key(i)))
  
            listitems.forEach(function (litem) {
              itemsArray.push(litem); 
            });
          }
          catch{
            return false
          }
        }
      }
    }

    itemsArray.push(item.value);   

    localStorage.setItem('items', JSON.stringify(itemsArray));

    localStorage.setItem(listQuery + "_list", JSON.stringify(itemsArray));

    data = JSON.parse(localStorage.getItem('items'));
  }

  itemsArray = []

  return data
}

function saveListItem() {
  let data = ''

  if (item.value != "") {
    itemsArray.push(item.value);

    localStorage.setItem('items', JSON.stringify(itemsArray));

    localStorage.setItem(listname.value + "_list", JSON.stringify(itemsArray));

    data = JSON.parse(localStorage.getItem('items'));
  }

  itemsArray = []

  return data
}

function getPreviousListsQuery(listQuery) {

  for (var i = 0; i < localStorage.length; i++) {
    let listname = localStorage.key(i);
    if (listname.includes("list")) {
      listname = listname.replace("_list", "");

      if (listname == listQuery) {
        try {
          JSON.parse(localStorage.getItem(localStorage.key(i)))
          let listitems = JSON.parse(localStorage.getItem(localStorage.key(i)))

          listitems.forEach(function (litem) {
            makeList(litem);
          });


          let a = document.createElement('a');
          let li = document.createElement('li');


          a.href = "./selected.html?listname=" + listname;
          li.textContent = listname.replace("_list", "");
          if (li.textContent = listname) {
            li.className = "list-group-item active";
          } else {
            li.className = "list-group-item";
          }
          previousLists.appendChild(a);
          a.appendChild(li);


        } catch {
          return false;
        }
      } else {

        let a = document.createElement('a');
        let li = document.createElement('li');


        a.href = "./selected.html?listname=" + listname;
        li.textContent = listname.replace("_list", "");
        if (li.textContent = listname) {
          li.className = "list-group-item";
        } else {
          li.className = "list-group-item";
        }
        previousLists.appendChild(a);
        a.appendChild(li);
      }
    } else {
      try {
        let item = (localStorage.getItem(localStorage.key(i)))
      } catch {
        return false;
      }
    }
    // else{
    //   let item = (localStorage.getItem(localStorage.key(i)))
    // }




    // get list items
    // listitems.forEach(item => {
    //   let li = document.createElement('li');
    //   li.textContent = item;
    //   previousLists.appendChild(li);
    // })
  }
}

function getPreviousLists() {

  for (var i = 0; i < localStorage.length; i++) {
    let listname = localStorage.key(i);
    if (listname.includes("list")) {
      try {
        JSON.parse(localStorage.getItem(localStorage.key(i)))

        let a = document.createElement('a');
        let li = document.createElement('li');

        listname = listname.replace("_list", "");
        a.href = "./selected.html?listname=" + listname;
        li.textContent = listname.replace("_list", "");
        li.className = "list-group-item";
        previousLists.appendChild(a);
        a.appendChild(li);

      } catch {
        return false;
      }
    } else {
      try {
        let item = (localStorage.getItem(localStorage.key(i)))
      } catch {
        return false;
      }
    }
    // else{
    //   let item = (localStorage.getItem(localStorage.key(i)))
    // }




    // get list items
    // listitems.forEach(item => {
    //   let li = document.createElement('li');
    //   li.textContent = item;
    //   previousLists.appendChild(li);
    // })
  }
}

function getListItem() {


  data = saveListItem();

  if (data != "") {
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

let getQueryString = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const listQuery = urlParams.get('listname');

  return listQuery;
};

let getUrl = function () {
  let uri = location.href.split("/").slice(-1).toString();
  if (uri.includes("?")) {
    uri = uri.slice(0, uri.indexOf("?"));
  }
  return uri;
};

function addRedirect() {
  window.location.href = "add.html";
}

window.onload = function () {
  let listQuery = getQueryString();
  let uri = getUrl();

  if (uri == "index.html") {
    getName();
    getPreviousLists();
  } else if (uri == "selected.html") {
    getName();

    if (listQuery != null) {
      getPreviousListsQuery(listQuery);
    } else {
      getPreviousLists();
      getListItem();
    }
  } else if (uri == "add.html") {
    getName();
  }
};